package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AirlineResponse {
    Long airlineId;
    String name;
    String code;
    byte[] imageUrl;
}
