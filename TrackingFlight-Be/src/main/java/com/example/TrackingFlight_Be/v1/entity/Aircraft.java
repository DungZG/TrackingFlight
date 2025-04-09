package com.example.TrackingFlight_Be.v1.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Aircraft {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long aircraftId;
    String aircraftName;
    String aircraftCode;
    @ManyToOne
    @JoinColumn(name = "airline_id")
    Airline airline;
    Long tankage;
    @ManyToOne
    @JoinColumn(name = "cavity_id")
    Cavity cavity;

}
