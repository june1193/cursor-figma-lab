import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services/userApi';
import { exchangeRateApi, type InterestRate, type ConsumerPriceIndex } from '../services/exchangeRateApi';
import { IApiError } from '../types/error';
import { getErrorMessage, logError } from '../utils/errorHandler';
import type { LoginRequest, SignUpRequest, User } from '../types/user';
import type { ExchangeRate } from '../types/exchangeRate';
import { 
  dashboardQueryDefaults, 
  individualQueryDefaults, 
  authQueryDefaults,
  createErrorHandler 
} from './useQueryDefaults';

// Query Keys
export const queryKeys = {
  // Exchange Rate related query keys
  exchangeRates: ['exchangeRates'] as const,
  interestRates: ['interestRates'] as const,
  consumerPriceIndex: ['consumerPriceIndex'] as const,
  // User related query keys
  currentUser: ['currentUser'] as const,
  userById: (id: number) => ['user', id] as const,
};

// User Authentication Queries & Mutations
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.currentUser,
    queryFn: () => {
      const user = userApi.getCurrentUser();
      if (!user) {
        throw new Error('No user found');
      }
      return user;
    },
    enabled: userApi.isAuthenticated(),
    ...authQueryDefaults, // 통합된 기본 설정 사용
  });
};

export const useUserById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.userById(id),
    queryFn: () => userApi.getUserById(id),
    enabled: !!id,
    ...authQueryDefaults, // 통합된 기본 설정 사용
  });
};

// User Authentication Mutations
export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (loginData: LoginRequest) => userApi.login(loginData),
    onSuccess: (response) => {
      // 사용자 정보와 토큰 저장
      userApi.setUser(response.user, response.token);
      // 현재 사용자 캐시 설정
      queryClient.setQueryData(queryKeys.currentUser, response.user);
    },
    onError: createErrorHandler('useLogin'), // 통합된 에러 핸들러 사용
  });
};

export const useSignUp = () => {
  return useMutation({
    mutationFn: (signUpData: SignUpRequest) => userApi.signUp(signUpData),
    onError: createErrorHandler('useSignUp'), // 통합된 에러 핸들러 사용
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => {
      userApi.logout();
      return Promise.resolve();
    },
    onSuccess: () => {
      // 모든 사용자 관련 캐시 제거
      queryClient.removeQueries({ queryKey: queryKeys.currentUser });
      queryClient.clear();
    },
  });
};

// 환율 데이터 Queries
export const useExchangeRates = () => {
  return useQuery({
    queryKey: queryKeys.exchangeRates,
    queryFn: exchangeRateApi.getExchangeRates,
    ...dashboardQueryDefaults,
    refetchInterval: 300000, // 5분마다 갱신
    select: (data) => ({
      items: data,
      totalCount: data.length,
      currencies: [...new Set(data.map(item => item.currencyPair))],
      latestRates: data.reduce((acc, item) => {
        const pair = item.currencyPair;
        if (!acc[pair] || new Date(item.date) > new Date(acc[pair].date)) {
          acc[pair] = item;
        }
        return acc;
      }, {} as Record<string, ExchangeRate>),
    }),
    onError: createErrorHandler('useExchangeRates'),
  });
};

// 기준금리 데이터 Queries
export const useInterestRates = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: [...queryKeys.interestRates, startDate, endDate],
    queryFn: () => exchangeRateApi.getInterestRates(startDate, endDate),
    ...dashboardQueryDefaults,
    refetchInterval: 3600000, // 1시간마다 갱신 (월 1회 발표)
    select: (data) => ({
      items: data,
      totalCount: data.length,
      latestRate: data.length > 0 ? data[data.length - 1] : null,
      averageRate: data.length > 0 
        ? data.reduce((sum, item) => sum + item.rate, 0) / data.length 
        : 0,
    }),
    onError: createErrorHandler('useInterestRates'),
  });
};

// 소비자물가상승률 데이터 Queries
export const useConsumerPriceIndex = (startDate?: string, endDate?: string) => {
  return useQuery({
    queryKey: [...queryKeys.consumerPriceIndex, startDate, endDate],
    queryFn: () => exchangeRateApi.getConsumerPriceIndex(startDate, endDate),
    ...dashboardQueryDefaults,
    refetchInterval: 3600000, // 1시간마다 갱신 (월 1회 발표)
    select: (data) => ({
      items: data,
      totalCount: data.length,
      latestCpi: data.length > 0 ? data[data.length - 1] : null,
      averageCpi: data.length > 0 
        ? data.reduce((sum, item) => sum + item.cpi, 0) / data.length 
        : 0,
    }),
    onError: createErrorHandler('useConsumerPriceIndex'),
  });
};

// 모든 대시보드 데이터를 한번에 가져오는 Hook
export const useDashboardData = () => {
  const exchangeRateQuery = useExchangeRates();
  const interestRateQuery = useInterestRates();
  const cpiQuery = useConsumerPriceIndex();

  return {
    exchangeRates: exchangeRateQuery,
    interestRates: interestRateQuery,
    consumerPriceIndex: cpiQuery,
    isLoading: exchangeRateQuery.isLoading || interestRateQuery.isLoading || cpiQuery.isLoading,
    isError: exchangeRateQuery.isError || interestRateQuery.isError || cpiQuery.isError,
    error: exchangeRateQuery.error || interestRateQuery.error || cpiQuery.error,
  };
};