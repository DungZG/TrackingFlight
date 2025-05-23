package com.example.TrackingFlight_Be.v1.controllers;


import com.example.TrackingFlight_Be.v1.dto.request.SeatSelectionMessage;
import com.example.TrackingFlight_Be.v1.entity.Seats;
import com.example.TrackingFlight_Be.v1.repositories.SeatsRepository;
import com.example.TrackingFlight_Be.v1.services.SeatSelectionCacheService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

@Controller
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class SeatSelectionController {
    private final SimpMessagingTemplate messagingTemplate;
    private final SeatsRepository seatsRepository;
    private final SeatSelectionCacheService cacheService;

    @MessageMapping("/seat/select")
    public void handleSeatSelection(SeatSelectionMessage message) {
        Long flightId = message.getFlightId();
        String seatNumber = message.getSeatNumber();
        String action = message.getAction();

        String destination = "/topic/seats/" + flightId;

        switch (action) {
            case "select":
                // Giữ ghế tạm nếu chưa có ai giữ
                boolean holdSuccess = cacheService.holdSeat(flightId, seatNumber);
                if (holdSuccess) {
                    // Gửi message broadcast cho tất cả client (bao gồm sender)
                    messagingTemplate.convertAndSend(destination, message);
                } else {
                    // Nếu giữ không thành công, có thể gửi message phản hồi (nâng cao)
                }
                break;
            case "release":
                cacheService.releaseSeat(flightId, seatNumber);
                messagingTemplate.convertAndSend(destination, message);
                break;
            case "book":
                cacheService.releaseSeat(flightId, seatNumber);

                Seats seat = seatsRepository.findByFlight_FlightIdAndSeatNumber(flightId, seatNumber);
                if (seat != null && !seat.isBooked()) {
                    seat.setBooked(true);
                    seatsRepository.save(seat);
                }
                messagingTemplate.convertAndSend(destination, message);
                break;
            default:
                // Không xử lý
        }
    }
}
