package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.entity.Travelclass;
import com.example.TrackingFlight_Be.v1.mapper.TravelclassMapper;
import com.example.TrackingFlight_Be.v1.repositories.TravelclassRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class TravelclassService {
    TravelclassRepository travelclassRepository;
    TravelclassMapper travelclassMapper;

    public List<Travelclass> getAllTravelclass() {
        return travelclassRepository.findAll();
    }
}
