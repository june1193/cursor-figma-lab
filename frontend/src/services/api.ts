// API 타입 정의
export interface ProductManagement {
  id: number;
  productName: string;
  consultationCount: number;
  salesCount: number;
  commission: number;
  mtdConsultationCount: number;
  mtdSalesCount: number;
  mtdCommission: number;
  ytdConsultationCount: number;
  ytdSalesCount: number;
  ytdCommission: number;
}

export interface SalesPerson {
  id: number;
  salesPersonName: string;
  consultationCount: number;
  salesCount: number;
  commission: number;
  mtdConsultationCount: number;
  mtdSalesCount: number;
  mtdCommission: number;
  ytdConsultationCount: number;
  ytdSalesCount: number;
  ytdCommission: number;
}

export interface Institution {
  id: number;
  institutionName: string;
  consultationCount: number;
  salesCount: number;
  commission: number;
  mtdConsultationCount: number;
  mtdSalesCount: number;
  mtdCommission: number;
  ytdConsultationCount: number;
  ytdSalesCount: number;
  ytdCommission: number;
}

export interface CommissionStatus {
  id: number;
  productType: string;
  commission: number;
  mtdCommission: number;
  ytdCommission: number;
}

import { ApiError, ERROR_CODES, IApiError } from '../types/error';
import { handleApiError, logError } from '../utils/errorHandler';

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api';

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

// API 서비스 함수들
export const apiService = {
  // 제품별 판매현황
  async getProductManagement(): Promise<ProductManagement[]> {
    return apiRequest<ProductManagement[]>(`${API_BASE_URL}/product-management`);
  },

  async getProductManagementById(id: number): Promise<ProductManagement> {
    return apiRequest<ProductManagement>(`${API_BASE_URL}/product-management/${id}`);
  },

  // 판매자별 판매현황
  async getSalesPersons(): Promise<SalesPerson[]> {
    return apiRequest<SalesPerson[]>(`${API_BASE_URL}/sales-persons`);
  },

  async getSalesPersonById(id: number): Promise<SalesPerson> {
    return apiRequest<SalesPerson>(`${API_BASE_URL}/sales-persons/${id}`);
  },

  // 이용기관별 판매현황
  async getInstitutions(): Promise<Institution[]> {
    return apiRequest<Institution[]>(`${API_BASE_URL}/institutions`);
  },

  async getInstitutionById(id: number): Promise<Institution> {
    return apiRequest<Institution>(`${API_BASE_URL}/institutions/${id}`);
  },

  // 수수료 현황
  async getCommissionStatus(): Promise<CommissionStatus[]> {
    return apiRequest<CommissionStatus[]>(`${API_BASE_URL}/commission-status`);
  },

  async getCommissionStatusById(id: number): Promise<CommissionStatus> {
    return apiRequest<CommissionStatus>(`${API_BASE_URL}/commission-status/${id}`);
  },

  // 데이터 업데이트 (향후 구현 예정)
  async updateProductManagement(id: number, data: Partial<ProductManagement>): Promise<ProductManagement> {
    return apiRequest<ProductManagement>(`${API_BASE_URL}/product-management/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async updateSalesPerson(id: number, data: Partial<SalesPerson>): Promise<SalesPerson> {
    return apiRequest<SalesPerson>(`${API_BASE_URL}/sales-persons/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async updateInstitution(id: number, data: Partial<Institution>): Promise<Institution> {
    return apiRequest<Institution>(`${API_BASE_URL}/institutions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async updateCommissionStatus(id: number, data: Partial<CommissionStatus>): Promise<CommissionStatus> {
    return apiRequest<CommissionStatus>(`${API_BASE_URL}/commission-status/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};
