package com.example.TrackingFlight_Be.auth.common.mapper;


import com.example.TrackingFlight_Be.auth.common.entity.User;
import com.example.TrackingFlight_Be.auth.dto.request.UserCreationRequest;
import com.example.TrackingFlight_Be.auth.dto.request.UserUpdateRequest;
import com.example.TrackingFlight_Be.auth.dto.response.UserResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface UserMapper {
    User toUser(UserCreationRequest request);
//    @Mapping(target="lastName", ignore = true)
    UserResponse toUserResponse(User user);
    void updateUser(@MappingTarget User user , UserUpdateRequest request);
}
