import { IApiError } from '../types/error';
import { logError } from '../utils/errorHandler';

/**
 * React Query 기본 설정을 통합 관리하는 유틸리티
 */

// 대시보드 데이터용 기본 설정
export const dashboardQueryDefaults = {
  staleTime: 10 * 60 * 1000, // 10분
  cacheTime: 15 * 60 * 1000, // 15분
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// 개별 데이터용 기본 설정
export const individualQueryDefaults = {
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 10 * 60 * 1000, // 10분
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// 사용자 인증용 기본 설정
export const authQueryDefaults = {
  staleTime: 2 * 60 * 1000, // 2분
  cacheTime: 2 * 60 * 1000, // 2분
  retry: 1,
  refetchOnWindowFocus: false,
  refetchOnMount: false,
};

// 공통 에러 핸들러
export const createErrorHandler = (queryName: string) => {
  return (error: IApiError) => {
    logError(error, queryName);
  };
};

// 공통 onSuccess 핸들러 (캐시 무효화용)
export const createSuccessHandler = (queryClient: any, queryKey: any) => {
  return (data: any) => {
    // 관련 쿼리들 무효화
    queryClient.invalidateQueries({ queryKey });
  };
};
