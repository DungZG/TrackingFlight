package com.example.TrackingFlight_Be.v1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Cavity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long cavityId;
    Long cavityNumber;
    Long carvityTo;
    Long carvityFrom;
    Float price;
}
