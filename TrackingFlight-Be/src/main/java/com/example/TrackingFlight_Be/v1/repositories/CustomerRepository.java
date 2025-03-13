package com.example.TrackingFlight_Be.v1.repositories;

import com.example.TrackingFlight_Be.v1.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,String> {

    boolean existsByCustomerName(String customerName);
    Optional<Customer> findByCustomerName(String customerName);

    @Query(value = "SELECT * FROM customers WHERE (:customerName IS NULL OR customer_name LIKE :customerName) " +
            "AND (:customerCode IS NULL OR customer_code LIKE :customerCode) " +
            "AND (:customerPhone IS NULL OR customer_phone_number LIKE :customerPhone)", nativeQuery = true)
    List<Customer> findByFilters(@Param("customerName") String customerName,
                                 @Param("customerCode") String customerCode,
                                 @Param("customerPhone") String customerPhone);

}
