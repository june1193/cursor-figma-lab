import { useState, useEffect, useCallback, useRef } from 'react';
import { userApi } from '../services/userApi';

interface TokenExpiryInfo {
  remainingTime: number; // 남은 시간 (초)
  isExpired: boolean;    // 만료 여부
  percentage: number;    // 남은 시간 비율 (0-100)
}

export function useTokenExpiry() {
  const [expiryInfo, setExpiryInfo] = useState<TokenExpiryInfo>({
    remainingTime: 0,
    isExpired: false,
    percentage: 0
  });
  
  const startTimeRef = useRef<number | null>(null);

  // 10초 카운트다운 시작
  const startCountdown = useCallback(() => {
    startTimeRef.current = Date.now();
    console.log('10초 카운트다운 시작');
  }, []);

  // 토큰 만료시간 업데이트
  const updateExpiryInfo = useCallback(() => {
    const token = userApi.getToken();
    
    if (!token) {
      setExpiryInfo({
        remainingTime: 0,
        isExpired: true,
        percentage: 0
      });
      return;
    }

    // 카운트다운이 시작되지 않았다면 시작
    if (startTimeRef.current === null) {
      startCountdown();
      return;
    }

    // 10초 카운트다운 계산
    const elapsed = Date.now() - startTimeRef.current;
    const remainingMs = Math.max(0, 10000 - elapsed); // 10초 - 경과시간
    const remainingSeconds = Math.ceil(remainingMs / 1000);
    const percentage = Math.max(0, Math.min(100, (remainingMs / 10000) * 100));

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
        percentage: 0
      });
      return;
    }

    setExpiryInfo({
      remainingTime: remainingSeconds,
      isExpired: false,
      percentage
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
