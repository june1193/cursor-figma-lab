import { cn } from "./utils";

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
  fullScreen?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8'
};

export function LoadingSpinner({ 
  size = 'md', 
  className, 
  text,
  fullScreen = false 
}: LoadingSpinnerProps) {
  const spinner = (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="flex flex-col items-center gap-3">
        <div 
          className={cn(
            "border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin",
            sizeClasses[size]
          )}
        />
        {text && (
          <p className="text-slate-600 text-sm font-medium">{text}</p>
        )}
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

// 특정 용도별 프리셋 컴포넌트들
export function PageLoadingSpinner() {
  return (
    <LoadingSpinner 
      size="lg" 
      text="로딩 중..." 
      fullScreen 
    />
  );
}

export function ButtonLoadingSpinner() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      <span>처리 중...</span>
    </div>
  );
}

export function CardLoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner size="md" text="데이터를 불러오는 중..." />
    </div>
  );
}
