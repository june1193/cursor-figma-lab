package com.example.dashboard.service;

import com.example.dashboard.entity.User;
import com.example.dashboard.exception.DatabaseException;
import com.example.dashboard.exception.ValidationException;
import com.example.dashboard.mapper.UserMapper;
import com.example.dashboard.util.ValidationUtil;
import com.example.dashboard.util.PasswordUtil;
import com.example.dashboard.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    /**
     * 회원가입
     */
    public User signUp(String companyName, String username, String email, String password) {
        try {
            // 입력값 유효성 검사
            validateSignUpInput(companyName, username, email, password);

            // 중복 확인
            if (userMapper.countByUsername(username) > 0) {
                throw new ValidationException("이미 사용 중인 사용자명입니다.");
            }

            if (userMapper.countByEmail(email) > 0) {
                throw new ValidationException("이미 사용 중인 이메일입니다.");
            }

            // 비밀번호 암호화
            String encodedPassword = PasswordUtil.encode(password);

            // 사용자 객체 생성
            User user = new User();
            user.setCompanyName(companyName);
            user.setUsername(username);
            user.setEmail(email);
            user.setPassword(encodedPassword);
            user.setCreatedAt(DateUtil.now());
            user.setUpdatedAt(DateUtil.now());
            user.setIsActive(true);

            // 데이터베이스에 저장
            int result = userMapper.insertUser(user);
            if (result <= 0) {
                throw new DatabaseException("회원가입에 실패했습니다.");
            }

            // 비밀번호 제거 후 반환
            user.setPassword(null);
            return user;

        } catch (Exception e) {
            throw new DatabaseException("회원가입 중 오류가 발생했습니다: " + e.getMessage());
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
                throw new ValidationException("사용자명 또는 비밀번호가 올바르지 않습니다.");
            }

            // 비밀번호 확인
            if (!PasswordUtil.matches(password, user.getPassword())) {
                throw new ValidationException("사용자명 또는 비밀번호가 올바르지 않습니다.");
            }

            // 비밀번호 제거 후 반환
            user.setPassword(null);
            return user;

        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("로그인 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 사용자 정보 조회
     */
    public User getUserById(Long id) {
        try {
            User user = userMapper.findById(id);
            if (user == null) {
                throw new ValidationException("사용자를 찾을 수 없습니다.");
            }
            user.setPassword(null); // 비밀번호 제거
            return user;
        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("사용자 정보 조회 중 오류가 발생했습니다: " + e.getMessage());
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
            throw new DatabaseException("사용자 목록 조회 중 오류가 발생했습니다: " + e.getMessage());
        }
    }

    /**
     * 회원가입 입력값 유효성 검사
     */
    private void validateSignUpInput(String companyName, String username, String email, String password) {
        ValidationUtil.validateCompanyName(companyName);
        ValidationUtil.validateUsername(username);
        ValidationUtil.validateEmail(email);
        ValidationUtil.validatePassword(password);
    }

    /**
     * 비밀번호 변경
     */
    public void changePassword(Long userId, String oldPassword, String newPassword) {
        try {
            User user = userMapper.findById(userId);
            if (user == null) {
                throw new ValidationException("사용자를 찾을 수 없습니다.");
            }

            // 기존 비밀번호 확인
            if (!PasswordUtil.matches(oldPassword, user.getPassword())) {
                throw new ValidationException("기존 비밀번호가 올바르지 않습니다.");
            }

            // 새 비밀번호 유효성 검사
            ValidationUtil.validatePassword(newPassword);

            // 새 비밀번호 암호화 및 저장
            String encodedNewPassword = PasswordUtil.encode(newPassword);
            int result = userMapper.updatePassword(userId, encodedNewPassword);
            
            if (result <= 0) {
                throw new DatabaseException("비밀번호 변경에 실패했습니다.");
            }

        } catch (ValidationException e) {
            throw e;
        } catch (Exception e) {
            throw new DatabaseException("비밀번호 변경 중 오류가 발생했습니다: " + e.getMessage());
        }
    }
}
