import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff, User, Lock, Building2, Mail, CheckCircle } from "lucide-react";
import { useSignUp } from "../hooks/useDashboardQueries";
import type { SignUpRequest } from "../types/user";
import { sanitizeInput, isValidUsername, isValidEmail, validatePassword } from "../utils/security";

interface SignUpFormProps {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
}

export function SignUpForm({ onSignUp, onSwitchToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const signUpMutation = useSignUp();

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.company.trim()) {
      newErrors.company = '회사명을 입력해주세요';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = '사용자명을 입력해주세요';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = '사용자명은 영문, 숫자, 언더스코어만 사용 가능하며 3-20자여야 합니다';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다';
    }
    
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.message;
      }
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호 확인을 입력해주세요';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 클라이언트 측 유효성 검사
    if (!validateForm()) {
      return;
    }
    
    const signUpData: SignUpRequest = {
      companyName: formData.company,
      username: formData.username,
      email: formData.email,
      password: formData.password
    };

    signUpMutation.mutate(signUpData, {
      onSuccess: () => {
        // 회원가입 성공
        onSignUp();
      },
      onError: (error: any) => {
        // 에러는 React Query가 자동으로 처리
        console.error('SignUp error:', error);
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    // XSS 방지를 위한 입력값 정제
    const sanitizedValue = sanitizeInput(value);
    
    setFormData(prev => ({
      ...prev,
      [field]: sanitizedValue
    }));
    
    // 해당 필드의 에러 제거
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== '') && 
                     formData.password === formData.confirmPassword &&
                     isValidUsername(formData.username) &&
                     isValidEmail(formData.email) &&
                     validatePassword(formData.password).isValid;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex flex-col">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto" style={{ maxWidth: '448px' }}>
          {/* 로고/헤더 영역 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">금융 대시보드</h1>
            <p className="text-slate-600 mt-2">새 계정을 만들어 시작하세요</p>
          </div>

          {/* 회원가입 카드 */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800">회원가입</CardTitle>
              <p className="text-slate-500">새 계정 정보를 입력해 주세요</p>
            </CardHeader>
            <CardContent>
              {signUpMutation.isError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{signUpMutation.error?.message || '회원가입에 실패했습니다.'}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 회사명 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-base text-slate-700 font-medium">회사명</Label>
                  <div className="relative">
                    <Input
                      id="company"
                      type="text"
                      placeholder="회사명을 입력하세요"
                      value={formData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${errors.company ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    {errors.company && <p className="text-red-500 text-sm mt-2">{errors.company}</p>}
                  </div>
                </div>

                {/* 사용자명 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="username" className="text-base text-slate-700 font-medium">사용자명</Label>
                  <div className="relative">
                    <Input
                      id="username"
                      type="text"
                      placeholder="사용자명을 입력하세요"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${errors.username ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-2">{errors.username}</p>}
                  </div>
                </div>

                {/* 이메일 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base text-slate-700 font-medium">이메일</Label>
                  <div className="relative">
                    <Input
                      id="email"
                      type="email"
                      placeholder="이메일을 입력하세요"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${errors.email ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                  </div>
                </div>


                {/* 비밀번호 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base text-slate-700 font-medium">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요 (6자 이상)"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pr-12 h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${errors.password ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password}</p>}
                  </div>
                </div>

                {/* 비밀번호 확인 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-base text-slate-700 font-medium">비밀번호 확인</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="비밀번호를 다시 입력하세요"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pr-12 h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${errors.confirmPassword ? 'border-red-400 focus:border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
                    {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <div className="flex items-center gap-2 mt-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">비밀번호가 일치합니다</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 회원가입 버튼 */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-6"
                  disabled={signUpMutation.isPending}
                >
                  {signUpMutation.isPending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      계정 생성 중...
                    </div>
                  ) : (
                    '회원가입'
                  )}
                </Button>
              </form>

              {/* 로그인 링크 */}
              <div className="mt-6 text-center">
                <p className="text-sm text-slate-600">
                  이미 계정이 있으신가요?{' '}
                  <button 
                    onClick={onSwitchToLogin}
                    className="text-slate-700 font-medium hover:text-slate-900 underline underline-offset-2 transition-colors"
                  >
                    로그인하기
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 푸터 */}
      <div className="text-center py-6">
        <p className="text-sm text-slate-500">
          © 2024 금융 대시보드. 모든 권리 보유.
        </p>
      </div>
    </div>
  );
}
