package com.example.TrackingFlight_Be.v1.common.exceptions;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends HandlerException {
    public ForbiddenException(String message) {
        super(message != null ? message : "Không có quyền");
        setStatus(HttpStatus.FORBIDDEN.value());
    }
}
