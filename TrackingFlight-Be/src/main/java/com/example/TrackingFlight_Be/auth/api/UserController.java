package com.example.TrackingFlight_Be.auth.api;


import com.example.TrackingFlight_Be.auth.common.entity.User;
import com.example.TrackingFlight_Be.auth.common.services.UserService;
import com.example.TrackingFlight_Be.auth.dto.request.UserCreationRequest;
import com.example.TrackingFlight_Be.auth.dto.request.UserUpdateRequest;
import com.example.TrackingFlight_Be.auth.dto.response.UserResponse;
import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class UserController {
     UserService userService;

    @PostMapping
    public ApiResponse<User> createUser(@RequestBody @Valid UserCreationRequest request) {
        ApiResponse<User> apiResponse = new ApiResponse<>();

        apiResponse.setResult(userService.createUser(request));
        return  apiResponse;
    }

    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    UserResponse getUser(@PathVariable String id) {
        return userService.getUser(id);
    }

    @PutMapping("/{userId}")
    UserResponse updateUser(@PathVariable String userId, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userId,request);
    }

    @DeleteMapping("/{userId}")
    public String deleteUser(@PathVariable String userId) {
        userService.deleteUser(userId);
        return "User with id " + userId + " has been deleted";
    }
}
