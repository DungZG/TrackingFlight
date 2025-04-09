package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TicketResponse {
     Long ticketId;
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
