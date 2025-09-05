import apiClient from '../lib/apiClient';
import type { ExchangeRate } from '../types/exchangeRate';

export const exchangeRateApi = {
  getExchangeRates: async (): Promise<ExchangeRate[]> => {
    const response = await apiClient.get('/exchange-rates');
    return response.data;
  }
};
