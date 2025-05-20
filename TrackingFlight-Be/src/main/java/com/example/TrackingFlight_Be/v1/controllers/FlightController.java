package com.example.TrackingFlight_Be.v1.controllers;


import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.FlightCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.FlightResponse;
import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.mapper.FlightMapper;
import com.example.TrackingFlight_Be.v1.repositories.FlightRepository;
import com.example.TrackingFlight_Be.v1.services.FlightService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class FlightController {
    @Autowired
    private final FlightService flightService;

    @Autowired
    FlightMapper flightMapper;

    @PostMapping("/create")
    public ResponseEntity<?> createFlight(@RequestBody FlightCreationRequest request,
                                          @RequestParam(defaultValue = "false") boolean roundTrip,
                                          @RequestBody(required = false) FlightCreationRequest returnRequest) {
        if (roundTrip) {
            if (returnRequest == null) {
                return ResponseEntity.badRequest().body("Return flight data required for round trip");
            }
            List<Flight> flights = flightService.createRoundTripFlight(request, returnRequest);
            List<FlightResponse> response = flights.stream()
                    .map(flightMapper::toFlightResponse)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(response);
        } else {
            Flight flight = flightService.createFlight(request);
            FlightResponse response = flightMapper.toFlightResponse(flight);
            return ResponseEntity.ok(response);
        }
    }

    @GetMapping("/items")
    public ResponseEntity<Page<Flight>> getAllFlights(@RequestParam(defaultValue = "1") int page,
                                                      @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page-1, size);
        return ResponseEntity.ok(flightService.getAllFlights(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Flight> getFlight(@PathVariable Long id) {
        return ResponseEntity.ok(flightService.getFlight(id));
    }

    @GetMapping("/selected/{id}")
    public ResponseEntity<Flight> getSelectedFlight(@PathVariable Long id) {
        Flight flight = flightService.getFlight(id);
        return ResponseEntity.ok(flight);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Flight> updateFlight(@PathVariable Long id, @RequestBody FlightCreationRequest request) {
        return ResponseEntity.ok(flightService.updateFlight(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFlight(@PathVariable Long id) {
        flightService.deleteFlight(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<Page<FlightResponse>> searchFlights(
            @RequestParam Long departureLocation,
            @RequestParam Long arrivalLocation,
            @RequestParam Long departureTime,           // timestamp millis
            @RequestParam(required = false) Long returnDepartureTime, // timestamp millis, optional
            @RequestParam(defaultValue = "false") Boolean isRoundTrip,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        OffsetDateTime departureOffset = OffsetDateTime.ofInstant(Instant.ofEpochMilli(departureTime), ZoneOffset.UTC);
        OffsetDateTime returnOffset = returnDepartureTime != null ? OffsetDateTime.ofInstant(Instant.ofEpochMilli(returnDepartureTime), ZoneOffset.UTC) : null;

        Pageable pageable = PageRequest.of(page, size);

        Page<Flight> flights;

        if (isRoundTrip && returnOffset != null) {
            // Lấy chuyến đi (outbound)
            Page<Flight> outboundFlights = flightService.searchFlights(
                    departureLocation,
                    arrivalLocation,
                    departureOffset,
                    returnOffset,
                    false,
                    pageable);

            // Lấy chuyến về (return)
            Page<Flight> returnFlights = flightService.searchFlights(
                    arrivalLocation,
                    departureLocation,
                    returnOffset,
                    returnOffset.plusHours(3),
                    true,
                    pageable);

            // Vì trả về kiểu Page khó gộp, mình trả chuyến đi trước (frontend có thể gọi riêng chuyến về)
            flights = outboundFlights;
        } else {
            flights = flightService.searchFlights(
                    departureLocation,
                    arrivalLocation,
                    departureOffset,
                    null,
                    isRoundTrip,
                    pageable);
        }

        Page<FlightResponse> responsePage = flights.map(flightMapper::toFlightResponse);

        return ResponseEntity.ok(responsePage);
    }
}
