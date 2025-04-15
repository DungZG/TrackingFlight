package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.AircraftCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.request.CavityCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import com.example.TrackingFlight_Be.v1.entity.Airline;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import com.example.TrackingFlight_Be.v1.mapper.AircraftMapper;
import com.example.TrackingFlight_Be.v1.repositories.AircraftRepository;
import com.example.TrackingFlight_Be.v1.repositories.AirlineRepository;
import com.example.TrackingFlight_Be.v1.repositories.CavityRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AircraftService {
    AircraftMapper aircraftMapper;
    AircraftRepository aircraftRepository;
    CavityRepository cavityRepository;
    AirlineRepository airlineRepository;
    public Aircraft createAircraft(AircraftCreationRequest request) {
        Airline airline = airlineRepository.findById(request.getAirlineId())
                .orElseThrow(() -> new RuntimeException("Airline không tồn tai"));

        Aircraft aircraft = aircraftMapper.toAircraft(request);
        aircraft.setAirline(airline);

        Aircraft savedAircraft = aircraftRepository.save(aircraft);
        List<Cavity> cavities = request.getCavityList().stream()
                .map(c -> {
                    Cavity cavity = new Cavity();
                    cavity.setAircraft(savedAircraft);
                    cavity.setCavityNumber(c.getCavityNumber());
                    cavity.setCarvityFrom(c.getCavityFrom());
                    cavity.setCarvityTo(c.getCavityTo());
                    cavity.setCavityClass(c.getCavityClass());
                    cavity.setPrice(c.getPrice());
                    return cavity;
                }).collect(Collectors.toList());
        cavityRepository.saveAll(cavities);
        return savedAircraft;
    }

    public Aircraft getAircraft(Long aircraftId) {
        return aircraftRepository.findById(String.valueOf(aircraftId)).get();
    }

    public Page<Aircraft> getAircrafts(Pageable pageable) {
        return aircraftRepository.findAll(pageable);
    }

    public List<Aircraft> getAircraftss() {
        return aircraftRepository.findAll();
    }

    public Aircraft updateAircraft(Long aircraftId, AircraftCreationRequest request) {
        Aircraft existingAircraft = aircraftRepository.findById(String.valueOf(aircraftId))
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        Airline airline = airlineRepository.findById(request.getAirlineId())
                .orElseThrow(() -> new RuntimeException("Airline not found"));

        existingAircraft.setAircraftName(request.getAircraftName());
        existingAircraft.setAircraftCode(request.getAircraftCode());
        existingAircraft.setTankage(request.getTankage());
        existingAircraft.setAirline(airline);

        Aircraft updatedAircraft = aircraftRepository.save(existingAircraft);

        for (int i = 0; i < request.getCavityList().size(); i++) {
            CavityCreationRequest cavityRequest = request.getCavityList().get(i);
            Cavity cavity = cavityRepository.findById(cavityRequest.getCavityId())
                    .orElseThrow(() -> new RuntimeException("Cavity not found"));

            cavity.setCavityNumber(cavityRequest.getCavityNumber());
            cavity.setCarvityFrom(cavityRequest.getCavityFrom());
            cavity.setCarvityTo(cavityRequest.getCavityTo());
            cavity.setCavityClass(cavityRequest.getCavityClass());
            cavity.setPrice(cavityRequest.getPrice());
            cavityRepository.save(cavity);
        }

        return updatedAircraft;
    }

    public void deleteAircraft(Long aircraftId) {
        Aircraft aircraft = aircraftRepository.findById(String.valueOf(aircraftId))
                .orElseThrow(() -> new RuntimeException("Aircraft not found"));

        List<Cavity> cavities = cavityRepository.findByAircraft(aircraft);
        cavityRepository.deleteAll(cavities);

        aircraftRepository.delete(aircraft);
    }

    public Page<Aircraft> searchAircraft(String aircraftCode, String aircraftName, String airlineName, Pageable pageable) {
        if (aircraftCode != null && !aircraftCode.isEmpty()) {
            return aircraftRepository.findByAircraftCode(aircraftCode, pageable);
        }
        if (aircraftName != null && !aircraftName.isEmpty()) {
            return aircraftRepository.findByAircraftName(aircraftName, pageable);
        }
        if (airlineName != null && !airlineName.isEmpty()) {
            return aircraftRepository.findByAirlineName(airlineName, pageable);
        }
        return aircraftRepository.findAll(pageable);
    }
}
