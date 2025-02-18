package com.example.TrackingFlight_Be.v1.controllers;

import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.CustomerCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.CustomerResponse;
import com.example.TrackingFlight_Be.v1.entity.Customer;
import com.example.TrackingFlight_Be.v1.services.CustomerService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class CustomerController {
    CustomerService customerService;

    @PostMapping
    public ApiResponse<Customer> createUser(@RequestBody @Valid CustomerCreationRequest request) {
        ApiResponse<Customer> apiResponse = new ApiResponse<>();

        apiResponse.setResult(customerService.createCustomer(request));
        return  apiResponse;
    }

    @GetMapping
    public List<Customer> getUsers() {
        return customerService.getCustomers();
    }

    @GetMapping("/{customerCode}")
    CustomerResponse getCustomer(@PathVariable String customerCode) {
        return customerService.getCustomer(customerCode);
    }

    @PutMapping("/{customerCode}")
    CustomerResponse updateCustomer(@PathVariable String customerCode, @RequestBody @Valid CustomerCreationRequest request) {
        return customerService.updateCustomers(customerCode,request);
    }

    @DeleteMapping("/{customerCode}")
    public String deleteCustomer(@PathVariable String customerCode) {
        customerService.deleteCustomer(customerCode);
        return "User with id " + customerCode + " has been deleted";
    }
}
