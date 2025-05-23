package com.example.TrackingFlight_Be.v1.dto.response;

import lombok.Data;

@Data
public class AuthResponse {
    private String token;
    private String Role;
    public AuthResponse(String token) {
        this.token = token;
    }
}
