package com.example.dashboard.service;

import com.example.dashboard.entity.User;
import com.example.dashboard.exception.CustomExceptions;
import com.example.dashboard.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.regex.Pattern;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserMapper userMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // 이메일 유효성 검사 패턴
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );

    /**
     * 회원가입
     */
    @Transactional
    public User signUp(String companyName, String username, String email, String password) {
        try {
            // 입력값 유효성 검사
            validateSignUpInput(companyName, username, email, password);

            // 중복 확인
            if (userMapper.countByUsername(username) > 0) {
                throw new CustomExceptions.ValidationException("이미 사용 중인 사용자명입니다.");
            }

            if (userMapper.countByEmail(email) > 0) {
                throw new CustomExceptions.ValidationException("이미 사용 중인 이메일입니다.");
            }

            // 비밀번호 암호화
            String encodedPassword = passwordEncoder.encode(password);

            // 사용자 객체 생성
            User user = new User();
            user.setCompanyName(companyName);
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(encodedPassword);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            user.setIsActive(true);

            // 데이터베이스에 저장
            int result = userMapper.insertUser(user);
            if (result <= 0) {
                throw new CustomExceptions.DatabaseException("회원가입에 실패했습니다.");
            }

            // 비밀번호 제거 후 반환
            user.setPassword(null);
            return user;

        } catch (CustomExceptions.ValidationException e) {
            throw e; // ValidationException은 그대로 던지기
        } catch (Exception e) {
            throw new CustomExceptions.DatabaseException("회원가입 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 로그인
     */
    public User login(String username, String password) {
        try {
            // 사용자 조회
            User user = userMapper.findByUsername(username);
            if (user == null) {
                throw new CustomExceptions.ValidationException("사용자명 또는 비밀번호가 올바르지 않습니다.");
            }

            // 비밀번호 확인
            if (!passwordEncoder.matches(password, user.getPassword())) {
                throw new CustomExceptions.ValidationException("사용자명 또는 비밀번호가 올바르지 않습니다.");
            }

            // 비밀번호 제거 후 반환
            user.setPassword(null);
            return user;

        } catch (CustomExceptions.ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomExceptions.DatabaseException("로그인 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 사용자 정보 조회
     */
    public User getUserById(Long id) {
        try {
            User user = userMapper.findById(id);
            if (user == null) {
                throw new CustomExceptions.DataNotFoundException("사용자를 찾을 수 없습니다.");
            }
            user.setPassword(null); // 비밀번호 제거
            return user;
        } catch (CustomExceptions.DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomExceptions.DatabaseException("사용자 정보 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 모든 활성 사용자 조회
     */
    public List<User> getAllActiveUsers() {
        try {
            List<User> users = userMapper.findAllActiveUsers();
            // 모든 사용자의 비밀번호 제거
            users.forEach(user -> user.setPassword(null));
            return users;
        } catch (Exception e) {
            throw new CustomExceptions.DatabaseException("사용자 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 회원가입 입력값 유효성 검사
     */
    private void validateSignUpInput(String companyName, String username, String email, String password) {
        if (companyName == null || companyName.trim().isEmpty()) {
            throw new CustomExceptions.ValidationException("회사명을 입력해주세요.");
        }

        if (username == null || username.trim().isEmpty()) {
            throw new CustomExceptions.ValidationException("사용자명을 입력해주세요.");
        }

        if (username.length() < 3 || username.length() > 20) {
            throw new CustomExceptions.ValidationException("사용자명은 3자 이상 20자 이하여야 합니다.");
        }

        if (email == null || email.trim().isEmpty()) {
            throw new CustomExceptions.ValidationException("이메일을 입력해주세요.");
        }

        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new CustomExceptions.ValidationException("올바른 이메일 형식이 아닙니다.");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new CustomExceptions.ValidationException("비밀번호를 입력해주세요.");
        }

        if (password.length() < 6) {
            throw new CustomExceptions.ValidationException("비밀번호는 6자 이상이어야 합니다.");
        }
    }

    /**
     * 비밀번호 변경
     */
    @Transactional
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        try {
            User user = userMapper.findById(userId);
            if (user == null) {
                throw new CustomExceptions.DataNotFoundException("사용자를 찾을 수 없습니다.");
            }

            // 기존 비밀번호 확인
            if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
                throw new CustomExceptions.ValidationException("기존 비밀번호가 올바르지 않습니다.");
            }

            // 새 비밀번호 유효성 검사
            if (newPassword == null || newPassword.trim().isEmpty()) {
                throw new CustomExceptions.ValidationException("새 비밀번호를 입력해주세요.");
            }

            if (newPassword.length() < 6) {
                throw new CustomExceptions.ValidationException("새 비밀번호는 6자 이상이어야 합니다.");
            }

            // 새 비밀번호 암호화 및 저장
            String encodedNewPassword = passwordEncoder.encode(newPassword);
            int result = userMapper.updatePassword(userId, encodedNewPassword);
            
            if (result <= 0) {
                throw new CustomExceptions.DatabaseException("비밀번호 변경에 실패했습니다.");
            }

        } catch (CustomExceptions.ValidationException e) {
            throw e;
        } catch (CustomExceptions.DataNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new CustomExceptions.DatabaseException("비밀번호 변경 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}