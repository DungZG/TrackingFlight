package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.AirlineCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Airline;
import com.example.TrackingFlight_Be.v1.mapper.AirlineMapper;
import com.example.TrackingFlight_Be.v1.repositories.AirlineRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AirlineService {
    AirlineRepository airlineRepository;
    AirlineMapper airlineMapper;

    public Airline createAirline(AirlineCreationRequest request) {
        Airline airline = new Airline();
        airline.setName(request.getName());
        airline.setCode(request.getCode());
        try {
            if (request.getImageUrl() != null && !request.getImageUrl().isEmpty()) {
                airline.setImageUrl(request.getImageUrl().getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to process staff picture", e);
        }


        return airlineRepository.save(airline);
    }

    public List<Airline> getAirlines() {
        return airlineRepository.findAll();
    }

}
