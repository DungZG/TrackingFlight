package com.example.TrackingFlight_Be.v1.services;


import com.example.TrackingFlight_Be.v1.common.enums.Role;
import com.example.TrackingFlight_Be.v1.dto.request.RegisterRequest;
import com.example.TrackingFlight_Be.v1.entity.User;
import com.example.TrackingFlight_Be.v1.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username đã tồn tại");
        }
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        user.setCreatedAt(LocalDateTime.now());
//        user.setFirstName(request.getFirstName());
//        user.setLastName(request.getLastName());

        // Nếu không gửi role, mặc định là USER
//        if (request.getRole() == null) {
//            user.setRole(Role.USER);
//        } else {
//            user.setRole(request.getRole());
//        }
        return userRepository.save(user);
    }
}
