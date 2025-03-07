package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FlightCreationRequest {
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
