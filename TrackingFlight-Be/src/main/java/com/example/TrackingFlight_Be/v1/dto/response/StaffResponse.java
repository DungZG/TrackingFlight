package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffResponse {
    Long staffCode;
    String staffName;
    String staffEmail;
    String staffPhoneNumber;
    String staffPassword;
    String staffAddress;
    byte[] staffPicture;
    Long staffRole;
    Long staffFacility;
    Long staffGender;
}
