import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { useExchangeRates } from "../hooks/useDashboardQueries";
import { CardLoadingSpinner } from "./ui/LoadingSpinner";
import { CardErrorMessage } from "./ui/ErrorMessage";

export function ChartsSection() {
  const { data: exchangeRates, isLoading, isError, error } = useExchangeRates();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="space-y-6">
        <CardLoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError && error) {
    return (
      <div className="space-y-6">
        <CardErrorMessage 
          title="환율 데이터를 불러오는데 실패했습니다"
          error={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // 환율 데이터를 차트 형식으로 변환
  const exchangeRateItems = exchangeRates?.items || [];
  
  // 각 통화별 차트 데이터 생성
  const usdData = exchangeRateItems
    .filter(item => item.currencyPair === 'USD/KRW')
    .slice(-30)
    .map(item => ({
      date: new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      rate: item.rate
    }));
    
  const jpyData = exchangeRateItems
    .filter(item => item.currencyPair === 'JPY/KRW')
    .slice(-30)
    .map(item => ({
      date: new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      rate: item.rate
    }));
    
  const cnyData = exchangeRateItems
    .filter(item => item.currencyPair === 'CNY/KRW')
    .slice(-30)
    .map(item => ({
      date: new Date(item.date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' }),
      rate: item.rate
    }));

  return (
    <div className="space-y-6">
      {/* USD/KRW 차트 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">USD/KRW 환율 추이</CardTitle>
              <p className="text-sm text-slate-500 mt-1">최근 30일</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={usdData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value.toLocaleString()}원`, '미국 달러']}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#3b82f6" 
                strokeWidth={2.5}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* JPY/KRW 차트 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">JPY/KRW 환율 추이</CardTitle>
              <p className="text-sm text-slate-500 mt-1">최근 30일</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={jpyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value.toLocaleString()}원`, '일본 엔']}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#ef4444" 
                strokeWidth={2.5}
                dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* CNY/KRW 차트 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">CNY/KRW 환율 추이</CardTitle>
              <p className="text-sm text-slate-500 mt-1">최근 30일</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={cnyData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="date" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
                domain={['dataMin - 10', 'dataMax + 10']}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: number) => [`${value.toLocaleString()}원`, '중국 위안']}
                labelStyle={{ color: '#374151', fontWeight: 'bold' }}
              />
              <Line 
                type="monotone" 
                dataKey="rate" 
                stroke="#22c55e" 
                strokeWidth={2.5}
                dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#22c55e', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}