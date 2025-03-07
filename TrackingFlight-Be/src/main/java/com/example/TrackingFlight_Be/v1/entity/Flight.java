package com.example.TrackingFlight_Be.v1.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

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

    Long flightNumber;
    String aircraftCode;
    String d_city;
    Date d_date_Time;
    String city;
    Date a_date_Time;
    Long price;

    Boolean free_meals;
    Boolean refundable;
}
