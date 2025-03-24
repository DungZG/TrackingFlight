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
    @Mapping(target = "imageUrl", source = "imageUrl", qualifiedByName = "mapMultipartFileToBytes")
    Location toLocation(LocationCreationRequest request);

    @Mapping(target = "imageUrl", source = "imageUrl", qualifiedByName = "mapMultipartFileToBytes")
    default void updateLocation(@MappingTarget Location location, LocationCreationRequest request) {
        if (request.getCountry() != null) {
            location.setCountry(request.getCountry());
        }
        if (request.getImageUrl() != null && !request.getImageUrl().isEmpty()) {
            location.setImageUrl(mapMultipartFileToBytes(request.getImageUrl()));
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
