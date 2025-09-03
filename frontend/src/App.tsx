import { useState } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { ChartsSection } from "./components/ChartsSection";
import { DataTablesSection } from "./components/DataTablesSection";

type AuthMode = 'login' | 'signup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    // 회원가입 후 자동으로 로그인 처리
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
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
      <DashboardHeader onLogout={handleLogout} />
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