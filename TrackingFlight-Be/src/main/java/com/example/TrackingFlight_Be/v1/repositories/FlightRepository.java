package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Flight;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;


@Repository
public interface FlightRepository extends JpaRepository<Flight, Long> {
    Page<Flight> findAll(Pageable pageable);

    Page<Flight> findByDepartureLocationAndArrivalLocationAndDepartureTimeBetweenAndIsReturnFlight(
            Long departureLocation, Long arrivalLocation, OffsetDateTime startTime, OffsetDateTime endTime,
            Boolean isReturnFlight, Pageable pageable);
}
