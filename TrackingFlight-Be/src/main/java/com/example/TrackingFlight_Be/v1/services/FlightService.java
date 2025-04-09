package com.example.TrackingFlight_Be.v1.services;


import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.mapper.FlightMapper;
import com.example.TrackingFlight_Be.v1.repositories.FlightRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FlightService {
   FlightRepository flightRepository;
   FlightMapper flightMapper;

   public Flight createFlight(FlightCreationRequest request) {
      Flight flight = flightMapper.toFlight(request);
      return flightRepository.save(flight);
   }

   public List<Flight> getFlights(){
      return flightRepository.findAll();
   }
   public FlightResponse updateFlight(String flightId, FlightCreationRequest request){
      Flight flight = flightRepository.findById(flightId)
              .orElseThrow(() ->new RuntimeException("Couldn't"));
      flightMapper.updateFlight(flight,request);
      return flightMapper.toFlightResponse(flightRepository.save(flight));
   }

   public void deleteFlight(String flightId){
      flightRepository.deleteById(flightId);
   }

   public FlightResponse getFlight(String flightId){
      return flightMapper.toFlightResponse(flightRepository.findById(flightId).orElseThrow(() ->new RuntimeException("Couldn't find user")));
   }

}
