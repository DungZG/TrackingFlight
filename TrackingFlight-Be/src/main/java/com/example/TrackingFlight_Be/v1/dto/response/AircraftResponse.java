package com.example.TrackingFlight_Be.v1.dto.response;

import jakarta.persistence.Lob;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AircraftResponse {
    Long aircraftId;
    String aircraftCode;
    String aircraftName;
    String aircraftType;
    String airline;
    Long seatBusiness;
    Long seatEconomy;
    Long seatPremiumEconomy;
    Long quantity;
    byte[] aircraftPicture;
    String ghichu;
}
