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
    default void updateLocation(@MappingTarget Location location, LocationCreationRequest request) {
        if (request.getLocationCity() != null) {
            location.setLocationCity(request.getLocationCity());
        }
        if (request.getLocationPicture() != null && !request.getLocationPicture().isEmpty()) {
            location.setLocationPicture(mapMultipartFileToBytes(request.getLocationPicture()));
        }
    }


    @Named("mapMultipartFileToBytes")
    default byte[] mapMultipartFileToBytes(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        try {
            return file.getBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }
    }


    Location toLocationResponse(Location location);

}
