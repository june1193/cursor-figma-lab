import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      cacheTime: 5 * 60 * 1000, // staleTime과 동일하게 설정하여 메모리 효율성 개선
      retry: 1, // 3 → 1로 줄여서 불필요한 재시도 방지
      refetchOnWindowFocus: false, // 창 포커스 시 자동 refetch 비활성화
      refetchOnMount: false, // 컴포넌트 마운트 시 자동 refetch 비활성화
      refetchOnReconnect: true, // 네트워크 재연결 시에만 refetch
    },
    mutations: {
      retry: 1,
      retryDelay: 1000, // 재시도 간격 1초
    },
  },
});
