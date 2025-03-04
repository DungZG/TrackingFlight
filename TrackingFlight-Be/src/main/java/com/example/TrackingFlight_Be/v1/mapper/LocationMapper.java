package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.LocationCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    @Mapping(target = "locationPicture", source = "locationPicture", qualifiedByName = "mapMultipartFileToBytes")
    Location toLocation(LocationCreationRequest request);

    @Mapping(target = "locationPicture", source = "locationPicture", qualifiedByName = "mapMultipartFileToBytes")
    void updateLocation(@MappingTarget Location location, LocationCreationRequest request);

    @Named("mapMultipartFileToBytes")
    default byte[] mapMultipartFileToBytes(MultipartFile file) {
        try {
            return file != null ? file.getBytes() : null;
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }
    }

    Location toLocationResponse(Location location);
}
