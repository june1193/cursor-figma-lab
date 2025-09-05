package com.example.dashboard.exception;

import java.util.Map;

/**
 * 커스텀 예외 클래스들을 통합 관리
 */
public class CustomExceptions {
    
    /**
     * 기본 예외 클래스
     */
    public abstract static class BaseException extends RuntimeException {
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

    /**
     * 검증 예외
     */
    public static class ValidationException extends BaseException {
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

    /**
     * 데이터베이스 예외
     */
    public static class DatabaseException extends BaseException {
        public DatabaseException(String message) {
            super(message, "DATABASE_ERROR", 500);
        }

        public DatabaseException(String message, Throwable cause) {
            super(message, "DATABASE_ERROR", 500, cause);
        }
    }

    /**
     * 데이터 없음 예외
     */
    public static class DataNotFoundException extends BaseException {
        public DataNotFoundException(String message) {
            super(message, "DATA_NOT_FOUND", 404);
        }

        public DataNotFoundException(String message, Throwable cause) {
            super(message, "DATA_NOT_FOUND", 404, cause);
        }
    }

    /**
     * 인증 예외
     */
    public static class AuthenticationException extends BaseException {
        public AuthenticationException(String message) {
            super(message, "AUTHENTICATION_ERROR", 401);
        }

        public AuthenticationException(String message, Throwable cause) {
            super(message, "AUTHENTICATION_ERROR", 401, cause);
        }
    }

    /**
     * 권한 예외
     */
    public static class AuthorizationException extends BaseException {
        public AuthorizationException(String message) {
            super(message, "AUTHORIZATION_ERROR", 403);
        }

        public AuthorizationException(String message, Throwable cause) {
            super(message, "AUTHORIZATION_ERROR", 403, cause);
        }
    }

    /**
     * 비즈니스 로직 예외
     */
    public static class BusinessException extends BaseException {
        public BusinessException(String message) {
            super(message, "BUSINESS_ERROR", 400);
        }

        public BusinessException(String message, Throwable cause) {
            super(message, "BUSINESS_ERROR", 400, cause);
        }
    }
}
