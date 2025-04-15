package com.example.TrackingFlight_Be.v1.common.exceptions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

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