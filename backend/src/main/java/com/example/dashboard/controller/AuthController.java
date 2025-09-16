package com.example.dashboard.controller;

import com.example.dashboard.entity.User;
import com.example.dashboard.service.UserService;
import com.example.dashboard.dto.ErrorResponse;
import com.example.dashboard.security.JwtUtil;
import com.example.dashboard.util.XssUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * 회원가입
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody Map<String, String> request) {
        try {
            // XSS 검증 및 입력값 정리
            String companyName = XssUtils.sanitizeInput(request.get("companyName"));
            String username = XssUtils.sanitizeUsername(request.get("username"));
            String email = XssUtils.sanitizeEmail(request.get("email"));
            String password = request.get("password"); // 비밀번호는 별도 검증

            // 필수 필드 검증
            if (companyName == null || companyName.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("회사명을 입력해주세요.", "VALIDATION_ERROR", 400));
            }
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("사용자명을 입력해주세요.", "VALIDATION_ERROR", 400));
            }
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("이메일을 입력해주세요.", "VALIDATION_ERROR", 400));
            }
            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("비밀번호를 입력해주세요.", "VALIDATION_ERROR", 400));
            }

            User user = userService.signUp(companyName, username, email, password);

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "회원가입이 완료되었습니다.");
            response.put("user", user);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                e.getMessage(),
                "SIGNUP_ERROR",
                HttpStatus.BAD_REQUEST.value()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    /**
     * 로그인
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        try {
            // XSS 검증 및 입력값 정리
            String username = XssUtils.sanitizeUsername(request.get("username"));
            String password = request.get("password"); // 비밀번호는 별도 검증

            // 필수 필드 검증
            if (username == null || username.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("사용자명을 입력해주세요.", "VALIDATION_ERROR", 400));
            }
            if (password == null || password.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(new ErrorResponse("비밀번호를 입력해주세요.", "VALIDATION_ERROR", 400));
            }

            User user = userService.login(username, password);

            // JWT 토큰 생성
            String token = jwtUtil.generateToken(user.getUsername(), user.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "로그인에 성공했습니다.");
            response.put("user", user);
            response.put("token", token);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                e.getMessage(),
                "LOGIN_ERROR",
                HttpStatus.UNAUTHORIZED.value()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }

    /**
     * 사용자명 중복 확인
     */
    @GetMapping("/check-username/{username}")
    public ResponseEntity<?> checkUsername(@PathVariable String username) {
        try {
            // 간단한 중복 확인을 위해 UserService에 메서드 추가 필요
            // 현재는 기본 응답만 반환
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("available", true);
            response.put("message", "사용 가능한 사용자명입니다.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                e.getMessage(),
                "USERNAME_CHECK_ERROR",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    /**
     * 이메일 중복 확인
     */
    @GetMapping("/check-email/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable String email) {
        try {
            // 간단한 중복 확인을 위해 UserService에 메서드 추가 필요
            // 현재는 기본 응답만 반환
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("available", true);
            response.put("message", "사용 가능한 이메일입니다.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse(
                e.getMessage(),
                "EMAIL_CHECK_ERROR",
                HttpStatus.INTERNAL_SERVER_ERROR.value()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
