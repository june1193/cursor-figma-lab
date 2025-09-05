import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, ProductManagement, SalesPerson, Institution, CommissionStatus } from '../services/api';
import { userApi } from '../services/userApi';
import { exchangeRateApi } from '../services/exchangeRateApi';
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
  productManagement: ['productManagement'] as const,
  productManagementById: (id: number) => ['productManagement', id] as const,
  salesPersons: ['salesPersons'] as const,
  salesPersonById: (id: number) => ['salesPerson', id] as const,
  institutions: ['institutions'] as const,
  institutionById: (id: number) => ['institution', id] as const,
  commissionStatus: ['commissionStatus'] as const,
  commissionStatusById: (id: number) => ['commissionStatus', id] as const,
  // Exchange Rate related query keys
  exchangeRates: ['exchangeRates'] as const,
  // User related query keys
  currentUser: ['currentUser'] as const,
  userById: (id: number) => ['user', id] as const,
};

// 제품별 판매현황 Queries
export const useProductManagement = () => {
  return useQuery({
    queryKey: queryKeys.productManagement,
    queryFn: apiService.getProductManagement,
    ...dashboardQueryDefaults, // 통합된 기본 설정 사용
    select: (data) => ({
      // 필요한 데이터만 추출하여 성능 최적화
      items: data,
      totalCount: data.length,
      totalAmount: data.reduce((sum, item) => sum + (item.amount || 0), 0),
      activeCount: data.filter(item => item.status === 'active').length,
    }),
    onError: createErrorHandler('useProductManagement'), // 통합된 에러 핸들러 사용
  });
};

export const useProductManagementById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.productManagementById(id),
    queryFn: () => apiService.getProductManagementById(id),
    enabled: !!id,
    ...individualQueryDefaults, // 통합된 기본 설정 사용
  });
};

// 판매자별 판매현황 Queries
export const useSalesPersons = () => {
  return useQuery({
    queryKey: queryKeys.salesPersons,
    queryFn: apiService.getSalesPersons,
    ...dashboardQueryDefaults, // 통합된 기본 설정 사용
    select: (data) => ({
      // 필요한 데이터만 추출하여 성능 최적화
      items: data,
      totalCount: data.length,
      totalSales: data.reduce((sum, item) => sum + (item.salesAmount || 0), 0),
      topPerformers: data
        .sort((a, b) => (b.salesAmount || 0) - (a.salesAmount || 0))
        .slice(0, 5),
    }),
  });
};

export const useSalesPersonById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.salesPersonById(id),
    queryFn: () => apiService.getSalesPersonById(id),
    enabled: !!id,
    ...individualQueryDefaults, // 통합된 기본 설정 사용
  });
};

// 이용기관별 판매현황 Queries
export const useInstitutions = () => {
  return useQuery({
    queryKey: queryKeys.institutions,
    queryFn: apiService.getInstitutions,
    ...dashboardQueryDefaults, // 통합된 기본 설정 사용
    select: (data) => ({
      // 필요한 데이터만 추출하여 성능 최적화
      items: data,
      totalCount: data.length,
      totalVolume: data.reduce((sum, item) => sum + (item.volume || 0), 0),
      institutionsByType: data.reduce((acc, item) => {
        const type = item.type || '기타';
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    }),
  });
};

export const useInstitutionById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.institutionById(id),
    queryFn: () => apiService.getInstitutionById(id),
    enabled: !!id,
    ...individualQueryDefaults, // 통합된 기본 설정 사용
  });
};

// 수수료 현황 Queries
export const useCommissionStatus = () => {
  return useQuery({
    queryKey: queryKeys.commissionStatus,
    queryFn: apiService.getCommissionStatus,
    ...dashboardQueryDefaults, // 통합된 기본 설정 사용
    select: (data) => ({
      // 필요한 데이터만 추출하여 성능 최적화
      items: data,
      totalCount: data.length,
      totalCommission: data.reduce((sum, item) => sum + (item.commission || 0), 0),
      averageCommission: data.length > 0 
        ? data.reduce((sum, item) => sum + (item.commission || 0), 0) / data.length 
        : 0,
      statusSummary: data.reduce((acc, item) => {
        const status = item.status || 'pending';
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    }),
  });
};

export const useCommissionStatusById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.commissionStatusById(id),
    queryFn: () => apiService.getCommissionStatusById(id),
    enabled: !!id,
    ...individualQueryDefaults, // 통합된 기본 설정 사용
  });
};

// Mutations
export const useUpdateProductManagement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ProductManagement> }) =>
      apiService.updateProductManagement(id, data),
    onSuccess: (updatedData) => {
      // 제품별 판매현황 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.productManagement });
      // 특정 제품 캐시 업데이트
      queryClient.setQueryData(queryKeys.productManagementById(updatedData.id), updatedData);
    },
  });
};

export const useUpdateSalesPerson = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<SalesPerson> }) =>
      apiService.updateSalesPerson(id, data),
    onSuccess: (updatedData) => {
      // 판매자별 판매현황 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.salesPersons });
      // 특정 판매자 캐시 업데이트
      queryClient.setQueryData(queryKeys.salesPersonById(updatedData.id), updatedData);
    },
  });
};

export const useUpdateInstitution = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Institution> }) =>
      apiService.updateInstitution(id, data),
    onSuccess: (updatedData) => {
      // 이용기관별 판매현황 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.institutions });
      // 특정 이용기관 캐시 업데이트
      queryClient.setQueryData(queryKeys.institutionById(updatedData.id), updatedData);
    },
  });
};

export const useUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CommissionStatus> }) =>
      apiService.updateCommissionStatus(id, data),
    onSuccess: (updatedData) => {
      // 수수료 현황 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.commissionStatus });
      // 특정 수수료 현황 캐시 업데이트
      queryClient.setQueryData(queryKeys.commissionStatusById(updatedData.id), updatedData);
    },
  });
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

// 모든 대시보드 데이터를 한번에 가져오는 Hook
export const useDashboardData = () => {
  const productQuery = useProductManagement();
  const salesQuery = useSalesPersons();
  const institutionQuery = useInstitutions();
  const commissionQuery = useCommissionStatus();
  const exchangeRateQuery = useExchangeRates();

  return {
    productManagement: productQuery,
    salesPersons: salesQuery,
    institutions: institutionQuery,
    commissionStatus: commissionQuery,
    exchangeRates: exchangeRateQuery,
    isLoading: productQuery.isLoading || salesQuery.isLoading || institutionQuery.isLoading || commissionQuery.isLoading || exchangeRateQuery.isLoading,
    isError: productQuery.isError || salesQuery.isError || institutionQuery.isError || commissionQuery.isError || exchangeRateQuery.isError,
    error: productQuery.error || salesQuery.error || institutionQuery.error || commissionQuery.error || exchangeRateQuery.error,
  };
};
