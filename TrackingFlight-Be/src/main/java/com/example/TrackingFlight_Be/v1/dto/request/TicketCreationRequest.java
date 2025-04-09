package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketCreationRequest {
     Long userId;
     Long flightId;
     String ticketType;
     String seatNumber;
     String status;
     LocalDateTime bookingTime;
     Long paymentId;
     String ticketClass;
     Long discountId;
}
