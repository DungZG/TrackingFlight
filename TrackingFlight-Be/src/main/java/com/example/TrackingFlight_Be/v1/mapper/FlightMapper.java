package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FlightMapper {
    FlightResponse toFlightResponse(Flight flight);
    Flight toFlight(FlightCreationRequest request);
    void updateFlight(@MappingTarget Flight flight, FlightCreationRequest request);
}
