import apiClient from '../lib/apiClient';
import type { ExchangeRate } from '../types/exchangeRate';

export interface InterestRate {
  date: string;
  rate: number;
  unit: string;
}

export interface ConsumerPriceIndex {
  date: string;
  cpi: number;
  unit: string;
}

export const exchangeRateApi = {
  getExchangeRates: async (): Promise<ExchangeRate[]> => {
    const response = await apiClient.get('/exchange-rates');
    return response.data;
  },
  
  getInterestRates: async (startDate?: string, endDate?: string): Promise<InterestRate[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await apiClient.get(`/exchange-rates/interest-rates?${params.toString()}`);
    return response.data;
  },
  
  getConsumerPriceIndex: async (startDate?: string, endDate?: string): Promise<ConsumerPriceIndex[]> => {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    
    const response = await apiClient.get(`/exchange-rates/cpi?${params.toString()}`);
    return response.data;
  }
};
