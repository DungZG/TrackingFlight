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
      Flight flight = new Flight();
      flight.setFlightNumber(request.getFlightNumber());
      flight.setAircraftCode(request.getAircraftCode());
      flight.setD_city(request.getD_city());
      flight.setD_date_Time(request.getD_date_Time());
      flight.setCity(request.getCity());
      flight.setA_date_Time(request.getA_date_Time());
      flight.setPrice(request.getPrice());
      flight.setTravelclassName(request.getTravelclassName());
      flight.setFree_meals(request.getFree_meals());
      flight.setRefundable(request.getRefundable());

      return flightRepository.save(flight);
   }
   public List<Flight> getFlights(){
      return flightRepository.findAll();
   }
   public FlightResponse updateFlight(String flightId, FlightCreationRequest request){
      Flight flight = flightRepository.findById(flightId)
              .orElseThrow(() ->new RuntimeException("Couldn't find user"));
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
