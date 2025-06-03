package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.response.ApiResponse;
import com.example.TrackingFlight_Be.v1.entity.Ticket;
import com.example.TrackingFlight_Be.v1.mapper.TicketMapper;
import com.example.TrackingFlight_Be.v1.repositories.TicketRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/flight")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class TicketController {
    @Autowired
    TicketRepository ticketRepository;

    @Autowired
    TicketMapper ticketMapper;

    @GetMapping("/all")
    public ApiResponse<List<Ticket>> getAllTickets() {
        ApiResponse<List<Ticket>> apiResponse = new ApiResponse<>();
        apiResponse.setResult(ticketRepository.findAll());
        return apiResponse;
    }
}
