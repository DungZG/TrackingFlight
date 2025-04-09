package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CavityCreationRequest {
    Long cavityNumber;
    Long carvityTo;
    Long carvityFrom;
    Float price;
}
