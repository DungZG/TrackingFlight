package com.teca.application.common.exceptions;

import org.springframework.http.HttpStatus;

public class ConflictException extends HandlerException {
    public ConflictException(String message) {
        super(message != null ? message : "Đã tồn tại");
        setStatus(HttpStatus.CONFLICT.value());
    }

    public ConflictException(String name, String message) {
        super(message != null ? message : "Đã tồn tại");
        setStatus(HttpStatus.CONFLICT.value());
        setName(name);
    }
}
