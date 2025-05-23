package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
}
