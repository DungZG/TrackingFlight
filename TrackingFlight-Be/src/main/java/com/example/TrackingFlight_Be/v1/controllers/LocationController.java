package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.response.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.LocationCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Location;
import com.example.TrackingFlight_Be.v1.services.LocationService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class LocationController {
    LocationService locationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Location> createLocation(
            @RequestParam("name") String name,
            @RequestParam("country") String country,
            @RequestParam("imageUrl") MultipartFile imageUrl) {

        LocationCreationRequest request = new LocationCreationRequest();
        request.setName(name);
        request.setCountry(country);
        request.setImageUrl(imageUrl);

        ApiResponse<Location> apiResponse = new ApiResponse<>();
        apiResponse.setResult(locationService.createLocation(request));
        return apiResponse;
    }


    @GetMapping("/all")
    public List<Location> getLocations() {
        return locationService.getLocations();
    }

    @GetMapping("/{locationId}")
    public Location getLocation(@PathVariable String locationId) {
        return locationService.getLocation(locationId);
    }


    @PutMapping(value = "/{locationId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Location updateLocation(
            @PathVariable String locationId,
            @RequestBody @Valid LocationCreationRequest request) {
        return locationService.updateLocation(locationId, request);
    }

    @DeleteMapping("/{locationId}")
    public ResponseEntity<Map<String, String>> deleteStaff(@PathVariable String locationId) {
        locationService.deleteLocation(locationId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "location with id " + locationId + " has been deleted");
        return ResponseEntity.ok(response);
    }
}
