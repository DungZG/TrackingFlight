package com.example.TrackingFlight_Be.auth.common.services;


import com.example.TrackingFlight_Be.auth.common.entity.User;
import com.example.TrackingFlight_Be.auth.common.mapper.UserMapper;
import com.example.TrackingFlight_Be.auth.common.repositories.UserRepository;
import com.example.TrackingFlight_Be.auth.dto.request.UserCreationRequest;
import com.example.TrackingFlight_Be.auth.dto.request.UserUpdateRequest;
import com.example.TrackingFlight_Be.auth.dto.response.UserResponse;
import com.example.TrackingFlight_Be.v1.exception.AppException;
import com.example.TrackingFlight_Be.v1.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

     UserRepository userRepository;
     UserMapper userMapper;
    public User createUser(UserCreationRequest request){
        if (userRepository.existsByUsername(request.getUsername()))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
//        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
//        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userRepository.save(user);
    }
    public UserResponse updateUser(String userId, UserUpdateRequest request){
        User user = userRepository.findById(userId)
                .orElseThrow(() ->new RuntimeException("Couldn't find user"));
        userMapper.updateUser(user,request);

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(userId);
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public UserResponse getUser(String id){
        return userMapper.toUserResponse(userRepository.findById(id).orElseThrow(() ->new RuntimeException("Couldn't find user")));
    }


}
