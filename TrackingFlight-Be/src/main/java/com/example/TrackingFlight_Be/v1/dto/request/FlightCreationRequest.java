package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightCreationRequest {
    private Long airlineId;
    private String flightNumber;
    private String departureLocation;
    private String arrivalLocation;
    private Timestamp departureTime;
    private Timestamp arrivalTime;
    private Double price;
    private Long aircraftId;
    private Long status;
    private  Long typeFlight;
}
