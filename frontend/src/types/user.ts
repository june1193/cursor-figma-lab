// 사용자 정보 타입
export interface User {
  id: number;
  companyName: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// 회원가입 요청 타입
export interface SignUpRequest {
  companyName: string;
  username: string;
  email: string;
  password: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  username: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  success: boolean;
  message: string;
  user: User;
  token: string;
}

// 회원가입 응답 타입
export interface SignUpResponse {
  success: boolean;
  message: string;
  user: User;
}

// API 응답 기본 타입
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// 에러 응답 타입
export interface ErrorResponse {
  message: string;
  code: string;
  status: number;
  timestamp: string;
}

// 사용자 목록 응답 타입
export interface UserListResponse {
  success: boolean;
  users: User[];
  count: number;
}

// 비밀번호 변경 요청 타입
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

// 사용자명/이메일 중복 확인 응답 타입
export interface CheckAvailabilityResponse {
  success: boolean;
  available: boolean;
  message: string;
}
