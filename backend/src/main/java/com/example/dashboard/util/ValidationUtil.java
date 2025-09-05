package com.example.dashboard.util;

import com.example.dashboard.exception.ValidationException;
import org.springframework.util.StringUtils;

import java.util.regex.Pattern;

/**
 * 입력값 검증을 위한 유틸리티 클래스
 */
public class ValidationUtil {
    
    // 이메일 정규식 패턴
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    
    // 사용자명 정규식 패턴 (영문, 숫자, 언더스코어만 허용)
    private static final Pattern USERNAME_PATTERN = Pattern.compile("^[a-zA-Z0-9_]{3,20}$");
    
    // 비밀번호 정규식 패턴 (8자 이상, 영문, 숫자 포함)
    private static final Pattern PASSWORD_PATTERN = Pattern.compile(
        "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$"
    );
    
    /**
     * 문자열이 null이거나 비어있는지 검증
     */
    public static void validateNotEmpty(String value, String fieldName) {
        if (!StringUtils.hasText(value)) {
            throw new ValidationException(fieldName + "은(는) 필수입니다.");
        }
    }
    
    /**
     * 문자열 길이 검증
     */
    public static void validateLength(String value, String fieldName, int minLength, int maxLength) {
        if (value == null) {
            throw new ValidationException(fieldName + "은(는) 필수입니다.");
        }
        
        if (value.length() < minLength) {
            throw new ValidationException(fieldName + "은(는) " + minLength + "자 이상이어야 합니다.");
        }
        
        if (value.length() > maxLength) {
            throw new ValidationException(fieldName + "은(는) " + maxLength + "자 이하여야 합니다.");
        }
    }
    
    /**
     * 이메일 형식 검증
     */
    public static void validateEmail(String email) {
        validateNotEmpty(email, "이메일");
        
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new ValidationException("올바른 이메일 형식이 아닙니다.");
        }
    }
    
    /**
     * 사용자명 형식 검증
     */
    public static void validateUsername(String username) {
        validateNotEmpty(username, "사용자명");
        
        if (!USERNAME_PATTERN.matcher(username).matches()) {
            throw new ValidationException("사용자명은 3-20자의 영문, 숫자, 언더스코어만 사용 가능합니다.");
        }
    }
    
    /**
     * 비밀번호 강도 검증
     */
    public static void validatePassword(String password) {
        validateNotEmpty(password, "비밀번호");
        
        if (password.length() < 8) {
            throw new ValidationException("비밀번호는 8자 이상이어야 합니다.");
        }
        
        if (!PASSWORD_PATTERN.matcher(password).matches()) {
            throw new ValidationException("비밀번호는 영문과 숫자를 포함해야 합니다.");
        }
    }
    
    /**
     * 회사명 검증
     */
    public static void validateCompanyName(String companyName) {
        validateNotEmpty(companyName, "회사명");
        validateLength(companyName, "회사명", 2, 50);
    }
    
    /**
     * 숫자 범위 검증
     */
    public static void validateRange(int value, String fieldName, int min, int max) {
        if (value < min || value > max) {
            throw new ValidationException(fieldName + "은(는) " + min + "~" + max + " 사이의 값이어야 합니다.");
        }
    }
    
    /**
     * 양수 검증
     */
    public static void validatePositive(int value, String fieldName) {
        if (value <= 0) {
            throw new ValidationException(fieldName + "은(는) 양수여야 합니다.");
        }
    }
    
    /**
     * 양수 검증 (Long)
     */
    public static void validatePositive(long value, String fieldName) {
        if (value <= 0) {
            throw new ValidationException(fieldName + "은(는) 양수여야 합니다.");
        }
    }
}
