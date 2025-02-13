package com.example.TrackingFlight_Be.v1.services;

import com.example.TrackingFlight_Be.v1.dto.request.CustomerCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.request.StaffCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.CustomerResponse;
import com.example.TrackingFlight_Be.v1.dto.response.StaffResponse;
import com.example.TrackingFlight_Be.v1.entity.Customer;
import com.example.TrackingFlight_Be.v1.entity.Staff;
import com.example.TrackingFlight_Be.v1.exception.AppException;
import com.example.TrackingFlight_Be.v1.exception.ErrorCode;
import com.example.TrackingFlight_Be.v1.mapper.CustomerMapper;
import com.example.TrackingFlight_Be.v1.repositories.CustomerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomerService {
    CustomerRepository customerRepository;
    CustomerMapper customerMapper;


    public Customer createCustomer(CustomerCreationRequest request){
        if (customerRepository.existsByCustomerName(request.getCustomerName()))
            throw new AppException(ErrorCode.USER_EXISTED);
        Customer customer = customerMapper.toCustomer(request);
        return customerRepository.save(customer);
    }

    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }
    public CustomerResponse updateCustomers(String customerCode, CustomerCreationRequest request){
        Customer customer = customerRepository.findById(customerCode)
                .orElseThrow(() ->new RuntimeException("Couldn't find customer"));
        customerMapper.updateCustomer(customer,request);

        return customerMapper.toCustomerResponse(customerRepository.save(customer));
    }

    public void deleteCustomer(String customerCode){
        customerRepository.deleteById(customerCode);
    }

    public CustomerResponse getCustomer(String customerCode){
        return customerMapper.toCustomerResponse(customerRepository.findById(customerCode).orElseThrow(() ->new RuntimeException("Couldn't find user")));
    }
}
