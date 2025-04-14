package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.request.AircraftCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import com.example.TrackingFlight_Be.v1.services.AircraftService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/aircraft")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AircraftController {
    AircraftService aircraftService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ApiResponse<Aircraft> createAircraft(
            @RequestBody @Valid AircraftCreationRequest request
        )
    {
        ApiResponse<Aircraft> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.createAircraft(request));
        return apiResponse;
    }

    @GetMapping
    public ApiResponse<List<Aircraft>> getAllCavities() {
        ApiResponse<List<Aircraft>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.getAircrafts());
        return apiResponse;
    }

    // Lấy thông tin chi tiết một Aircraft
    @GetMapping("/{aircraftId}")
    public ApiResponse<Aircraft> getAircraftById(@PathVariable Long aircraftId) {
        ApiResponse<Aircraft> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.getAircraft(aircraftId));
        return apiResponse;
    }

    // Sửa thông tin Aircraft
    @PutMapping("/{aircraftId}")
    public ApiResponse<Aircraft> updateAircraft(
            @PathVariable Long aircraftId,
            @RequestBody @Valid AircraftCreationRequest request
    ) {
        ApiResponse<Aircraft> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.updateAircraft(aircraftId, request));
        return apiResponse;
    }

    // Xóa một Aircraft
    @DeleteMapping("/{aircraftId}")
    public ResponseEntity<Void> deleteAircraft(@PathVariable Long aircraftId) {
        aircraftService.deleteAircraft(aircraftId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Xóa thành công, không có nội dung trả về
    }

    @GetMapping("/search")
    public ApiResponse<List<Aircraft>> searchAircraft(
            @RequestParam(required = false) String aircraftCode,
            @RequestParam(required = false) String aircraftName,
            @RequestParam(required = false) String airlineName
    ) {
        ApiResponse<List<Aircraft>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(aircraftService.searchAircraft(aircraftCode, aircraftName, airlineName));
        return apiResponse;
    }
}
