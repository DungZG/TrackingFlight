package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Flight;
import com.example.TrackingFlight_Be.v1.entity.Seats;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatsRepository extends JpaRepository<Seats, Long> {
    List<Seats> findByFlight(Flight flight);
    Seats findByFlight_FlightIdAndSeatNumber(Long flightId, String seatNumber);
}
