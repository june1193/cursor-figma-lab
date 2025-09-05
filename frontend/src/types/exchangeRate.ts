export interface ExchangeRate {
  id: number;
  currencyPair: string;
  rate: number;
  date: string;
  unit: string;
  createdAt: string;
}

export interface ExchangeRateResponse {
  items: ExchangeRate[];
}
