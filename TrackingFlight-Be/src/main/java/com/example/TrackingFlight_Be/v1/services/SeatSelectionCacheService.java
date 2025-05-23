package com.example.TrackingFlight_Be.v1.services;


import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SeatSelectionCacheService {
    // key = flightId-seatNumber, value = timestamp (millis) khi chọn tạm
    private final Map<String, Long> selectedSeats = new ConcurrentHashMap<>();

    private final long HOLD_TIMEOUT_MS = 2 * 60 * 1000; // 2 phút

    public boolean holdSeat(Long flightId, String seatNumber) {
        String key = key(flightId, seatNumber);
        long now = Instant.now().toEpochMilli();
        if (selectedSeats.containsKey(key)) {
            return false; // đã bị giữ rồi
        }
        selectedSeats.put(key, now);
        return true;
    }

    public void releaseSeat(Long flightId, String seatNumber) {
        selectedSeats.remove(key(flightId, seatNumber));
    }

    public boolean isSeatHeld(Long flightId, String seatNumber) {
        return selectedSeats.containsKey(key(flightId, seatNumber));
    }

    private String key(Long flightId, String seatNumber) {
        return flightId + "-" + seatNumber;
    }

    // Scheduled task chạy mỗi phút kiểm tra timeout, tự động release ghế giữ lâu hơn timeout
    @Scheduled(fixedRate = 60 * 1000)
    public void cleanExpiredHolds() {
        long now = Instant.now().toEpochMilli();
        selectedSeats.entrySet().removeIf(entry -> (now - entry.getValue()) > HOLD_TIMEOUT_MS);
    }
}
