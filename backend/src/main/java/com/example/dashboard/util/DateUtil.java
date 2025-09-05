package com.example.dashboard.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * 날짜/시간 처리를 위한 유틸리티 클래스
 */
public class DateUtil {
    
    // 기본 날짜 형식
    public static final String DEFAULT_DATE_FORMAT = "yyyy-MM-dd";
    public static final String DEFAULT_DATETIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DEFAULT_TIMESTAMP_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";
    
    // 기본 포맷터
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ofPattern(DEFAULT_DATE_FORMAT);
    private static final DateTimeFormatter DATETIME_FORMATTER = DateTimeFormatter.ofPattern(DEFAULT_DATETIME_FORMAT);
    private static final DateTimeFormatter TIMESTAMP_FORMATTER = DateTimeFormatter.ofPattern(DEFAULT_TIMESTAMP_FORMAT);
    
    /**
     * 현재 시간을 LocalDateTime으로 반환
     */
    public static LocalDateTime now() {
        return LocalDateTime.now();
    }
    
    /**
     * 현재 시간을 Date로 반환
     */
    public static Date nowAsDate() {
        return Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
    }
    
    /**
     * LocalDateTime을 Date로 변환
     */
    public static Date toDate(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        return Date.from(localDateTime.atZone(ZoneId.systemDefault()).toInstant());
    }
    
    /**
     * Date를 LocalDateTime으로 변환
     */
    public static LocalDateTime toLocalDateTime(Date date) {
        if (date == null) {
            return null;
        }
        return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }
    
    /**
     * LocalDateTime을 문자열로 변환 (기본 형식)
     */
    public static String format(LocalDateTime localDateTime) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.format(DATETIME_FORMATTER);
    }
    
    /**
     * LocalDateTime을 문자열로 변환 (지정된 형식)
     */
    public static String format(LocalDateTime localDateTime, String pattern) {
        if (localDateTime == null) {
            return null;
        }
        return localDateTime.format(DateTimeFormatter.ofPattern(pattern));
    }
    
    /**
     * Date를 문자열로 변환 (기본 형식)
     */
    public static String format(Date date) {
        if (date == null) {
            return null;
        }
        return format(toLocalDateTime(date));
    }
    
    /**
     * Date를 문자열로 변환 (지정된 형식)
     */
    public static String format(Date date, String pattern) {
        if (date == null) {
            return null;
        }
        return format(toLocalDateTime(date), pattern);
    }
    
    /**
     * 문자열을 LocalDateTime으로 변환 (기본 형식)
     */
    public static LocalDateTime parse(String dateTimeString) {
        if (dateTimeString == null || dateTimeString.trim().isEmpty()) {
            return null;
        }
        return LocalDateTime.parse(dateTimeString, DATETIME_FORMATTER);
    }
    
    /**
     * 문자열을 LocalDateTime으로 변환 (지정된 형식)
     */
    public static LocalDateTime parse(String dateTimeString, String pattern) {
        if (dateTimeString == null || dateTimeString.trim().isEmpty()) {
            return null;
        }
        return LocalDateTime.parse(dateTimeString, DateTimeFormatter.ofPattern(pattern));
    }
    
    /**
     * 두 날짜 사이의 일수 계산
     */
    public static long daysBetween(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) {
            return 0;
        }
        return java.time.Duration.between(start, end).toDays();
    }
    
    /**
     * 두 날짜 사이의 시간(시간 단위) 계산
     */
    public static long hoursBetween(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) {
            return 0;
        }
        return java.time.Duration.between(start, end).toHours();
    }
    
    /**
     * 두 날짜 사이의 분(분 단위) 계산
     */
    public static long minutesBetween(LocalDateTime start, LocalDateTime end) {
        if (start == null || end == null) {
            return 0;
        }
        return java.time.Duration.between(start, end).toMinutes();
    }
    
    /**
     * 현재 시간이 지정된 시간보다 이후인지 확인
     */
    public static boolean isAfterNow(LocalDateTime dateTime) {
        if (dateTime == null) {
            return false;
        }
        return dateTime.isAfter(now());
    }
    
    /**
     * 현재 시간이 지정된 시간보다 이전인지 확인
     */
    public static boolean isBeforeNow(LocalDateTime dateTime) {
        if (dateTime == null) {
            return false;
        }
        return dateTime.isBefore(now());
    }
    
    /**
     * 날짜가 오늘인지 확인
     */
    public static boolean isToday(LocalDateTime dateTime) {
        if (dateTime == null) {
            return false;
        }
        LocalDateTime today = now();
        return dateTime.toLocalDate().equals(today.toLocalDate());
    }
}
