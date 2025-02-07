package com.example.TrackingFlight_Be.v1.mapper;


import com.example.TrackingFlight_Be.v1.dto.request.StaffCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.StaffResponse;
import com.example.TrackingFlight_Be.v1.entity.Staff;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Mapper(componentModel = "spring")
public interface StaffMapper {

    @Mapping(target = "staffPicture", source = "staffPicture", qualifiedByName = "mapMultipartFileToBytes")
    Staff toStaff(StaffCreationRequest request);

    @Mapping(target = "staffPicture", source = "staffPicture", qualifiedByName = "mapMultipartFileToBytes")
    void updateStaff(@MappingTarget Staff staff, StaffCreationRequest request);


    @Named("mapMultipartFileToBytes")
    default byte[] mapMultipartFileToBytes(MultipartFile file) {
        try {
            return file != null ? file.getBytes() : null;
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }
    }

    StaffResponse toStaffResponse(Staff staff);


}
