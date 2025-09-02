import { useQueryClient } from '@tanstack/react-query';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';
import { queryKeys } from '../hooks/useDashboardQueries';

export function RefreshButton() {
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    // 모든 대시보드 데이터 캐시 무효화하여 새로고침
    queryClient.invalidateQueries({ queryKey: queryKeys.productManagement });
    queryClient.invalidateQueries({ queryKey: queryKeys.salesPersons });
    queryClient.invalidateQueries({ queryKey: queryKeys.institutions });
    queryClient.invalidateQueries({ queryKey: queryKeys.commissionStatus });
  };

  return (
    <Button 
      onClick={handleRefresh}
      variant="outline"
      size="sm"
      className="flex items-center gap-2"
    >
      <RefreshCw className="h-4 w-4" />
      새로고침
    </Button>
  );
}
