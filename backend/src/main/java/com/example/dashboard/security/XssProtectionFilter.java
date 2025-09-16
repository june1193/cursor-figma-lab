package com.example.dashboard.security;

import com.example.dashboard.util.XssUtils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletRequestWrapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

/**
 * XSS 보호를 위한 커스텀 필터
 * Spring Security 6.x에서는 xssProtection() 메서드가 제거되어 커스텀 필터로 구현
 */
@Component
public class XssProtectionFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        // XSS 보호 헤더 추가
        httpResponse.setHeader("X-XSS-Protection", "1; mode=block");
        httpResponse.setHeader("X-Content-Type-Options", "nosniff");
        httpResponse.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
        
        // HSTS 헤더 추가 (HTTPS 환경에서만)
        if (httpRequest.isSecure()) {
            httpResponse.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
        }
        
        // X-Frame-Options는 Spring Security에서 이미 설정됨
        
        // XSS 공격 패턴 검사 및 필터링
        if (containsXssAttack(httpRequest)) {
            httpResponse.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            httpResponse.getWriter().write("{\"error\":\"악성 스크립트가 감지되었습니다.\",\"code\":\"XSS_ATTACK_DETECTED\"}");
            return;
        }
        
        // 요청 파라미터 XSS 필터링
        XssRequestWrapper wrappedRequest = new XssRequestWrapper(httpRequest);
        
        chain.doFilter(wrappedRequest, response);
    }
    
    /**
     * 요청에 XSS 공격 패턴이 포함되어 있는지 검사
     */
    private boolean containsXssAttack(HttpServletRequest request) {
        // URL 파라미터 검사
        Enumeration<String> paramNames = request.getParameterNames();
        while (paramNames.hasMoreElements()) {
            String paramName = paramNames.nextElement();
            String[] paramValues = request.getParameterValues(paramName);
            
            for (String paramValue : paramValues) {
                if (XssUtils.containsXssPattern(paramValue)) {
                    System.out.println("XSS 공격 감지 - 파라미터: " + paramName + ", 값: " + paramValue);
                    return true;
                }
            }
        }
        
        // 헤더 검사 (User-Agent, Referer 등)
        Enumeration<String> headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String headerName = headerNames.nextElement();
            String headerValue = request.getHeader(headerName);
            
            if (XssUtils.containsXssPattern(headerValue)) {
                System.out.println("XSS 공격 감지 - 헤더: " + headerName + ", 값: " + headerValue);
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * XSS 필터링을 위한 Request Wrapper
     */
    private static class XssRequestWrapper extends HttpServletRequestWrapper {
        
        public XssRequestWrapper(HttpServletRequest request) {
            super(request);
        }
        
        @Override
        public String getParameter(String name) {
            String value = super.getParameter(name);
            return value != null ? XssUtils.sanitizeInput(value) : null;
        }
        
        @Override
        public String[] getParameterValues(String name) {
            String[] values = super.getParameterValues(name);
            if (values != null) {
                String[] sanitizedValues = new String[values.length];
                for (int i = 0; i < values.length; i++) {
                    sanitizedValues[i] = XssUtils.sanitizeInput(values[i]);
                }
                return sanitizedValues;
            }
            return values;
        }
        
        @Override
        public Map<String, String[]> getParameterMap() {
            Map<String, String[]> originalMap = super.getParameterMap();
            Map<String, String[]> sanitizedMap = new HashMap<>();
            
            for (Map.Entry<String, String[]> entry : originalMap.entrySet()) {
                String[] sanitizedValues = new String[entry.getValue().length];
                for (int i = 0; i < entry.getValue().length; i++) {
                    sanitizedValues[i] = XssUtils.sanitizeInput(entry.getValue()[i]);
                }
                sanitizedMap.put(entry.getKey(), sanitizedValues);
            }
            
            return sanitizedMap;
        }
    }
}
