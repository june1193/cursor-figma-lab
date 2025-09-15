import { ApiError, ERROR_CODES, IApiError } from '../types/error';
import { handleApiError, logError } from '../utils/errorHandler';

// API 기본 설정 - 환경에 따라 다른 URL 사용
const API_BASE_URL = import.meta.env.PROD ? '/api' : 'http://localhost:8080/api';

// HTTP 요청 래퍼 함수
async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    // 응답이 성공적이지 않은 경우
    if (!response.ok) {
      let errorData: IApiError;
      
      try {
        errorData = await response.json();
      } catch {
        // JSON 파싱 실패 시 기본 에러 메시지 사용
        errorData = {
          message: `HTTP ${response.status}: ${response.statusText}`,
          code: ERROR_CODES.UNKNOWN_ERROR,
          status: response.status,
        };
      }
      
      throw new ApiError(
        errorData.message,
        errorData.code,
        errorData.status,
        errorData.details,
        errorData.timestamp
      );
    }

    return await response.json();
  } catch (error) {
    const apiError = handleApiError(error);
    logError(apiError, `API Request to ${url}`);
    throw apiError;
  }
}

// API 서비스 함수들 - 환율 API만 유지
export const apiService = {
  // 환율 정보는 exchangeRateApi.ts에서 별도 관리
  // 여기서는 공통 API 유틸리티만 제공
};