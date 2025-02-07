package com.example.TrackingFlight_Be.v1.controllers;


import com.example.TrackingFlight_Be.v1.dto.request.ApiResponse;
import com.example.TrackingFlight_Be.v1.dto.request.StaffCreationRequest;
import com.example.TrackingFlight_Be.v1.dto.response.StaffResponse;
import com.example.TrackingFlight_Be.v1.entity.Staff;
import com.example.TrackingFlight_Be.v1.services.StaffService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/staff")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE,makeFinal = true)
public class StaffController {
    StaffService staffService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<Staff> createStaff(
            @RequestParam("staffName") String staffName,
            @RequestParam("staffEmail") String staffEmail,
            @RequestParam("staffPhoneNumber") String staffPhoneNumber,
            @RequestParam("staffPassword") String staffPassword,
            @RequestParam("staffAddress") String staffAddress,
            @RequestParam("staffRole") Long staffRole,
            @RequestParam("staffFacility") Long staffFacility,
            @RequestParam("staffGender") Long staffGender,
            @RequestParam(value = "staffPicture", required = false) MultipartFile staffPicture) {

        // Tạo DTO từ các tham số
        StaffCreationRequest request = new StaffCreationRequest();
        request.setStaffName(staffName);
        request.setStaffEmail(staffEmail);
        request.setStaffPhoneNumber(staffPhoneNumber);
        request.setStaffPassword(staffPassword);
        request.setStaffAddress(staffAddress);
        request.setStaffRole(staffRole);
        request.setStaffGender(staffGender);
        request.setStaffFacility(staffFacility);
        request.setStaffPicture(staffPicture);

        // Xử lý và trả về kết quả
        ApiResponse<Staff> apiResponse = new ApiResponse<>();
        apiResponse.setResult(staffService.createStaff(request));
        return apiResponse;
    }

    // Lấy danh sách tất cả Staff
    @GetMapping
    public List<Staff> getStaffs() {
        return staffService.getStaffs();
    }

    // Lấy thông tin Staff theo mã code
    @GetMapping("/{staffCode}")
    public StaffResponse getStaff(@PathVariable String staffCode) {
        return staffService.getStaff(staffCode);
    }

    // Cập nhật thông tin Staff
    @PutMapping(value = "/{staffCode}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public StaffResponse updateStaff(
            @PathVariable String staffCode,
            @RequestBody @Valid StaffCreationRequest request) {
        return staffService.updateUser(staffCode, request);
    }

    // Xóa Staff theo mã code
    @DeleteMapping("/{staffCode}")
    public String deleteStaff(@PathVariable String staffCode) {
        staffService.deleteStaff(staffCode);
        return "Staff with id " + staffCode + " has been deleted";
    }
}
