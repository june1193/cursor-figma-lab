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

// API 기본 설정
const API_BASE_URL = 'http://localhost:8080/api';

// API 서비스 함수들
export const apiService = {
  // 제품별 판매현황
  async getProductManagement(): Promise<ProductManagement[]> {
    const response = await fetch(`${API_BASE_URL}/product-management`);
    if (!response.ok) {
      throw new Error('제품별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  async getProductManagementById(id: number): Promise<ProductManagement> {
    const response = await fetch(`${API_BASE_URL}/product-management/${id}`);
    if (!response.ok) {
      throw new Error('제품별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  // 판매자별 판매현황
  async getSalesPersons(): Promise<SalesPerson[]> {
    const response = await fetch(`${API_BASE_URL}/sales-persons`);
    if (!response.ok) {
      throw new Error('판매자별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  async getSalesPersonById(id: number): Promise<SalesPerson> {
    const response = await fetch(`${API_BASE_URL}/sales-persons/${id}`);
    if (!response.ok) {
      throw new Error('판매자별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  // 이용기관별 판매현황
  async getInstitutions(): Promise<Institution[]> {
    const response = await fetch(`${API_BASE_URL}/institutions`);
    if (!response.ok) {
      throw new Error('이용기관별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  async getInstitutionById(id: number): Promise<Institution> {
    const response = await fetch(`${API_BASE_URL}/institutions/${id}`);
    if (!response.ok) {
      throw new Error('이용기관별 판매현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  // 수수료 현황
  async getCommissionStatus(): Promise<CommissionStatus[]> {
    const response = await fetch(`${API_BASE_URL}/commission-status`);
    if (!response.ok) {
      throw new Error('수수료 현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  async getCommissionStatusById(id: number): Promise<CommissionStatus> {
    const response = await fetch(`${API_BASE_URL}/commission-status/${id}`);
    if (!response.ok) {
      throw new Error('수수료 현황 데이터를 가져오는데 실패했습니다.');
    }
    return response.json();
  },

  // 데이터 업데이트 (향후 구현 예정)
  async updateProductManagement(id: number, data: Partial<ProductManagement>): Promise<ProductManagement> {
    const response = await fetch(`${API_BASE_URL}/product-management/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('제품별 판매현황 데이터 업데이트에 실패했습니다.');
    }
    return response.json();
  },

  async updateSalesPerson(id: number, data: Partial<SalesPerson>): Promise<SalesPerson> {
    const response = await fetch(`${API_BASE_URL}/sales-persons/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('판매자별 판매현황 데이터 업데이트에 실패했습니다.');
    }
    return response.json();
  },

  async updateInstitution(id: number, data: Partial<Institution>): Promise<Institution> {
    const response = await fetch(`${API_BASE_URL}/institutions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('이용기관별 판매현황 데이터 업데이트에 실패했습니다.');
    }
    return response.json();
  },

  async updateCommissionStatus(id: number, data: Partial<CommissionStatus>): Promise<CommissionStatus> {
    const response = await fetch(`${API_BASE_URL}/commission-status/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('수수료 현황 데이터 업데이트에 실패했습니다.');
    }
    return response.json();
  },
};
