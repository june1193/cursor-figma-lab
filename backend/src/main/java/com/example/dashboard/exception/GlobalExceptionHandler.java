package com.example.dashboard.exception;

import com.example.dashboard.dto.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // 커스텀 예외 처리
    @ExceptionHandler(CustomExceptions.DataNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleDataNotFound(CustomExceptions.DataNotFoundException e) {
        logger.warn("Data not found: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus()));
    }

    @ExceptionHandler(CustomExceptions.DatabaseException.class)
    public ResponseEntity<ErrorResponse> handleDatabaseError(CustomExceptions.DatabaseException e) {
        logger.error("Database error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus()));
    }

    @ExceptionHandler(CustomExceptions.ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationError(CustomExceptions.ValidationException e) {
        logger.warn("Validation error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus(), e.getDetails()));
    }

    @ExceptionHandler(CustomExceptions.AuthenticationException.class)
    public ResponseEntity<ErrorResponse> handleAuthenticationError(CustomExceptions.AuthenticationException e) {
        logger.warn("Authentication error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus()));
    }

    @ExceptionHandler(CustomExceptions.AuthorizationException.class)
    public ResponseEntity<ErrorResponse> handleAuthorizationError(CustomExceptions.AuthorizationException e) {
        logger.warn("Authorization error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus()));
    }

    @ExceptionHandler(CustomExceptions.BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessError(CustomExceptions.BusinessException e) {
        logger.warn("Business error: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(e.getMessage(), e.getCode(), e.getStatus()));
    }

    // Spring 예외 처리
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException e) {
        logger.warn("Validation error: {}", e.getMessage());
        
        Map<String, String[]> details = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(error -> {
            String field = error.getField();
            String message = error.getDefaultMessage();
            details.put(field, new String[]{message});
        });

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse("입력값 검증에 실패했습니다.", "VALIDATION_ERROR", 400, details));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException e) {
        logger.warn("Type mismatch error: {}", e.getMessage());
        String message = String.format("'%s' 값이 올바르지 않습니다.", e.getValue());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponse(message, "TYPE_MISMATCH", 400));
    }

    // 데이터베이스 예외 처리
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleDataAccessException(DataAccessException e) {
        logger.error("Data access error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("데이터베이스 접근 중 오류가 발생했습니다.", "DATABASE_ERROR", 500));
    }

    // 일반적인 예외 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
        logger.error("Unexpected error: {}", e.getMessage(), e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("서버 내부 오류가 발생했습니다.", "INTERNAL_SERVER_ERROR", 500));
    }
}

