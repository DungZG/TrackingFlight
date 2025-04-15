package com.example.TrackingFlight_Be.v1.controllers;


import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.repositories.FlightRepository;
import com.example.TrackingFlight_Be.v1.services.FlightService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FlightController {
    FlightService flightService;
    @Autowired
    FlightRepository flightRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Flight> createFlight(
            @RequestBody @Valid FlightCreationRequest request
    )
    {
        ApiResponse<Flight> apiResponse = new ApiResponse<>();
        apiResponse.setResult(flightService.createFlight(request));
        return apiResponse;
    }
    
    @GetMapping("/all")
    public List<Flight> getFlights() {
        return flightService.getFlights();
    }

    @GetMapping("/{flightId}")
    public FlightResponse getFlight(@PathVariable String flightId) {
        return flightService.getFlight(flightId);
    }

    @PutMapping(value = "/{flightId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public FlightResponse updateFlight(
            @PathVariable String flightId,
            @RequestBody @Valid FlightCreationRequest request) {
        return flightService.updateFlight(flightId, request);
    }

    @DeleteMapping("/{flightId}")
    public ResponseEntity<Map<String, String>> deleteStaff(@PathVariable String flightId) {
        flightService.deleteFlight(flightId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "User with id " + flightId + " has been deleted");
        return ResponseEntity.ok(response);
    }
    @GetMapping("/items")
    public Page<Flight> getItemsWithPagination(@RequestParam int page, @RequestParam int size) {
        PageRequest pageRequest = PageRequest.of(page - 1, size); // Bắt đầu từ trang 0
        return flightRepository.findAll(pageRequest);
    }
}
