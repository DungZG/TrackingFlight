package com.example.TrackingFlight_Be.v1.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.OffsetDateTime;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long flightId;

    @ManyToOne
    @JoinColumn(name = "airline_id")
    Airline airline;

    @ManyToOne
    @JoinColumn(name = "aircraft_id")
    Aircraft aircraft;

    String flightNumber;

    Long departureLocation;
    Long arrivalLocation;

    OffsetDateTime departureTime;
    OffsetDateTime arrivalTime;

    Double price;

    Long status;
    Long typeFlight;

    Boolean isReturnFlight;

    Long groupId;
}
