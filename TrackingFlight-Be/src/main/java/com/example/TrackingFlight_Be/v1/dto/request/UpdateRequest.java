package com.example.TrackingFlight_Be.v1.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateRequest {
    @NotBlank
    private String username; // dùng để xác định user cần update

    private String sdt;
    private String firstName;
    private String lastName;
    private String gender;
    private String location;
    private String cccd;
    private LocalDate dob;
}
