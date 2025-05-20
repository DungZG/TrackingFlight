package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightResponse {
    Long flightId;
    String flightNumber;
    Long departureLocation;
    Long arrivalLocation;
    OffsetDateTime departureTime;
    OffsetDateTime arrivalTime;
    Double price;
    Boolean isReturnFlight;
    Long airlineId;
    Long aircraftId;
    Long status;
    Long typeFlight;
}
