package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerResponse {
    Long customerCode;
    String customerName;
    String customerEmail;
    String customerPhoneNumber;
    String customerAddress;
    String customerIdentity;
    Long customerType;
}
