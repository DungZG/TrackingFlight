package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.repositories.CavityRepository;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CavityMapper {
    CavityRepository toCavityResponse(Cavity cavity);
    Cavity toCavity(CavityCreationRequest request);
    void updateCavity(@MappingTarget Cavity cavity, CavityCreationRequest request);
}
