package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.CavityCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import com.example.TrackingFlight_Be.v1.mapper.CavityMapper;
import com.example.TrackingFlight_Be.v1.repositories.CavityRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CavityService {
    CavityRepository cavityRepository;
    CavityMapper cavityMapper;

    public Cavity createCavity(CavityCreationRequest request) {
        return cavityRepository.save(cavityMapper.toCavity(request));
    }

    public void deleteCavity(String cavityId) {
        cavityRepository.deleteById(Long.valueOf(cavityId));
    }

    public void updateCavity(String cavityId,CavityCreationRequest request) {
        cavityRepository.save(cavityMapper.toCavity(request));
    }

    public List<Cavity> getAllCavities() {return cavityRepository.findAll();}

    public Cavity getCavity(String cavityId) {
        return cavityRepository.findById(Long.valueOf(cavityId)).get();
    }
}
