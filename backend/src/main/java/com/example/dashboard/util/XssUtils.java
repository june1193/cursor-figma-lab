package com.example.dashboard.util;

import java.util.regex.Pattern;

/**
 * XSS 공격 방지를 위한 유틸리티 클래스
 */
public class XssUtils {
    
    // 악성 스크립트 패턴들
    private static final Pattern[] XSS_PATTERNS = {
        // <script> 태그
        Pattern.compile("<script[^>]*>.*?</script>", Pattern.CASE_INSENSITIVE),
        // javascript: 프로토콜
        Pattern.compile("javascript:", Pattern.CASE_INSENSITIVE),
        // onload, onclick 등 이벤트 핸들러
        Pattern.compile("on\\w+\\s*=", Pattern.CASE_INSENSITIVE),
        // <iframe> 태그
        Pattern.compile("<iframe[^>]*>.*?</iframe>", Pattern.CASE_INSENSITIVE),
        // <object> 태그
        Pattern.compile("<object[^>]*>.*?</object>", Pattern.CASE_INSENSITIVE),
        // <embed> 태그
        Pattern.compile("<embed[^>]*>", Pattern.CASE_INSENSITIVE),
        // <form> 태그
        Pattern.compile("<form[^>]*>.*?</form>", Pattern.CASE_INSENSITIVE),
        // <input> 태그
        Pattern.compile("<input[^>]*>", Pattern.CASE_INSENSITIVE),
        // <link> 태그
        Pattern.compile("<link[^>]*>", Pattern.CASE_INSENSITIVE),
        // <meta> 태그
        Pattern.compile("<meta[^>]*>", Pattern.CASE_INSENSITIVE),
        // <style> 태그
        Pattern.compile("<style[^>]*>.*?</style>", Pattern.CASE_INSENSITIVE),
        // expression() 함수
        Pattern.compile("expression\\s*\\(", Pattern.CASE_INSENSITIVE),
        // eval() 함수
        Pattern.compile("eval\\s*\\(", Pattern.CASE_INSENSITIVE),
        // alert() 함수
        Pattern.compile("alert\\s*\\(", Pattern.CASE_INSENSITIVE),
        // confirm() 함수
        Pattern.compile("confirm\\s*\\(", Pattern.CASE_INSENSITIVE),
        // prompt() 함수
        Pattern.compile("prompt\\s*\\(", Pattern.CASE_INSENSITIVE),
        // document.cookie 접근
        Pattern.compile("document\\.cookie", Pattern.CASE_INSENSITIVE),
        // document.write 접근
        Pattern.compile("document\\.write", Pattern.CASE_INSENSITIVE),
        // window.location 접근
        Pattern.compile("window\\.location", Pattern.CASE_INSENSITIVE),
        // innerHTML 접근
        Pattern.compile("innerHTML", Pattern.CASE_INSENSITIVE),
        // outerHTML 접근
        Pattern.compile("outerHTML", Pattern.CASE_INSENSITIVE),
        // <img> 태그의 onerror 이벤트
        Pattern.compile("<img[^>]*onerror[^>]*>", Pattern.CASE_INSENSITIVE),
        // <svg> 태그
        Pattern.compile("<svg[^>]*>.*?</svg>", Pattern.CASE_INSENSITIVE),
        // <iframe> src의 javascript:
        Pattern.compile("src\\s*=\\s*[\"']?javascript:", Pattern.CASE_INSENSITIVE),
        // href의 javascript:
        Pattern.compile("href\\s*=\\s*[\"']?javascript:", Pattern.CASE_INSENSITIVE)
    };
    
    // HTML 이스케이프 문자 매핑
    private static final String[][] HTML_ESCAPE_CHARS = {
        {"&", "&amp;"},
        {"<", "&lt;"},
        {">", "&gt;"},
        {"\"", "&quot;"},
        {"'", "&#x27;"},
        {"/", "&#x2F;"}
    };
    
    /**
     * XSS 공격 패턴이 포함되어 있는지 검사
     * @param input 검사할 문자열
     * @return XSS 패턴이 발견되면 true, 아니면 false
     */
    public static boolean containsXssPattern(String input) {
        if (input == null || input.isEmpty()) {
            return false;
        }
        
        for (Pattern pattern : XSS_PATTERNS) {
            if (pattern.matcher(input).find()) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * HTML 특수문자를 이스케이프 처리
     * @param input 이스케이프할 문자열
     * @return 이스케이프된 문자열
     */
    public static String escapeHtml(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        String result = input;
        for (String[] escape : HTML_ESCAPE_CHARS) {
            result = result.replace(escape[0], escape[1]);
        }
        return result;
    }
    
    /**
     * XSS 공격을 방어하기 위해 입력값을 정리
     * @param input 정리할 문자열
     * @return 정리된 안전한 문자열
     */
    public static String sanitizeInput(String input) {
        if (input == null || input.isEmpty()) {
            return input;
        }
        
        // XSS 패턴이 포함되어 있으면 제거
        if (containsXssPattern(input)) {
            // 악성 패턴을 제거하고 HTML 이스케이프 처리
            String cleaned = input;
            for (Pattern pattern : XSS_PATTERNS) {
                cleaned = pattern.matcher(cleaned).replaceAll("");
            }
            return escapeHtml(cleaned.trim());
        }
        
        // 안전한 경우 HTML 이스케이프만 처리
        return escapeHtml(input);
    }
    
    /**
     * 사용자명에 대한 특별한 검증 (더 엄격)
     * @param username 검증할 사용자명
     * @return 안전한 사용자명
     */
    public static String sanitizeUsername(String username) {
        if (username == null || username.isEmpty()) {
            return username;
        }
        
        // 사용자명은 영문, 숫자, 언더스코어, 하이픈만 허용
        String cleaned = username.replaceAll("[^a-zA-Z0-9_-]", "");
        
        // 길이 제한 (3-20자)
        if (cleaned.length() > 20) {
            cleaned = cleaned.substring(0, 20);
        }
        
        return cleaned;
    }
    
    /**
     * 이메일 주소에 대한 특별한 검증
     * @param email 검증할 이메일
     * @return 안전한 이메일
     */
    public static String sanitizeEmail(String email) {
        if (email == null || email.isEmpty()) {
            return email;
        }
        
        // 이메일 형식 검증 및 XSS 패턴 제거
        String cleaned = sanitizeInput(email);
        
        // 기본적인 이메일 형식 검증
        if (!cleaned.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            return "";
        }
        
        return cleaned;
    }
}
