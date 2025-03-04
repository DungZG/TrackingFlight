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
public class Airline {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long airlineId;
    String airlineName;
    String airlineShotName;

    @Lob
    byte[] airlineLogo;

}
