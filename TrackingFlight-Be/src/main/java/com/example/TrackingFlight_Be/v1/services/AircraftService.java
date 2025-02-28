package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.AircraftCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import com.example.TrackingFlight_Be.v1.mapper.AircraftMapper;
import com.example.TrackingFlight_Be.v1.repositories.AircraftRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AircraftService {
    AircraftRepository aircraftRepository;
    AircraftMapper aircraftMapper;

    public Aircraft createAircraft(AircraftCreationRequest request) {
        Aircraft aircraft = new Aircraft();
        aircraft.setAircraftCode(request.getAircraftCode());
        aircraft.setAircraftName(request.getAircraftName());
        aircraft.setAircraftType(request.getAircraftType());
        aircraft.setAirline(request.getAirline());
        aircraft.setSeatBusiness(request.getSeatBusiness());
        aircraft.setSeatEconomy(request.getSeatEconomy());
        aircraft.setSeatPremiumEconomy(request.getSeatPremiumEconomy());
        aircraft.setQuantity(request.getQuantity());
        aircraft.setGhichu(request.getGhichu());

        try {
            if (request.getAircraftPicture() != null && !request.getAircraftPicture().isEmpty()) {
                aircraft.setAircraftPicture(request.getAircraftPicture().getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to process staff picture", e);
        }

        return aircraftRepository.save(aircraft);
    }
    public List<Aircraft> getAircrafts(){
        return aircraftRepository.findAll();
    }
    public Aircraft updateAircraft(String aircraftId, AircraftCreationRequest request){
        Aircraft aircraft = aircraftRepository.findById(aircraftId)
                .orElseThrow(() ->new RuntimeException("Couldn't find user"));
        aircraftMapper.updateAircraft(aircraft,request);
        return aircraftMapper.toAircraftResponse(aircraftRepository.save(aircraft));
    }

    public void deleteAircraft(String aircraftId){
        aircraftRepository.deleteById(aircraftId);
    }

    public Aircraft getAircraft(String aircraftId){
        return aircraftMapper.toAircraftResponse(aircraftRepository.findById(aircraftId).orElseThrow(() ->new RuntimeException("Couldn't find user")));
    }

}
