package com.example.dashboard.service;

import com.example.dashboard.entity.User;
import com.example.dashboard.exception.CustomExceptions;
import com.example.dashboard.mapper.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService 테스트")
class UserServiceTest {

    @Mock
    private UserMapper userMapper;

    @InjectMocks
    private UserService userService;

    private User testUser;
    private BCryptPasswordEncoder passwordEncoder;

    @BeforeEach
    void setUp() {
        passwordEncoder = new BCryptPasswordEncoder();
        
        testUser = new User();
        testUser.setId(1L);
        testUser.setCompanyName("테스트회사");
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword(passwordEncoder.encode("password123"));
        testUser.setCreatedAt(LocalDateTime.now());
        testUser.setUpdatedAt(LocalDateTime.now());
        testUser.setIsActive(true);
    }

    @Test
    @DisplayName("회원가입 성공 테스트")
    void signUp_Success() {
        // Given
        String companyName = "테스트회사";
        String username = "testuser";
        String email = "test@example.com";
        String password = "password123";

        when(userMapper.countByUsername(username)).thenReturn(0);
        when(userMapper.countByEmail(email)).thenReturn(0);
        when(userMapper.insertUser(any(User.class))).thenReturn(1);

        // When
        User result = userService.signUp(companyName, username, email, password);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getCompanyName()).isEqualTo(companyName);
        assertThat(result.getUsername()).isEqualTo(username);
        assertThat(result.getEmail()).isEqualTo(email);
        assertThat(result.getPassword()).isNull(); // 비밀번호는 제거되어야 함
        assertThat(result.getIsActive()).isTrue();

