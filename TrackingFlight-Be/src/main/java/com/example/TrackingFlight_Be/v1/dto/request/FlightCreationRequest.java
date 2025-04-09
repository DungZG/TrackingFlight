package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightCreationRequest {
    Long flightId;
    String airlineId;
    Long flightNumber;
    String departureLocation;
    Date departureTime;
    String arrivalLocation;
    Date arrivalTime;
    Long price;
}
