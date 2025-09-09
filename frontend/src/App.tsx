import { useState, useEffect } from "react";
import { LoginForm } from "./components/LoginForm";
import { SignUpForm } from "./components/SignUpForm";
import { DashboardHeader } from "./components/DashboardHeader";
import { ChartsSection } from "./components/ChartsSection";
import { DataTablesSection } from "./components/DataTablesSection";
import { useCurrentUser, useLogout } from "./hooks/useDashboardQueries";
import { userApi } from "./services/userApi";
import type { User } from "./types/user";
import { PageLoadingSpinner } from "./components/ui/LoadingSpinner";

type AuthMode = 'login' | 'signup';

export default function App() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  
  // 날짜 선택 상태 (임시 저장용)
  const [tempStartDate, setTempStartDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 12)));
  const [tempEndDate, setTempEndDate] = useState<Date | undefined>(new Date());
  
  // 실제 적용된 날짜 (API 호출에 사용)
  const [appliedStartDate, setAppliedStartDate] = useState<Date | undefined>(new Date(new Date().setMonth(new Date().getMonth() - 12)));
  const [appliedEndDate, setAppliedEndDate] = useState<Date | undefined>(new Date());
  
  // React Query hooks
  const { data: currentUser, isLoading: userLoading } = useCurrentUser();
  const logoutMutation = useLogout();
  
  const isLoggedIn = !!currentUser;

  // 조회 버튼 클릭 시 실제 날짜 적용
  const handleApplyDateRange = () => {
    setAppliedStartDate(tempStartDate);
    setAppliedEndDate(tempEndDate);
  };

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
    return <PageLoadingSpinner />;
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
      <DashboardHeader 
        onLogout={handleLogout} 
        user={currentUser}
        startDate={tempStartDate}
        endDate={tempEndDate}
        onStartDateChange={setTempStartDate}
        onEndDateChange={setTempEndDate}
        onApplyDateRange={handleApplyDateRange}
      />
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <ChartsSection />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <DataTablesSection 
              startDate={appliedStartDate}
              endDate={appliedEndDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}