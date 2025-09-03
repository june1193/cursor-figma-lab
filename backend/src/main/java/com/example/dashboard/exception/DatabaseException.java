package com.example.dashboard.exception;

public class DatabaseException extends BaseException {
    public DatabaseException(String message) {
        super(message, "DATABASE_ERROR", 500);
    }

    public DatabaseException(String message, Throwable cause) {
        super(message, "DATABASE_ERROR", 500, cause);
    }
}

