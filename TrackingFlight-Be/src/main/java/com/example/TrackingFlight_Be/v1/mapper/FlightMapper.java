package com.example.TrackingFlight_Be.v1.mapper;

//import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface FlightMapper {

    @Mapping(source = "airline.airlineId", target = "airlineId")
    @Mapping(source = "aircraft.aircraftId", target = "aircraftId")

    FlightResponse toFlightResponse(Flight flight);


//    @Mapping(source = "airline.airlineId", target = "airlineId")
//    @Mapping(source = "aircraft.aircraftId", target = "aircraftId")
//    Flight toFlight(FlightCreationRequest request);
//    void updateFlight(@MappingTarget Flight flight, FlightCreationRequest request);
}
