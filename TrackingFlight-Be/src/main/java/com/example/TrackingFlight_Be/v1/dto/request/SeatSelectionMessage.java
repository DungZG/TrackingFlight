package com.example.TrackingFlight_Be.v1.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatSelectionMessage {
    private Long flightId;
    private String seatNumber;
    private String action; // "select", "book", "release"
    private String userId;
}
