package com.example.dashboard.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.regex.Pattern;

/**
 * 비밀번호 처리를 위한 유틸리티 클래스
 */
public class PasswordUtil {
    
    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    // 비밀번호 강도 검증 패턴들
    private static final Pattern LOWER_CASE_PATTERN = Pattern.compile(".*[a-z].*");
    private static final Pattern UPPER_CASE_PATTERN = Pattern.compile(".*[A-Z].*");
    private static final Pattern DIGIT_PATTERN = Pattern.compile(".*\\d.*");
    private static final Pattern SPECIAL_CHAR_PATTERN = Pattern.compile(".*[@$!%*#?&].*");
    
    /**
     * 비밀번호를 해시화
     */
    public static String encode(String rawPassword) {
        if (rawPassword == null) {
            throw new IllegalArgumentException("비밀번호는 null일 수 없습니다.");
        }
        return passwordEncoder.encode(rawPassword);
    }
    
    /**
     * 비밀번호가 일치하는지 확인
     */
    public static boolean matches(String rawPassword, String encodedPassword) {
        if (rawPassword == null || encodedPassword == null) {
            return false;
        }
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
    
    /**
     * 비밀번호 강도 검증
     */
    public static PasswordStrength checkPasswordStrength(String password) {
        if (password == null || password.isEmpty()) {
            return PasswordStrength.WEAK;
        }
        
        int score = 0;
        
        // 길이 검증
        if (password.length() >= 8) score++;
        if (password.length() >= 12) score++;
        
        // 문자 종류 검증
        if (LOWER_CASE_PATTERN.matcher(password).matches()) score++;
        if (UPPER_CASE_PATTERN.matcher(password).matches()) score++;
        if (DIGIT_PATTERN.matcher(password).matches()) score++;
        if (SPECIAL_CHAR_PATTERN.matcher(password).matches()) score++;
        
        // 점수에 따른 강도 반환
        if (score <= 2) return PasswordStrength.WEAK;
        if (score <= 4) return PasswordStrength.MEDIUM;
        if (score <= 6) return PasswordStrength.STRONG;
        return PasswordStrength.VERY_STRONG;
    }
    
    /**
     * 비밀번호 강도에 따른 메시지 반환
     */
    public static String getPasswordStrengthMessage(String password) {
        PasswordStrength strength = checkPasswordStrength(password);
        
        switch (strength) {
            case WEAK:
                return "비밀번호가 너무 약합니다. 8자 이상, 영문, 숫자를 포함해주세요.";
            case MEDIUM:
                return "비밀번호 강도가 보통입니다. 더 강력한 비밀번호를 권장합니다.";
            case STRONG:
                return "비밀번호 강도가 강합니다.";
            case VERY_STRONG:
                return "비밀번호 강도가 매우 강합니다.";
            default:
                return "비밀번호를 입력해주세요.";
        }
    }
    
    /**
     * 비밀번호 기본 검증 (최소 요구사항)
     */
    public static boolean isValidPassword(String password) {
        if (password == null || password.length() < 8) {
            return false;
        }
        
        // 영문과 숫자 포함 여부 확인
        return LOWER_CASE_PATTERN.matcher(password).matches() && 
               DIGIT_PATTERN.matcher(password).matches();
    }
    
    /**
     * 비밀번호 보안 검증 (추가 보안 요구사항)
     */
    public static boolean isSecurePassword(String password) {
        if (password == null || password.length() < 12) {
            return false;
        }
        
        // 영문 대소문자, 숫자, 특수문자 모두 포함 여부 확인
        return LOWER_CASE_PATTERN.matcher(password).matches() &&
               UPPER_CASE_PATTERN.matcher(password).matches() &&
               DIGIT_PATTERN.matcher(password).matches() &&
               SPECIAL_CHAR_PATTERN.matcher(password).matches();
    }
    
    /**
     * 비밀번호 강도 열거형
     */
    public enum PasswordStrength {
        WEAK("약함"),
        MEDIUM("보통"),
        STRONG("강함"),
        VERY_STRONG("매우 강함");
        
        private final String description;
        
        PasswordStrength(String description) {
            this.description = description;
        }
        
        public String getDescription() {
            return description;
        }
    }
    
    /**
     * 비밀번호 생성 (랜덤)
     */
    public static String generateRandomPassword(int length) {
        if (length < 8) {
            length = 8;
        }
        
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*#?&";
        StringBuilder password = new StringBuilder();
        
        // 최소 1개의 소문자, 대문자, 숫자, 특수문자 포함
        password.append("abcdefghijklmnopqrstuvwxyz".charAt((int) (Math.random() * 26)));
        password.append("ABCDEFGHIJKLMNOPQRSTUVWXYZ".charAt((int) (Math.random() * 26)));
        password.append("0123456789".charAt((int) (Math.random() * 10)));
        password.append("@$!%*#?&".charAt((int) (Math.random() * 8)));
        
        // 나머지 길이만큼 랜덤 문자 추가
        for (int i = 4; i < length; i++) {
            password.append(chars.charAt((int) (Math.random() * chars.length())));
        }
        
        // 문자 순서 섞기
        char[] passwordArray = password.toString().toCharArray();
        for (int i = 0; i < passwordArray.length; i++) {
            int randomIndex = (int) (Math.random() * passwordArray.length);
            char temp = passwordArray[i];
            passwordArray[i] = passwordArray[randomIndex];
            passwordArray[randomIndex] = temp;
        }
        
        return new String(passwordArray);
    }
}
