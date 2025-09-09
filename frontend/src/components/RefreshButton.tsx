import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import { queryKeys } from '../hooks/useDashboardQueries';
import { useState } from 'react';

export function RefreshButton() {
  const queryClient = useQueryClient();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    
    try {
      // 모든 대시보드 데이터 캐시 무효화하여 새로고침
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.productManagement }),
        queryClient.invalidateQueries({ queryKey: queryKeys.salesPersons }),
        queryClient.invalidateQueries({ queryKey: queryKeys.institutions }),
        queryClient.invalidateQueries({ queryKey: queryKeys.commissionStatus }),
        queryClient.invalidateQueries({ queryKey: queryKeys.exchangeRates }),
        queryClient.invalidateQueries({ queryKey: queryKeys.interestRates }),
        queryClient.invalidateQueries({ queryKey: queryKeys.consumerPriceIndex }),
      ]);
    } finally {
      // 애니메이션을 위해 잠시 대기
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  return (
    <Button 
      onClick={handleRefresh}
      variant="outline"
      size="sm"
      disabled={isRefreshing}
      className="flex items-center gap-2 hover:bg-slate-50 transition-colors"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? '새로고침 중...' : '새로고침'}
    </Button>
  );
}
