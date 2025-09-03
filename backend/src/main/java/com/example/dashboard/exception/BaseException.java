package com.example.dashboard.exception;

public abstract class BaseException extends RuntimeException {
    private final String code;
    private final int status;

    public BaseException(String message, String code, int status) {
        super(message);
        this.code = code;
        this.status = status;
    }

    public BaseException(String message, String code, int status, Throwable cause) {
        super(message, cause);
        this.code = code;
        this.status = status;
    }

    public String getCode() {
        return code;
    }

    public int getStatus() {
        return status;
    }
}

