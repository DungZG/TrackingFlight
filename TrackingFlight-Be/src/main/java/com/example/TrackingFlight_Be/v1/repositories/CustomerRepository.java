package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Customer;
import com.example.TrackingFlight_Be.v1.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String> {

    boolean existsByCustomerName(String CustomerName);
    Optional<Staff> findByCustomerName(String CustomerName);
}
