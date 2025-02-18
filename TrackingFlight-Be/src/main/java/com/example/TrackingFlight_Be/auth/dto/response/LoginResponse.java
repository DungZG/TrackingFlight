package com.example.TrackingFlight_Be.auth.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class LoginResponse {
    Long id;
    String username;
    String password;
    String firstName;
    String lastName;
    LocalDate dod;
}
