import { useState, useEffect, useCallback, useRef } from 'react';
import { userApi } from '../services/userApi';

interface TokenExpiryInfo {
  remainingTime: number; // 남은 시간 (초)
  isExpired: boolean;    // 만료 여부
  percentage: number;    // 남은 시간 비율 (0-100)
  timeDisplay: string;   // 표시용 시간 문자열 (예: "24분 12초")
}

export function useTokenExpiry() {
  const [expiryInfo, setExpiryInfo] = useState<TokenExpiryInfo>({
    remainingTime: 0,
    isExpired: false,
    percentage: 0,
    timeDisplay: "0초"
  });
  
  const startTimeRef = useRef<number | null>(null);

  // 30분 카운트다운 시작
  const startCountdown = useCallback(() => {
    startTimeRef.current = Date.now();
    console.log('30분 카운트다운 시작');
  }, []);

  // 토큰 만료시간 업데이트
  const updateExpiryInfo = useCallback(() => {
    const token = userApi.getToken();
    
    if (!token) {
      setExpiryInfo({
        remainingTime: 0,
        isExpired: true,
        percentage: 0,
        timeDisplay: "0초"
      });
      return;
    }

    // 카운트다운이 시작되지 않았다면 시작
    if (startTimeRef.current === null) {
      startCountdown();
      return;
    }

    // 30분 카운트다운 계산
    const elapsed = Date.now() - startTimeRef.current;
    const remainingMs = Math.max(0, 1800000 - elapsed); // 30분 - 경과시간
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    const percentage = Math.max(0, Math.min(100, (remainingMs / 1800000) * 100));

    console.log('카운트다운:', {
      elapsed,
      remainingMs,
      remainingSeconds,
      percentage
    });

    if (remainingMs <= 0) {
      setExpiryInfo({
        remainingTime: 0,
        isExpired: true,
        percentage: 0,
        timeDisplay: "0초"
      });
      return;
    }

    // 분과 초로 변환
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    const timeDisplay = minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;

    setExpiryInfo({
      remainingTime: remainingSeconds,
      isExpired: false,
      percentage,
      timeDisplay
    });
  }, [startCountdown]);

  // 1초마다 토큰 만료시간 체크
  useEffect(() => {
    updateExpiryInfo();
    
    const interval = setInterval(updateExpiryInfo, 1000);
    
    return () => clearInterval(interval);
  }, [updateExpiryInfo]);

  // 토큰이 만료되면 자동 로그아웃
  useEffect(() => {
    if (expiryInfo.isExpired && userApi.isAuthenticated()) {
      console.log('토큰이 만료되어 자동 로그아웃됩니다.');
      userApi.logout();
      window.location.href = '/';
    }
  }, [expiryInfo.isExpired]);

  return {
    ...expiryInfo,
    updateExpiryInfo
  };
}
