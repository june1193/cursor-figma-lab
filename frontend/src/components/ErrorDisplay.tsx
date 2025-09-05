import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { IApiError } from '../types/error';
import { getErrorMessage, getErrorDetails } from '../utils/errorHandler';

interface ErrorDisplayProps {
  error: IApiError;
  onRetry?: () => void;
  title?: string;
  className?: string;
}

export function ErrorDisplay({ error, onRetry, title, className }: ErrorDisplayProps) {
  const errorMessage = getErrorMessage(error);
  const errorDetails = getErrorDetails(error);

  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>{title || '오류가 발생했습니다'}</AlertTitle>
      <AlertDescription className="mt-2">
        <div className="space-y-2">
          <p>{errorMessage}</p>
          
          {errorDetails.length > 0 && (
            <div className="text-sm">
              <p className="font-medium">상세 정보:</p>
              <ul className="list-disc list-inside space-y-1">
                {errorDetails.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
          
          {onRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="mt-3"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              다시 시도
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}






