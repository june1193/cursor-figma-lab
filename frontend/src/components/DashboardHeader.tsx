import { Button } from "./ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RefreshButton } from "./RefreshButton";
import { LogOut, User } from "lucide-react";
import type { User } from "../types/user";

interface DashboardHeaderProps {
  onLogout?: () => void;
  user?: User | null;
}

export function DashboardHeader({ onLogout, user }: DashboardHeaderProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
      <div className="w-full px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">대시보드</h1>
              <p className="text-slate-600 mt-1">실시간 관리 현황 및 수익 분석</p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-700">기준일자</span>
              <Select defaultValue="2024-09-10">
                <SelectTrigger className="w-40 bg-white border-slate-300 focus:border-slate-500 focus:ring-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-09-10">2024-09-10</SelectItem>
                  <SelectItem value="2024-09-09">2024-09-09</SelectItem>
                  <SelectItem value="2024-09-08">2024-09-08</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RefreshButton />
            <Button className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
              조회
            </Button>
            
            {onLogout && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-slate-600">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">{user?.username || '관리자'}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 border-slate-300 hover:border-slate-400 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  로그아웃
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}