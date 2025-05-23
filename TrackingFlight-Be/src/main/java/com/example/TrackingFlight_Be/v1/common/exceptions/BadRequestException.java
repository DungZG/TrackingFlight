package com.example.TrackingFlight_Be.v1.common.exceptions;

import org.springframework.http.HttpStatus;

public class BadRequestException extends HandlerException {
    public BadRequestException(String message) {
        super(message != null ? message : "Không hợp lệ");
        setStatus(HttpStatus.BAD_REQUEST.value());
    }
}
