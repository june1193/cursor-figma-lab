import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api';

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - JWT 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    // 401 Unauthorized - 토큰 만료 또는 인증 실패
    if (error.response?.status === 401) {
      // 로그인 실패 시에는 리다이렉트하지 않고 에러만 반환
      // 토큰 만료 시에만 리다이렉트 (현재는 로그인 중이므로 제외)
      if (error.config?.url?.includes('/auth/login')) {
        // 로그인 API 호출 시에는 리다이렉트하지 않음
      } else {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/';
      }
    }
    
    // 에러 응답 처리
    const errorMessage = error.response?.data?.message || error.message || '알 수 없는 오류가 발생했습니다.';
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
