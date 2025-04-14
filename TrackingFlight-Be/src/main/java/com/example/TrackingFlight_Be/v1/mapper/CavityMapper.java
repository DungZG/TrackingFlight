package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.CavityCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.CavityResponse;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CavityMapper {
    Cavity toCavity(CavityCreationRequest request);

    void updateCavity(@MappingTarget Cavity cavity, CavityCreationRequest request);

    CavityResponse toCavityResponse(Cavity cavity);

    List<CavityResponse> toCavityResponses(List<Cavity> cavityList);
}
