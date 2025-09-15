import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff, User, Lock, Building2, Mail, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useSignUp } from "../hooks/useDashboardQueries";
import { signUpSchema, type SignUpFormData } from "../schemas/validationSchemas";
import type { SignUpRequest } from "../types/user";
import { sanitizeInput } from "../utils/security";

import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FormErrorMessage } from "./ui/ErrorMessage";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ButtonLoadingSpinner } from "./ui/LoadingSpinner";


interface SignUpFormProps {
  onSignUp: () => void;
  onSwitchToLogin: () => void;
}

export function SignUpForm({ onSignUp, onSwitchToLogin }: SignUpFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const signUpMutation = useSignUp();

  // React Hook Form 설정
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setValue,
    watch
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpSchema),
    mode: 'onChange', // 실시간 검증
    defaultValues: {
      company: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // 입력값 감시 및 XSS 방지 처리
  const watchedValues = watch();
  const handleInputChange = (field: keyof SignUpFormData, value: string) => {
    const sanitizedValue = sanitizeInput(value);
    setValue(field, sanitizedValue, { shouldValidate: true });
  };

  const onSubmit = async (data: SignUpFormData) => {
    const signUpData: SignUpRequest = {
      companyName: data.company,
      username: data.username,
      email: data.email,
      password: data.password
    };

    signUpMutation.mutate(signUpData, {
      onSuccess: () => {
        onSignUp();
      },
      onError: (error: any) => {
        console.error('SignUp error:', error);
      }
    });
  };

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
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">테스트</h1>
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 회사명 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="company" className="text-base text-slate-700 font-medium">회사명</Label>
                  <div className="relative">
                    <Input
                      id="company"
                      type="text"
                      placeholder="회사명을 입력하세요"
                      autoComplete="organization"
                      {...register('company')}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${
                        errors.company ? 'border-red-400 focus:border-red-500' : ''
                      }`}
                    />
                    <FormErrorMessage message={errors.company?.message} />
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
                      autoComplete="username"
                      {...register('username')}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${
                        errors.username ? 'border-red-400 focus:border-red-500' : ''
                      }`}
                    />
                    <FormErrorMessage message={errors.username?.message} />
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
                      autoComplete="email"
                      {...register('email')}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${
                        errors.email ? 'border-red-400 focus:border-red-500' : ''
                      }`}
                    />
                    <FormErrorMessage message={errors.email?.message} />
                  </div>
                </div>


                {/* 비밀번호 입력 */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base text-slate-700 font-medium">비밀번호</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요 (8자 이상)"
                      autoComplete="new-password"
                      {...register('password')}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className={`pr-12 h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${
                        errors.password ? 'border-red-400 focus:border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <FormErrorMessage message={errors.password?.message} />
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
                      autoComplete="new-password"
                      {...register('confirmPassword')}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      className={`pr-12 h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200 ${
                        errors.confirmPassword ? 'border-red-400 focus:border-red-500' : ''
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <FormErrorMessage message={errors.confirmPassword?.message} />
                    {watchedValues.password && watchedValues.confirmPassword && watchedValues.password === watchedValues.confirmPassword && (
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
                  disabled={isSubmitting || signUpMutation.isPending || !isValid}
                >
                  {(isSubmitting || signUpMutation.isPending) ? (
                    <ButtonLoadingSpinner />
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
          © 2025 금융 대시보드. 모든 권리 보유.
        </p>
      </div>
    </div>
  );
}
