package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AircraftResponse {
    Long aircraftId;
    String aircraftName;
    String aircraftCode;
    Long tankage;
    Long airlineId;
    List<CavityResponse> cavityList;
}
