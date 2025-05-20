package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;


import java.time.OffsetDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightCreationRequest {
    private Long airlineId;
    private Long aircraftId;
    private String flightNumber;
    private Long departureLocation;
    private Long arrivalLocation;
    private OffsetDateTime departureTime;
    private OffsetDateTime arrivalTime;
    private Double price;
    private Long status;
    private Long typeFlight;
    private Boolean isReturnFlight;
    private Long groupId;
}
