package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightResponse {
    Long flightId;
    Long flightNumber;
    String departureLocation;
    Date departureTime;
    String arrivalLocation;
    Date arrivalTime;
    Long price;
}
