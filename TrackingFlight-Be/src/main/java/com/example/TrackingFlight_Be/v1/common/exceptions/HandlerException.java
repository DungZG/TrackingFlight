package com.teca.application.common.exceptions;

import org.springframework.http.HttpStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HandlerException extends RuntimeException {
    protected Integer status = HttpStatus.INTERNAL_SERVER_ERROR.value();

    private String name = "message";

    private String code = "Error";

    public HandlerException() {
        super("Lỗi hệ thống");
    }

    public HandlerException(String message) {
        super(message);
    }

    public void setName(String name) {
        this.name = name;
    }
}