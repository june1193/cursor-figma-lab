// API 에러 타입 정의
export interface IApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
  status?: number;
  timestamp?: string;
}

export class ApiError extends Error implements IApiError {
  code: string;
  details?: Record<string, string[]>;
  status?: number;
  timestamp?: string;

  constructor(message: string, code: string, status?: number, details?: Record<string, string[]>, timestamp?: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.details = details;
    this.timestamp = timestamp;
  }
}

// 에러 코드 상수
export const ERROR_CODES = {
  // 백엔드 에러 코드
  DATA_NOT_FOUND: 'DATA_NOT_FOUND',
  DATABASE_ERROR: 'DATABASE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  TYPE_MISMATCH: 'TYPE_MISMATCH',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  
  // 프론트엔드 에러 코드
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  PARSE_ERROR: 'PARSE_ERROR',
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
