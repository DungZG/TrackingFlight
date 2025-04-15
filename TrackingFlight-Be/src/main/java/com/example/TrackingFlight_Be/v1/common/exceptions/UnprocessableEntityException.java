package com.example.TrackingFlight_Be.v1.common.exceptions;

import org.springframework.http.HttpStatus;

public class UnprocessableEntityException extends HandlerException {
    public UnprocessableEntityException(String message) {
        super(message != null ? message : "Không thể xử lý");
        setStatus(HttpStatus.UNPROCESSABLE_ENTITY.value());
    }
}
