package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CavityCreationRequest {
    Long cavityId;
    Long cavityNumber;
    Long cavityTo;
    Long cavityFrom;
    String cavityClass;
    Float price;
}
