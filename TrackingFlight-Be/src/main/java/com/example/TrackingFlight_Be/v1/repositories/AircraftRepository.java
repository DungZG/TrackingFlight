package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft,String> {
    Page<Aircraft> findByAircraftCodeAndAircraftNameAndAirlineName(
            String aircraftCode,
            String aircraftName,
            String airlineName,
            Pageable pageable);

    Page<Aircraft> findByAircraftCode(String aircraftCode, Pageable pageable);

    Page<Aircraft> findByAircraftName(String aircraftName, Pageable pageable);

    Page<Aircraft> findByAirlineName(String airlineName, Pageable pageable);


}
