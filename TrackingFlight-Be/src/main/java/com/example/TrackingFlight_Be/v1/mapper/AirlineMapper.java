package com.example.TrackingFlight_Be.v1.mapper;
import com.example.TrackingFlight_Be.v1.dto.request.AirlineCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Airline;
import com.example.TrackingFlight_Be.v1.entity.Location;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Mapper(componentModel = "spring")
public interface AirlineMapper {
    @Mapping(target = "imageUrl", source = "imageUrl", qualifiedByName = "mapMultipartFileToBytes")
    Airline toAirline(AirlineCreationRequest request);

    @Mapping(target = "imageUrl", source = "imageUrl", qualifiedByName = "mapMultipartFileToBytes")
    default void updateAirline(@MappingTarget Airline airline, AirlineCreationRequest request) {
        if (request.getName() != null) {
            airline.setName(request.getName());
        }
        if (request.getImageUrl() != null && !request.getImageUrl().isEmpty()) {
            airline.setImageUrl(mapMultipartFileToBytes(request.getImageUrl()));
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

    Location toAirlineResponse(Location location);
}
