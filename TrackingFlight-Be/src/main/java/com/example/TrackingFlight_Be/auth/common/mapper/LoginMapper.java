package com.example.TrackingFlight_Be.auth.common.mapper;

import com.example.TrackingFlight_Be.auth.common.entity.Login;
import com.example.TrackingFlight_Be.auth.dto.request.LoginCreationRequest;
import com.example.TrackingFlight_Be.auth.dto.request.LoginUpdateRequest;
import com.example.TrackingFlight_Be.auth.dto.response.LoginResponse;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface LoginMapper {
    Login toUser(LoginCreationRequest request);
    //    @Mapping(target="lastName", ignore = true)
    LoginResponse toUserResponse(Login user);
    void updateUser(@MappingTarget Login user , LoginUpdateRequest request);
}
