package com.example.TrackingFlight_Be.v1.common.exceptions;

public class ColumnCodeConflictException extends ConflictException {
    public ColumnCodeConflictException() {
        super("Mã đã tồn tại");
    }

    public ColumnCodeConflictException(String message) {
        super(message);
    }
}
