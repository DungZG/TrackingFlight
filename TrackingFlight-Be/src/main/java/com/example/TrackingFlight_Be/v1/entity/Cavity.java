package com.example.TrackingFlight_Be.v1.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Cavity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long cavityId;
    Long cavityNumber;
    Long carvityTo;
    Long carvityFrom;
    String cavityClass;
    Double price;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "aircraft_id")
    Aircraft aircraft;
}
