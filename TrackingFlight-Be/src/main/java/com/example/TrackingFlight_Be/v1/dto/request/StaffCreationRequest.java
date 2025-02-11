package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class StaffCreationRequest {
    Long staffCode;
    String staffName;
    String staffEmail;
    String staffPhoneNumber;
    String staffPassword;
    String staffAddress;
    String staffIdentity;
    Long staffRole;
    Long staffFacility;
    Long staffGender;
    MultipartFile staffPicture;
}
