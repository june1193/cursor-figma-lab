import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { RefreshButton } from "./RefreshButton";
import { LogOut, User, CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useState } from "react";
import type { User } from "../types/user";
import { useTokenExpiry } from "../hooks/useTokenExpiry";

interface DashboardHeaderProps {
  onLogout?: () => void;
  user?: User | null;
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
  onApplyDateRange?: () => void;
}

export function DashboardHeader({ onLogout, user, startDate, endDate, onStartDateChange, onEndDateChange, onApplyDateRange }: DashboardHeaderProps) {
  const { remainingTime, isExpired, percentage, timeDisplay } = useTokenExpiry();

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 shadow-sm">
      <div className="w-full px-6 py-6">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="hidden sm:block">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight whitespace-normal break-keep">
                금융 시장 모니터링
              </h1>
              <p className="text-slate-600 mt-1 whitespace-normal break-keep">
                실시간 환율 및 경제 지표
              </p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 px-4 py-3 rounded-lg border border-slate-200">
              <span className="text-sm font-medium text-slate-700">조회기간</span>
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-32 justify-start text-left font-normal bg-white border-slate-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {startDate ? format(startDate, "yyyy-MM", {locale: ko}) : "시작일"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={onStartDateChange}
                        initialFocus
                        locale={ko}
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-slate-500">~</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className="w-32 justify-start text-left font-normal bg-white border-slate-300"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {endDate ? format(endDate, "yyyy-MM", {locale: ko}) : "종료일"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={onEndDateChange}
                        initialFocus
                        locale={ko}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* 토큰 만료시간 표시 - 로고와 함께 사라짐 */}
            {onLogout && !isExpired && (
              <div className="hidden sm:flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-lg px-3 py-2">
                <Clock className="w-4 h-4 text-orange-600" />
                <div className="flex flex-col">
                  <span className="text-xs text-orange-600 font-medium">로그아웃까지 남은 시간</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-orange-700">
                      {timeDisplay}
                    </span>
                    <div className="w-16 h-1 bg-orange-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 transition-all duration-1000 ease-linear"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <Button
                onClick={onApplyDateRange}
                className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              조회
            </Button>
            <RefreshButton/>

            {onLogout && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-slate-600">
                    <User className="w-4 h-4"/>
                    <span className="text-sm font-medium">{user?.username || '관리자'}</span>
                  </div>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={onLogout}
                      className="flex items-center gap-2 text-slate-600 hover:text-slate-800 border-slate-300 hover:border-slate-400 transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4"/>
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