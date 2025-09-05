import { IApiError, ApiError, ERROR_CODES } from '../types/error';

// API 에러 처리 함수
export function handleApiError(error: unknown): IApiError {
  // 이미 ApiError인 경우
  if (error instanceof ApiError) {
    return error;
  }
  
  // 네트워크 에러 처리
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return new ApiError(
      '네트워크 연결을 확인해주세요.',
      ERROR_CODES.NETWORK_ERROR,
      0
    );
  }
  
  // 일반 Error 객체인 경우
  if (error instanceof Error) {
    return new ApiError(
      error.message,
      ERROR_CODES.UNKNOWN_ERROR
    );
  }
  
  // 알 수 없는 에러
  return new ApiError(
    '알 수 없는 오류가 발생했습니다.',
    ERROR_CODES.UNKNOWN_ERROR
  );
}

// 사용자 친화적인 에러 메시지 반환
export function getErrorMessage(error: IApiError): string {
  switch (error.code) {
    case ERROR_CODES.VALIDATION_ERROR:
      return '입력값을 확인해주세요.';
    case ERROR_CODES.DATA_NOT_FOUND:
      return '요청한 데이터를 찾을 수 없습니다.';
    case ERROR_CODES.DATABASE_ERROR:
      return '데이터베이스 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    case ERROR_CODES.NETWORK_ERROR:
      return '네트워크 연결을 확인해주세요.';
    case ERROR_CODES.TIMEOUT_ERROR:
      return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
    case ERROR_CODES.PARSE_ERROR:
      return '데이터 처리 중 오류가 발생했습니다.';
    case ERROR_CODES.INTERNAL_SERVER_ERROR:
      return '서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    default:
      return error.message || '알 수 없는 오류가 발생했습니다.';
  }
}

// 에러 로깅 함수
export function logError(error: IApiError, context?: string): void {
  const logMessage = context 
    ? `[${context}] ${error.code}: ${error.message}`
    : `${error.code}: ${error.message}`;
    
  console.error(logMessage, {
    code: error.code,
    status: error.status,
    details: error.details,
    timestamp: error.timestamp,
  });
}

// 에러 상세 정보 반환
export function getErrorDetails(error: IApiError): string[] {
  if (!error.details) {
    return [];
  }
  
  const details: string[] = [];
  Object.entries(error.details).forEach(([field, messages]) => {
    messages.forEach(message => {
      details.push(`${field}: ${message}`);
    });
  });
  
  return details;
}

// 에러가 특정 타입인지 확인
export function isErrorType(error: IApiError, code: string): boolean {
  return error.code === code;
}

// 재시도 가능한 에러인지 확인
export function isRetryableError(error: IApiError): boolean {
  const retryableCodes = [
    ERROR_CODES.NETWORK_ERROR,
    ERROR_CODES.TIMEOUT_ERROR,
    ERROR_CODES.INTERNAL_SERVER_ERROR,
  ];
  
  return retryableCodes.includes(error.code as any);
}






