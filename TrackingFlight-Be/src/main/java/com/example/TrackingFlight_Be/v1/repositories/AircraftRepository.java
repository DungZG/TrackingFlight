package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import com.example.TrackingFlight_Be.v1.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface AircraftRepository extends JpaRepository<Aircraft, String> {
    boolean existsByAircraftName(String aircraftName);
    Optional<Aircraft> findByAircraftName(String aircraftName);
}
