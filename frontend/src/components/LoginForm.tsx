import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Eye, EyeOff, User, Lock, Building2 } from "lucide-react";

interface LoginFormProps {
  onLogin: () => void;
  onSwitchToSignUp: () => void;
}

export function LoginForm({ onLogin, onSwitchToSignUp }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // 간단한 데모용 인증 로직 - 아무거나 입력해도 로그인 성공
    setTimeout(() => {
      onLogin();
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 flex flex-col">
      {/* 메인 콘텐츠 */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm mx-auto" style={{ maxWidth: '384px' }}>
          {/* 로고/헤더 영역 */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl mb-4 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">금융 대시보드</h1>
            <p className="text-slate-600 mt-2">관리 시스템에 로그인하세요</p>
          </div>

          {/* 로그인 카드 */}
          <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl">
            <CardHeader className="space-y-1 text-center pb-6">
              <CardTitle className="text-2xl font-bold text-slate-800">로그인</CardTitle>
              <p className="text-slate-500">계정 정보를 입력해 주세요</p>
            </CardHeader>
            <CardContent>
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
                    className="h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200"
                  />
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
                    className="h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base text-slate-700 font-medium">비밀번호</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력하세요"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pr-12 h-24 text-base bg-slate-50 border-slate-300 focus:border-slate-500 focus:ring-slate-200 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

                {/* 로그인 버튼 */}
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      로그인 중...
                    </div>
                  ) : (
                    '로그인'
                  )}
                </Button>
              </form>

              {/* 추가 옵션 */}
              <div className="mt-6 text-center space-y-3">
                <button className="text-sm text-slate-500 hover:text-slate-700 transition-colors">
                  비밀번호를 잊으셨나요?
                </button>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-sm text-slate-600">
                    아직 계정이 없으신가요?{' '}
                    <button 
                      onClick={onSwitchToSignUp}
                      className="text-slate-700 font-medium hover:text-slate-900 underline underline-offset-2 transition-colors"
                    >
                      회원가입하기
                    </button>
                  </p>
                </div>
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