        verify(userMapper).countByUsername(username);
        verify(userMapper).countByEmail(email);
        verify(userMapper).insertUser(any(User.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 중복된 사용자명")
    void signUp_Fail_DuplicateUsername() {
        // Given
        String companyName = "테스트회사";
        String username = "testuser";
        String email = "test@example.com";
        String password = "password123";

        when(userMapper.countByUsername(username)).thenReturn(1);

        // When & Then
        assertThatThrownBy(() -> userService.signUp(companyName, username, email, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("이미 사용 중인 사용자명입니다.");

        verify(userMapper).countByUsername(username);
        verify(userMapper, never()).countByEmail(anyString());
        verify(userMapper, never()).insertUser(any(User.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 중복된 이메일")
    void signUp_Fail_DuplicateEmail() {
        // Given
        String companyName = "테스트회사";
        String username = "testuser";
        String email = "test@example.com";
        String password = "password123";

        when(userMapper.countByUsername(username)).thenReturn(0);
        when(userMapper.countByEmail(email)).thenReturn(1);

        // When & Then
        assertThatThrownBy(() -> userService.signUp(companyName, username, email, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("이미 사용 중인 이메일입니다.");

        verify(userMapper).countByUsername(username);
        verify(userMapper).countByEmail(email);
        verify(userMapper, never()).insertUser(any(User.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 잘못된 이메일 형식")
    void signUp_Fail_InvalidEmail() {
        // Given
        String companyName = "테스트회사";
        String username = "testuser";
        String email = "invalid-email";
        String password = "password123";

        // When & Then
        assertThatThrownBy(() -> userService.signUp(companyName, username, email, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("올바른 이메일 형식이 아닙니다.");

        verify(userMapper, never()).countByUsername(anyString());
        verify(userMapper, never()).countByEmail(anyString());
        verify(userMapper, never()).insertUser(any(User.class));
    }

    @Test
    @DisplayName("회원가입 실패 - 짧은 비밀번호")
    void signUp_Fail_ShortPassword() {
        // Given
        String companyName = "테스트회사";
        String username = "testuser";
        String email = "test@example.com";
        String password = "123"; // 6자 미만

        // When & Then
        assertThatThrownBy(() -> userService.signUp(companyName, username, email, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("비밀번호는 6자 이상이어야 합니다.");

        verify(userMapper, never()).countByUsername(anyString());
        verify(userMapper, never()).countByEmail(anyString());
        verify(userMapper, never()).insertUser(any(User.class));
    }

    @Test
    @DisplayName("로그인 성공 테스트")
    void login_Success() {
        // Given
        String username = "testuser";
        String password = "password123";

        when(userMapper.findByUsername(username)).thenReturn(testUser);

        // When
        User result = userService.login(username, password);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getUsername()).isEqualTo(username);
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        assertThat(result.getPassword()).isNull(); // 비밀번호는 제거되어야 함

        verify(userMapper).findByUsername(username);
    }

    @Test
    @DisplayName("로그인 실패 - 존재하지 않는 사용자")
    void login_Fail_UserNotFound() {
        // Given
        String username = "nonexistent";
        String password = "password123";

        when(userMapper.findByUsername(username)).thenReturn(null);

        // When & Then
        assertThatThrownBy(() -> userService.login(username, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("사용자명 또는 비밀번호가 올바르지 않습니다.");

        verify(userMapper).findByUsername(username);
    }

    @Test
    @DisplayName("로그인 실패 - 잘못된 비밀번호")
    void login_Fail_WrongPassword() {
        // Given
        String username = "testuser";
        String password = "wrongpassword";

        when(userMapper.findByUsername(username)).thenReturn(testUser);

        // When & Then
        assertThatThrownBy(() -> userService.login(username, password))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("사용자명 또는 비밀번호가 올바르지 않습니다.");

        verify(userMapper).findByUsername(username);
    }

    @Test
    @DisplayName("사용자 정보 조회 성공")
    void getUserById_Success() {
        // Given
        Long userId = 1L;
        when(userMapper.findById(userId)).thenReturn(testUser);

        // When
        User result = userService.getUserById(userId);

        // Then
        assertThat(result).isNotNull();
        assertThat(result.getId()).isEqualTo(userId);
        assertThat(result.getUsername()).isEqualTo("testuser");
        assertThat(result.getPassword()).isNull(); // 비밀번호는 제거되어야 함

        verify(userMapper).findById(userId);
    }

    @Test
    @DisplayName("사용자 정보 조회 실패 - 존재하지 않는 사용자")
    void getUserById_Fail_UserNotFound() {
        // Given
        Long userId = 999L;
        when(userMapper.findById(userId)).thenReturn(null);

        // When & Then
        assertThatThrownBy(() -> userService.getUserById(userId))
                .isInstanceOf(CustomExceptions.DataNotFoundException.class)
                .hasMessage("사용자를 찾을 수 없습니다.");

        verify(userMapper).findById(userId);
    }

    @Test
    @DisplayName("모든 활성 사용자 조회 성공")
    void getAllActiveUsers_Success() {
        // Given
        User user1 = new User();
        user1.setId(1L);
        user1.setUsername("user1");
        user1.setPassword("password1");

        User user2 = new User();
        user2.setId(2L);
        user2.setUsername("user2");
        user2.setPassword("password2");

        List<User> users = Arrays.asList(user1, user2);
        when(userMapper.findAllActiveUsers()).thenReturn(users);

        // When
        List<User> result = userService.getAllActiveUsers();

        // Then
        assertThat(result).hasSize(2);
        assertThat(result.get(0).getPassword()).isNull(); // 비밀번호 제거 확인
        assertThat(result.get(1).getPassword()).isNull(); // 비밀번호 제거 확인

        verify(userMapper).findAllActiveUsers();
    }

    @Test
    @DisplayName("비밀번호 변경 성공")
    void changePassword_Success() {
        // Given
        Long userId = 1L;
        String oldPassword = "password123";
        String newPassword = "newpassword123";

        when(userMapper.findById(userId)).thenReturn(testUser);
        when(userMapper.updatePassword(eq(userId), anyString())).thenReturn(1);

        // When
        userService.changePassword(userId, oldPassword, newPassword);

        // Then
        verify(userMapper).findById(userId);
        verify(userMapper).updatePassword(eq(userId), anyString());
    }

    @Test
    @DisplayName("비밀번호 변경 실패 - 잘못된 기존 비밀번호")
    void changePassword_Fail_WrongOldPassword() {
        // Given
        Long userId = 1L;
        String oldPassword = "wrongpassword";
        String newPassword = "newpassword123";

        when(userMapper.findById(userId)).thenReturn(testUser);

        // When & Then
        assertThatThrownBy(() -> userService.changePassword(userId, oldPassword, newPassword))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("기존 비밀번호가 올바르지 않습니다.");

        verify(userMapper).findById(userId);
        verify(userMapper, never()).updatePassword(anyLong(), anyString());
    }

    @Test
    @DisplayName("비밀번호 변경 실패 - 짧은 새 비밀번호")
    void changePassword_Fail_ShortNewPassword() {
        // Given
        Long userId = 1L;
        String oldPassword = "password123";
        String newPassword = "123"; // 6자 미만

        when(userMapper.findById(userId)).thenReturn(testUser);

        // When & Then
        assertThatThrownBy(() -> userService.changePassword(userId, oldPassword, newPassword))
                .isInstanceOf(CustomExceptions.ValidationException.class)
                .hasMessage("새 비밀번호는 6자 이상이어야 합니다.");

        verify(userMapper).findById(userId);
        verify(userMapper, never()).updatePassword(anyLong(), anyString());
    }
}