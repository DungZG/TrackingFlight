package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.AircraftCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Mapper(componentModel = "spring")
public interface AircraftMapper {

    @Mapping(target = "aircraftPicture", source = "aircraftPicture", qualifiedByName = "mapMultipartFileToBytes")
    Aircraft toAircraft(AircraftCreationRequest request);

    @Mapping(target = "aircraftPicture", source = "aircraftPicture", qualifiedByName = "mapMultipartFileToBytes")
    void updateAircraft(@MappingTarget Aircraft aircraft, AircraftCreationRequest request);

    @Named("mapMultipartFileToBytes")
    default byte[] mapMultipartFileToBytes(MultipartFile file) {
        try {
            return file != null ? file.getBytes() : null;
        } catch (IOException e) {
            throw new RuntimeException("Failed to convert MultipartFile to byte[]", e);
        }
    }

    Aircraft toAircraftResponse(Aircraft aircraft);
}
