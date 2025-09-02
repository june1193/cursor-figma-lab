import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService, ProductManagement, SalesPerson, Institution, CommissionStatus } from '../services/api';
import { IApiError } from '../types/error';
import { getErrorMessage, logError } from '../utils/errorHandler';

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
};

// 제품별 판매현황 Queries
export const useProductManagement = () => {
  return useQuery({
    queryKey: queryKeys.productManagement,
    queryFn: apiService.getProductManagement,
    staleTime: 5 * 60 * 1000, // 5분
    onError: (error: IApiError) => {
      logError(error, 'useProductManagement');
    },
  });
};

export const useProductManagementById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.productManagementById(id),
    queryFn: () => apiService.getProductManagementById(id),
    enabled: !!id,
  });
};

// 판매자별 판매현황 Queries
export const useSalesPersons = () => {
  return useQuery({
    queryKey: queryKeys.salesPersons,
    queryFn: apiService.getSalesPersons,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useSalesPersonById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.salesPersonById(id),
    queryFn: () => apiService.getSalesPersonById(id),
    enabled: !!id,
  });
};

// 이용기관별 판매현황 Queries
export const useInstitutions = () => {
  return useQuery({
    queryKey: queryKeys.institutions,
    queryFn: apiService.getInstitutions,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useInstitutionById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.institutionById(id),
    queryFn: () => apiService.getInstitutionById(id),
    enabled: !!id,
  });
};

// 수수료 현황 Queries
export const useCommissionStatus = () => {
  return useQuery({
    queryKey: queryKeys.commissionStatus,
    queryFn: apiService.getCommissionStatus,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

export const useCommissionStatusById = (id: number) => {
  return useQuery({
    queryKey: queryKeys.commissionStatusById(id),
    queryFn: () => apiService.getCommissionStatusById(id),
    enabled: !!id,
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

// 모든 대시보드 데이터를 한번에 가져오는 Hook
export const useDashboardData = () => {
  const productQuery = useProductManagement();
  const salesQuery = useSalesPersons();
  const institutionQuery = useInstitutions();
  const commissionQuery = useCommissionStatus();

  return {
    productManagement: productQuery,
    salesPersons: salesQuery,
    institutions: institutionQuery,
    commissionStatus: commissionQuery,
    isLoading: productQuery.isLoading || salesQuery.isLoading || institutionQuery.isLoading || commissionQuery.isLoading,
    isError: productQuery.isError || salesQuery.isError || institutionQuery.isError || commissionQuery.isError,
    error: productQuery.error || salesQuery.error || institutionQuery.error || commissionQuery.error,
  };
};
