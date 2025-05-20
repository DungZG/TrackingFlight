package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.auth.common.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
