package com.example.TrackingFlight_Be.v1.mapper;

import com.example.TrackingFlight_Be.v1.dto.request.CustomerCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.request.StaffCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.CustomerResponse;
import com.example.TrackingFlight_Be.v1.entity.Customer;

import com.example.TrackingFlight_Be.v1.entity.Staff;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerResponse toCustomerResponse(Customer customer);
    Customer toCustomer(CustomerCreationRequest request);
    void updateCustomer(@MappingTarget Customer customer, CustomerCreationRequest request);
}
