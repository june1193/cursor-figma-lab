package com.example.dashboard.util;

import com.example.dashboard.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * API 응답 생성을 위한 유틸리티 클래스
 */
public class ResponseUtil {
    
    /**
     * 성공 응답 생성
     */
    public static <T> ResponseEntity<Map<String, Object>> success(T data) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 성공 응답 생성 (메시지 포함)
     */
    public static <T> ResponseEntity<Map<String, Object>> success(T data, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 성공 응답 생성 (데이터 없음)
     */
    public static ResponseEntity<Map<String, Object>> success(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 에러 응답 생성
     */
    public static ResponseEntity<ErrorResponse> error(String message, String code, HttpStatus status) {
        ErrorResponse errorResponse = new ErrorResponse(message, code, status.value());
        return ResponseEntity.status(status).body(errorResponse);
    }
    
    /**
     * 에러 응답 생성 (기본 코드)
     */
    public static ResponseEntity<ErrorResponse> error(String message, HttpStatus status) {
        return error(message, "ERROR", status);
    }
    
    /**
     * 잘못된 요청 에러 응답
     */
    public static ResponseEntity<ErrorResponse> badRequest(String message) {
        return error(message, "BAD_REQUEST", HttpStatus.BAD_REQUEST);
    }
    
    /**
     * 인증 실패 에러 응답
     */
    public static ResponseEntity<ErrorResponse> unauthorized(String message) {
        return error(message, "UNAUTHORIZED", HttpStatus.UNAUTHORIZED);
    }
    
    /**
     * 권한 없음 에러 응답
     */
    public static ResponseEntity<ErrorResponse> forbidden(String message) {
        return error(message, "FORBIDDEN", HttpStatus.FORBIDDEN);
    }
    
    /**
     * 리소스 없음 에러 응답
     */
    public static ResponseEntity<ErrorResponse> notFound(String message) {
        return error(message, "NOT_FOUND", HttpStatus.NOT_FOUND);
    }
    
    /**
     * 서버 에러 응답
     */
    public static ResponseEntity<ErrorResponse> internalServerError(String message) {
        return error(message, "INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    /**
     * 페이지네이션 응답 생성
     */
    public static <T> ResponseEntity<Map<String, Object>> paginatedResponse(
            T data, int page, int size, long totalElements, int totalPages) {
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("pagination", createPaginationInfo(page, size, totalElements, totalPages));
        response.put("timestamp", LocalDateTime.now());
        
        return ResponseEntity.ok(response);
    }
    
    /**
     * 페이지네이션 정보 생성
     */
    private static Map<String, Object> createPaginationInfo(int page, int size, long totalElements, int totalPages) {
        Map<String, Object> pagination = new HashMap<>();
        pagination.put("page", page);
        pagination.put("size", size);
        pagination.put("totalElements", totalElements);
        pagination.put("totalPages", totalPages);
        pagination.put("hasNext", page < totalPages - 1);
        pagination.put("hasPrevious", page > 0);
        return pagination;
    }
    
    /**
     * 리스트 응답 생성
     */
    public static <T> ResponseEntity<Map<String, Object>> listResponse(T data, int count) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("count", count);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 생성 성공 응답
     */
    public static <T> ResponseEntity<Map<String, Object>> created(T data, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
    
    /**
     * 업데이트 성공 응답
     */
    public static <T> ResponseEntity<Map<String, Object>> updated(T data, String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", data);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
    
    /**
     * 삭제 성공 응답
     */
    public static ResponseEntity<Map<String, Object>> deleted(String message) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", message);
        response.put("timestamp", LocalDateTime.now());
        return ResponseEntity.ok(response);
    }
}
