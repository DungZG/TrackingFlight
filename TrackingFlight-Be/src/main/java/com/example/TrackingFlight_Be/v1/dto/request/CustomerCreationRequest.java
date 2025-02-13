package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CustomerCreationRequest {
    Long customerCode;
    String customerName;
    String customerEmail;
    String customerPhoneNumber; 
    String customerAddress;
    String customerIdentity;
    Long customerType;
}
