import apiClient from '../lib/apiClient';
import type {
  User,
  SignUpRequest,
  LoginRequest,
  LoginResponse,
  SignUpResponse,
  UserListResponse,
  ChangePasswordRequest,
  CheckAvailabilityResponse,
  ApiResponse
} from '../types/user';

export const userApi = {
  // 회원가입
  signUp: async (userData: SignUpRequest): Promise<SignUpResponse> => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },

  // 로그인
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  // 사용자 정보 조회
  getUserById: async (userId: number): Promise<ApiResponse<User>> => {
    const response = await apiClient.get(`/users/${userId}`);
    return response.data;
  },

  // 모든 활성 사용자 조회
  getAllUsers: async (): Promise<UserListResponse> => {
    const response = await apiClient.get('/users');
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (userId: number, passwordData: ChangePasswordRequest): Promise<ApiResponse> => {
    const response = await apiClient.put(`/users/${userId}/password`, passwordData);
    return response.data;
  },

  // 사용자명 중복 확인
  checkUsername: async (username: string): Promise<CheckAvailabilityResponse> => {
    const response = await apiClient.get(`/auth/check-username/${username}`);
    return response.data;
  },

  // 이메일 중복 확인
  checkEmail: async (email: string): Promise<CheckAvailabilityResponse> => {
    const response = await apiClient.get(`/auth/check-email/${email}`);
    return response.data;
  },

  // 로그아웃 (클라이언트 측에서 토큰 제거)
  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  // 현재 로그인된 사용자 정보 가져오기
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('사용자 정보 파싱 오류:', error);
        return null;
      }
    }
    return null;
  },

  // 인증 토큰 가져오기
  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  // 로그인 상태 확인
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    return !!(token && user);
  },

  // 사용자 정보 저장
  setUser: (user: User, token: string): void => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('authToken', token);
  }
};
