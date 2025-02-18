package com.example.TrackingFlight_Be.auth.common.repositories;

import com.example.TrackingFlight_Be.auth.api.LoginController;
import com.example.TrackingFlight_Be.auth.common.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LoginRepositories extends JpaRepository<Login, String> {
    boolean existsByUsername(String username);
    Optional<LoginController> findByUsername(String username);
}
