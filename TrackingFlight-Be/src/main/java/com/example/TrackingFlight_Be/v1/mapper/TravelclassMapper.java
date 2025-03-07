package com.example.TrackingFlight_Be.v1.mapper;


import com.example.TrackingFlight_Be.v1.dto.request.TravelclassCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.TravelclassResponse;
import com.example.TrackingFlight_Be.v1.entity.Travelclass;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface TravelclassMapper {
    TravelclassResponse toTravelclassResponse(Travelclass travelclass);
    Travelclass toTravelclass(TravelclassCreationRequest request);
    void  updateTravelclass(@MappingTarget Travelclass travelclass, TravelclassCreationRequest request);
}
