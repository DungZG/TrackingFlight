package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Aircraft;
import com.example.TrackingFlight_Be.v1.entity.Cavity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CavityRepository extends JpaRepository<Cavity, Long> {
    List<Cavity> findByAircraft(Aircraft aircraft);
}
