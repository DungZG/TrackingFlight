package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.AircraftCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.AircraftResponse;
import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AircraftMapper {
    Aircraft toAircraft(AircraftCreationRequest request);
    AircraftResponse toAircraftResponse(Aircraft aircraft);
}
