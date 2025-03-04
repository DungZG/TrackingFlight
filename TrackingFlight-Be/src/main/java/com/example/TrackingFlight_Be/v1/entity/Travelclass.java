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
public class Travelclass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long travelclassId;
    String travelclassName;
}
