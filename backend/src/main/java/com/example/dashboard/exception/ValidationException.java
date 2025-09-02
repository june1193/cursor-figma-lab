package com.example.dashboard.exception;

import java.util.Map;

public class ValidationException extends BaseException {
    private final Map<String, String[]> details;

    public ValidationException(String message) {
        super(message, "VALIDATION_ERROR", 400);
        this.details = null;
    }

    public ValidationException(String message, Map<String, String[]> details) {
        super(message, "VALIDATION_ERROR", 400);
        this.details = details;
    }

    public Map<String, String[]> getDetails() {
        return details;
    }
}
