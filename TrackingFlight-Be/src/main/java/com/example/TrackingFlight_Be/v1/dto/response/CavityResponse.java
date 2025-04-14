package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CavityResponse {
    Long cavityId;
    Long cavityNumber;
    Long cavityTo;
    Long cavityFrom;
    String cavityClass;
    Float price;
}
