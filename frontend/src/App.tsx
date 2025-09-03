import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { ChartsSection } from "./components/ChartsSection";
import { DataTablesSection } from "./components/DataTablesSection";
import { userApi } from "./services/userApi";
import type { User } from "./types/user";

type AuthMode = 'login' | 'signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // 컴포넌트 마운트 시 인증 상태 확인
  useEffect(() => {
    const checkAuthStatus = () => {
      if (userApi.isAuthenticated()) {
        const user = userApi.getCurrentUser();
        if (user) {
          setCurrentUser(user);
          setIsLoggedIn(true);
        }
      }
    };

    checkAuthStatus();
  }, []);

  const handleLogin = (user: any) => {
    // 로그인 성공 시 사용자 정보를 직접 받아서 상태 업데이트
    setCurrentUser(user);
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    // 회원가입 후 자동으로 로그인 처리
    const user = userApi.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    userApi.logout();
    setCurrentUser(null);
    setIsLoggedIn(false);
    setAuthMode('login'); // 로그아웃 시 로그인 페이지로 리셋
  };

  const switchToSignUp = () => {
    setAuthMode('signup');
  };

  const switchToLogin = () => {
    setAuthMode('login');
  };

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