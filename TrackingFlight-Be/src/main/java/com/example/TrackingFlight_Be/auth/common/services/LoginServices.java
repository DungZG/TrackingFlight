package com.example.TrackingFlight_Be.auth.common.services;

import com.example.TrackingFlight_Be.auth.common.entity.Login;
import com.example.TrackingFlight_Be.auth.common.mapper.LoginMapper;
import com.example.TrackingFlight_Be.auth.common.repositories.LoginRepositories;
import com.example.TrackingFlight_Be.auth.dto.request.LoginCreationRequest;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LoginServices {
    LoginRepositories userRepository;
    LoginMapper userMapper;

}
