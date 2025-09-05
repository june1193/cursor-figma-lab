import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useDashboardData } from "../hooks/useDashboardQueries";
import { CardLoadingSpinner } from "./ui/LoadingSpinner";
import { CardErrorMessage } from "./ui/ErrorMessage";

export function DataTablesSection() {
  const { 
    exchangeRates,
    isLoading,
    isError,
    error 
  } = useDashboardData();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <CardLoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (isError && error) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <CardErrorMessage 
          title="데이터를 불러오는데 실패했습니다"
          error={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // 환율 데이터 처리
  const exchangeRateData = exchangeRates.data?.latestRates || {};
  const exchangeRateItems = Object.values(exchangeRateData);



  return (
    <div className="col-span-12 lg:col-span-8 space-y-8">
      {/* 실시간 환율 정보 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">실시간 환율 정보</CardTitle>
          <p className="text-sm text-slate-600">한국은행 공식 데이터 (5분마다 갱신)</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">통화</TableHead>
                  <TableHead className="text-slate-700 font-semibold">현재가</TableHead>
                  <TableHead className="text-slate-700 font-semibold">단위</TableHead>
                  <TableHead className="text-slate-700 font-semibold">날짜</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exchangeRateItems.map((rate) => (
                  <TableRow 
                    key={rate.id} 
                    className="border-slate-100 hover:bg-slate-50/50 transition-colors"
                  >
                    <TableCell className="text-slate-800 font-medium">{rate.currencyPair}</TableCell>
                    <TableCell className="text-slate-700 font-mono text-lg">
                      {rate.rate.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-slate-600">{rate.unit}</TableCell>
                    <TableCell className="text-slate-600">
                      {new Date(rate.date).toLocaleDateString('ko-KR')}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}