package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AircraftCreationRequest {
    String aircraftName;
    String aircraftCode;
    Long tankage;
    Long  airlineId;
    List<CavityCreationRequest> cavityList;
}
