package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AircraftRepository extends JpaRepository<Aircraft,String> {
    // Tìm kiếm theo Mã Máy Bay
    List<Aircraft> findByAircraftCode(String aircraftCode);

    // Tìm kiếm theo Tên Máy Bay
    List<Aircraft> findByAircraftNameContaining(String aircraftName);

    // Tìm kiếm theo Hãng Máy Bay
    List<Aircraft> findByAirlineNameContaining(String airlineName);
}
