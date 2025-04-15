package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.CavityCreationRequest;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import com.example.TrackingFlight_Be.v1.repositories.CavityRepository;
import com.example.TrackingFlight_Be.v1.services.CavityService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/cavity")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CavityController {
    CavityService cavityService;
    @Autowired
    CavityRepository cavityRepository;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Cavity> createCavity(@RequestBody @Valid CavityCreationRequest request) {
        ApiResponse<Cavity> apiResponse = new ApiResponse<>();
        apiResponse.setResult(cavityService.createCavity(request));
        return apiResponse;
    }

    @GetMapping("/all")
    public ApiResponse<List<Cavity>> getAllCavities() {
        ApiResponse<List<Cavity>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(cavityService.getAllCavities());
        return apiResponse;
    }

//    @PutMapping(value = "/{cavityId}", consumes = MediaType.APPLICATION_JSON_VALUE)
//    public ApiResponse<Cavity> updateCavity(@PathVariable String cavityId, @RequestBody @Valid CavityCreationRequest request) {
//        ApiResponse<Cavity> apiResponse = new ApiResponse<>();
//        apiResponse.setResult(cavityService.updateCavity(cavityId, request));
//        return apiResponse;
//    }
}
