package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.LocationCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Location;
import com.example.TrackingFlight_Be.v1.mapper.LocationMapper;
import com.example.TrackingFlight_Be.v1.repositories.LocationRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class LocationService {
    LocationRepository locationRepository;
    LocationMapper locationMapper;

    public Location createLocation(LocationCreationRequest request) {
        Location location = new Location();
        location.setCountry(request.getCountry());
        location.setName(request.getName());

        try {
            if (request.getImageUrl() != null && !request.getImageUrl().isEmpty()) {
                location.setImageUrl(request.getImageUrl().getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to process staff picture", e);
        }

        return locationRepository.save(location);
    }
    public List<Location> getLocations(){
        return locationRepository.findAll();
    }
    public Location updateLocation(String locationId, LocationCreationRequest request){
        Location location = locationRepository.findById(locationId)
                .orElseThrow(() ->new RuntimeException("Couldn't find user"));
        locationMapper.updateLocation(location,request);
        return locationMapper.toLocationResponse(locationRepository.save(location));
    }

    public void deleteLocation(String locationId){
        locationRepository.deleteById(locationId);
    }

    public Location getLocation(String locationId){
        return locationMapper.toLocationResponse(locationRepository.findById(locationId).orElseThrow(() ->new RuntimeException("Couldn't find location")));
    }
}
