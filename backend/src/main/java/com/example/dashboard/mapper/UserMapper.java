package com.example.dashboard.mapper;

import com.example.dashboard.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    // 사용자 생성
    @Insert("INSERT INTO users (company_name, username, email, password, created_at, updated_at, is_active) " +
            "VALUES (#{companyName}, #{username}, #{email}, #{password}, NOW(), NOW(), TRUE)")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insertUser(User user);

    // 사용자명으로 사용자 조회
    @Select("SELECT * FROM users WHERE username = #{username} AND is_active = TRUE")
    User findByUsername(@Param("username") String username);

    // 이메일로 사용자 조회
    @Select("SELECT * FROM users WHERE email = #{email} AND is_active = TRUE")
    User findByEmail(@Param("email") String email);

    // ID로 사용자 조회
    @Select("SELECT * FROM users WHERE id = #{id} AND is_active = TRUE")
    User findById(@Param("id") Long id);

    // 사용자명 중복 확인
    @Select("SELECT COUNT(*) FROM users WHERE username = #{username}")
    int countByUsername(@Param("username") String username);

    // 이메일 중복 확인
    @Select("SELECT COUNT(*) FROM users WHERE email = #{email}")
    int countByEmail(@Param("email") String email);

    // 모든 활성 사용자 조회
    @Select("SELECT * FROM users WHERE is_active = TRUE ORDER BY created_at DESC")
    List<User> findAllActiveUsers();

    // 사용자 정보 업데이트
    @Update("UPDATE users SET company_name = #{companyName}, email = #{email}, " +
            "updated_at = NOW() WHERE id = #{id}")
    int updateUser(User user);

    // 비밀번호 업데이트
    @Update("UPDATE users SET password = #{password}, updated_at = NOW() WHERE id = #{id}")
    int updatePassword(@Param("id") Long id, @Param("password") String password);

    // 사용자 비활성화 (소프트 삭제)
    @Update("UPDATE users SET is_active = FALSE, updated_at = NOW() WHERE id = #{id}")
    int deactivateUser(@Param("id") Long id);

    // 사용자 완전 삭제
    @Delete("DELETE FROM users WHERE id = #{id}")
    int deleteUser(@Param("id") Long id);
}
