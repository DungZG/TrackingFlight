package com.example.TrackingFlight_Be.auth.api;

import com.example.TrackingFlight_Be.auth.common.services.AuthenticationService;
import com.example.TrackingFlight_Be.auth.dto.request.AuthenticationRequest;
import com.example.TrackingFlight_Be.auth.dto.response.AuthenticationResponse;
import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AuthenticationController {
    AuthenticationService authenticationService;

}