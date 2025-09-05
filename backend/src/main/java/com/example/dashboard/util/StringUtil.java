package com.example.dashboard.util;

import org.springframework.util.StringUtils;

import java.util.UUID;

/**
 * 문자열 처리를 위한 유틸리티 클래스
 */
public class StringUtil {
    
    /**
     * 문자열이 null이거나 비어있는지 확인
     */
    public static boolean isEmpty(String str) {
        return !StringUtils.hasText(str);
    }
    
    /**
     * 문자열이 null이 아니고 비어있지 않은지 확인
     */
    public static boolean isNotEmpty(String str) {
        return StringUtils.hasText(str);
    }
    
    /**
     * null인 경우 빈 문자열로 변환
     */
    public static String nullToEmpty(String str) {
        return str == null ? "" : str;
    }
    
    /**
     * 빈 문자열인 경우 null로 변환
     */
    public static String emptyToNull(String str) {
        return isEmpty(str) ? null : str;
    }
    
    /**
     * 문자열 좌우 공백 제거
     */
    public static String trim(String str) {
        return str == null ? null : str.trim();
    }
    
    /**
     * 문자열 좌우 공백 제거 후 빈 문자열인지 확인
     */
    public static boolean isBlank(String str) {
        return trim(str) == null || trim(str).isEmpty();
    }
    
    /**
     * 문자열 좌우 공백 제거 후 비어있지 않은지 확인
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }
    
    /**
     * 문자열을 지정된 길이로 자르기 (뒤에 ... 추가)
     */
    public static String truncate(String str, int maxLength) {
        if (str == null || str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + "...";
    }
    
    /**
     * 문자열을 지정된 길이로 자르기 (뒤에 지정된 문자열 추가)
     */
    public static String truncate(String str, int maxLength, String suffix) {
        if (str == null || str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength) + (suffix != null ? suffix : "");
    }
    
    /**
     * 첫 글자를 대문자로 변환
     */
    public static String capitalize(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    
    /**
     * 첫 글자를 소문자로 변환
     */
    public static String uncapitalize(String str) {
        if (isEmpty(str)) {
            return str;
        }
        return str.substring(0, 1).toLowerCase() + str.substring(1);
    }
    
    /**
     * 문자열을 카멜케이스로 변환 (snake_case -> camelCase)
     */
    public static String toCamelCase(String str) {
        if (isEmpty(str)) {
            return str;
        }
        
        String[] parts = str.split("_");
        StringBuilder result = new StringBuilder(parts[0].toLowerCase());
        
        for (int i = 1; i < parts.length; i++) {
            result.append(capitalize(parts[i].toLowerCase()));
        }
        
        return result.toString();
    }
    
    /**
     * 문자열을 스네이크케이스로 변환 (camelCase -> snake_case)
     */
    public static String toSnakeCase(String str) {
        if (isEmpty(str)) {
            return str;
        }
        
        return str.replaceAll("([a-z])([A-Z])", "$1_$2").toLowerCase();
    }
    
    /**
     * 랜덤 문자열 생성 (UUID 기반)
     */
    public static String generateRandomString() {
        return UUID.randomUUID().toString().replace("-", "");
    }
    
    /**
     * 지정된 길이의 랜덤 문자열 생성
     */
    public static String generateRandomString(int length) {
        String random = generateRandomString();
        if (length >= random.length()) {
            return random;
        }
        return random.substring(0, length);
    }
    
    /**
     * 문자열이 지정된 패턴과 일치하는지 확인
     */
    public static boolean matches(String str, String pattern) {
        if (str == null || pattern == null) {
            return false;
        }
        return str.matches(pattern);
    }
    
    /**
     * 문자열에서 숫자만 추출
     */
    public static String extractNumbers(String str) {
        if (isEmpty(str)) {
            return "";
        }
        return str.replaceAll("[^0-9]", "");
    }
    
    /**
     * 문자열에서 영문자만 추출
     */
    public static String extractLetters(String str) {
        if (isEmpty(str)) {
            return "";
        }
        return str.replaceAll("[^a-zA-Z]", "");
    }
    
    /**
     * 문자열에서 영문자와 숫자만 추출
     */
    public static String extractAlphanumeric(String str) {
        if (isEmpty(str)) {
            return "";
        }
        return str.replaceAll("[^a-zA-Z0-9]", "");
    }
    
    /**
     * 문자열을 지정된 구분자로 연결
     */
    public static String join(String delimiter, String... strings) {
        if (strings == null || strings.length == 0) {
            return "";
        }
        
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < strings.length; i++) {
            if (strings[i] != null) {
                result.append(strings[i]);
                if (i < strings.length - 1) {
                    result.append(delimiter);
                }
            }
        }
        
        return result.toString();
    }
    
    /**
     * 문자열을 지정된 구분자로 분할
     */
    public static String[] split(String str, String delimiter) {
        if (isEmpty(str)) {
            return new String[0];
        }
        return str.split(delimiter);
    }
}
