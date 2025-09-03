import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { ChartsSection } from "./components/ChartsSection";
import { DataTablesSection } from "./components/DataTablesSection";
import { useCurrentUser, useLogout } from "./hooks/useDashboardQueries";
import { userApi } from "./services/userApi";
import type { User } from "./types/user";

type AuthMode = 'login' | 'signup';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // React Query hooks
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const logoutMutation = useLogout();
  
  const isLoggedIn = !!currentUser;

  const handleLogin = (user: any) => {
    // React Query가 자동으로 currentUser 상태를 업데이트함
    // 추가 작업이 필요하면 여기에 작성
  };

  const handleSignUp = () => {
    // 회원가입 후 자동으로 로그인 처리
    // React Query가 자동으로 처리함
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    setAuthMode('login'); // 로그아웃 시 로그인 페이지로 리셋
  };

  const switchToSignUp = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

  // 로딩 중인 경우
  if (userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  // 로그인하지 않은 경우 로그인/회원가입 폼 표시
  if (!isLoggedIn) {
    if (authMode === 'signup') {
      return <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={switchToLogin} />;
    } else {
      return <LoginForm onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} />;
    }
  }

  // 로그인한 경우 대시보드 표시
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardHeader onLogout={handleLogout} user={currentUser} />
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <ChartsSection />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <DataTablesSection />
          </div>
        </div>
      </div>
    </div>
  );
}