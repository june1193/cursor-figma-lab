package com.example.dashboard.exception;

public class DataNotFoundException extends BaseException {
    public DataNotFoundException(String message) {
        super(message, "DATA_NOT_FOUND", 404);
    }

    public DataNotFoundException(String message, Throwable cause) {
        super(message, "DATA_NOT_FOUND", 404, cause);
    }
}
