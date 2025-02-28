package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AircraftCreationRequest {
    Long aircraftId;
    String aircraftCode;
    String aircraftName;
    String aircraftType;
    String airline;
    Long seatBusiness;
    Long seatEconomy;
    Long seatPremiumEconomy;
    Long quantity;
    MultipartFile aircraftPicture;
    String ghichu;
}
