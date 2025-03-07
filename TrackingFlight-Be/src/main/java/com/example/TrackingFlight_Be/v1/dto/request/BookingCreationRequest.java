package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BookingCreationRequest {
    Long bookingId;

    Date bookingTime;
    Long flightId;
    Long userId;
    Long numberTraveler;
    Long travelclassId;

    String status;
}
