package com.example.dashboard.security;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;

import java.io.IOException;

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
        
        chain.doFilter(request, response);
    }
}
