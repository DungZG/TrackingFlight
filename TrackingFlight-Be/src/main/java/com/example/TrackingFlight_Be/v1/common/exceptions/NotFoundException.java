package com.example.TrackingFlight_Be.v1.common.exceptions;

import org.springframework.http.HttpStatus;

public class NotFoundException extends HandlerException {
    public NotFoundException() {
        super("Không tìm thấy");
        setStatus(HttpStatus.NOT_FOUND.value());
    }

    public NotFoundException(String message) {
        super(message);
        setStatus(HttpStatus.NOT_FOUND.value());
    }
}
