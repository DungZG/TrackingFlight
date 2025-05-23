package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.request.AirlineCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.ApiResponse;
import com.example.TrackingFlight_Be.v1.entity.Airline;
import com.example.TrackingFlight_Be.v1.services.AirlineService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/airline")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class AirlineController {
    AirlineService airlineService;

    @PostMapping (consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Airline> createAirline(@RequestParam("name") String name,
                              @RequestParam("code") String code,
                              @RequestParam("imageUrl") MultipartFile imageUrl) {
        AirlineCreationRequest request = new AirlineCreationRequest();
        request.setName(name);
        request.setCode(code);
        request.setImageUrl(imageUrl);
        ApiResponse<Airline> apiResponse = new ApiResponse<>();
        apiResponse.setResult(airlineService.createAirline(request));

        return apiResponse;
    }

    @GetMapping("/all")
    public ApiResponse<List<Airline>> getAirlines(){
        ApiResponse<List<Airline>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(airlineService.getAirlines());
        return apiResponse;
    }
}
