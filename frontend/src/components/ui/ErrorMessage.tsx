import { AlertTriangle, RefreshCw, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "./utils";

interface ErrorMessageProps {
  title?: string;
  message?: string;
  error?: any;
  onRetry?: () => void;
  onDismiss?: () => void;
  variant?: 'default' | 'destructive' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showIcon?: boolean;
}

const variantClasses = {
  default: 'bg-red-50 border-red-200 text-red-800',
  destructive: 'bg-red-100 border-red-300 text-red-900',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
};

const sizeClasses = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-base',
  lg: 'p-6 text-lg'
};

export function ErrorMessage({
  title = "오류가 발생했습니다",
  message,
  error,
  onRetry,
  onDismiss,
  variant = 'default',
  size = 'md',
  className,
  showIcon = true
}: ErrorMessageProps) {
  // 에러 메시지 추출
  const errorMessage = message || 
    error?.message || 
    error?.response?.data?.message || 
    error?.error || 
    "알 수 없는 오류가 발생했습니다";

  return (
    <div 
      className={cn(
        "rounded-lg border flex items-start gap-3",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {showIcon && (
        <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
      )}
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm opacity-90 break-words">{errorMessage}</p>
        
        {/* 액션 버튼들 */}
        {(onRetry || onDismiss) && (
          <div className="flex gap-2 mt-3">
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="h-8 px-3 text-xs"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                다시 시도
              </Button>
            )}
            {onDismiss && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDismiss}
                className="h-8 px-3 text-xs"
              >
                <X className="w-3 h-3 mr-1" />
                닫기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// 특정 용도별 프리셋 컴포넌트들
export function FormErrorMessage({ 
  message, 
  className 
}: { 
  message?: string; 
  className?: string; 
}) {
  if (!message) return null;
  
  return (
    <div className={cn("flex items-center gap-2 text-red-500 text-sm mt-2", className)}>
      <AlertTriangle className="w-4 h-4 flex-shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export function PageErrorMessage({ 
  title = "페이지를 불러올 수 없습니다",
  message,
  error,
  onRetry 
}: {
  title?: string;
  message?: string;
  error?: any;
  onRetry?: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <ErrorMessage
          title={title}
          message={message}
          error={error}
          onRetry={onRetry}
          variant="destructive"
          size="lg"
        />
      </div>
    </div>
  );
}

export function CardErrorMessage({ 
  title = "데이터를 불러올 수 없습니다",
  message,
  error,
  onRetry 
}: {
  title?: string;
  message?: string;
  error?: any;
  onRetry?: () => void;
}) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="max-w-sm w-full">
        <ErrorMessage
          title={title}
          message={message}
          error={error}
          onRetry={onRetry}
          variant="default"
          size="md"
        />
      </div>
    </div>
  );
}

export function InlineErrorMessage({ 
  message, 
  className 
}: { 
  message?: string; 
  className?: string; 
}) {
  if (!message) return null;
  
  return (
    <div className={cn("text-red-500 text-sm mt-1", className)}>
      {message}
    </div>
  );
}
