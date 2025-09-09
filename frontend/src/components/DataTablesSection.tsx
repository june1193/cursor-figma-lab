import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { format } from "date-fns";
import { useDashboardData, useInterestRates, useConsumerPriceIndex } from "../hooks/useDashboardQueries";
import { CardLoadingSpinner } from "./ui/LoadingSpinner";
import { CardErrorMessage } from "./ui/ErrorMessage";

interface DataTablesSectionProps {
  startDate?: Date;
  endDate?: Date;
}

export function DataTablesSection({ startDate, endDate }: DataTablesSectionProps) {

  // 날짜 파라미터 생성
  const startDateStr = startDate ? format(startDate, "yyyyMM") : undefined;
  const endDateStr = endDate ? format(endDate, "yyyyMM") : undefined;

  // 모든 Hook을 항상 같은 순서로 호출
  const { 
    exchangeRates,
    isLoading: exchangeLoading,
    isError: exchangeError,
    error: exchangeErrorData 
  } = useDashboardData();

  const interestRatesQuery = useInterestRates(startDateStr, endDateStr);
  const cpiQuery = useConsumerPriceIndex(startDateStr, endDateStr);

  // 로딩 상태 처리
  if (exchangeLoading || interestRatesQuery.isLoading || cpiQuery.isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <CardLoadingSpinner />
      </div>
    );
  }

  // 에러 상태 처리
  if (exchangeError || interestRatesQuery.isError || cpiQuery.isError) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <CardErrorMessage 
          title="데이터를 불러오는데 실패했습니다"
          error={exchangeErrorData || interestRatesQuery.error || cpiQuery.error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // 환율 데이터 처리
  const exchangeRateData = exchangeRates.data?.latestRates || {};
  const exchangeRateItems = Object.values(exchangeRateData);

  // 기준금리 데이터 처리
  const interestRateItems = interestRatesQuery.data?.items || [];
  const latestInterestRate = interestRatesQuery.data?.latestRate;

  // 소비자물가지수 데이터 처리
  const cpiItems = cpiQuery.data?.items || [];
  const latestCpi = cpiQuery.data?.latestCpi;
  
  // 물가상승률 계산 (전년 동월 대비)
  const calculateInflationRate = (currentCpi: number, previousCpi: number) => {
    return ((currentCpi - previousCpi) / previousCpi * 100).toFixed(2);
  };
  
  // 물가상승률 데이터 변환
  const inflationRates = cpiItems.map((item, index) => {
    if (index === 0) {
      return { ...item, inflationRate: 0 }; // 첫 번째 데이터는 비교할 이전 데이터가 없음
    }
    const previousItem = cpiItems[index - 1];
    const inflationRate = calculateInflationRate(item.cpi, previousItem.cpi);
    return { ...item, inflationRate: parseFloat(inflationRate) };
  }).slice(1); // 첫 번째 항목 제외

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
                {exchangeRateItems.map((rate, index) => (
                  <TableRow 
                    key={rate.id || `exchange-${index}`} 
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

      {/* 기준금리 정보 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">기준금리 현황</CardTitle>
          <p className="text-sm text-slate-600">한국은행 기준금리 (월 1회 발표)</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">날짜</TableHead>
                  <TableHead className="text-slate-700 font-semibold">금리 종류</TableHead>
                  <TableHead className="text-slate-700 font-semibold">기준금리</TableHead>
                  <TableHead className="text-slate-700 font-semibold">단위</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {interestRateItems.slice(-6).reverse().map((rate, index) => (
                  <TableRow 
                    key={index} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      index === 0 ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800 font-medium">
                      {rate.date.substring(0, 4)}년 {rate.date.substring(4, 6)}월
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {rate.rateType || "한국은행 기준금리"}
                    </TableCell>
                    <TableCell className="text-slate-700 font-mono text-lg">
                      {rate.rate}%
                    </TableCell>
                    <TableCell className="text-slate-600">{rate.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 소비자물가상승률 정보 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">소비자물가상승률</CardTitle>
          <p className="text-sm text-slate-600">한국은행 CPI 데이터 (월 1회 발표)</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">날짜</TableHead>
                  <TableHead className="text-slate-700 font-semibold">지수 종류</TableHead>
                  <TableHead className="text-slate-700 font-semibold">물가상승률</TableHead>
                  <TableHead className="text-slate-700 font-semibold">단위</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inflationRates.slice(-6).reverse().map((cpi, index) => (
                  <TableRow 
                    key={index} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      index === 0 ? 'bg-green-50/50' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800 font-medium">
                      {cpi.date.substring(0, 4)}년 {cpi.date.substring(4, 6)}월
                    </TableCell>
                    <TableCell className="text-slate-700 font-medium">
                      {cpi.cpiType || "소비자물가지수(총지수)"}
                    </TableCell>
                    <TableCell className="text-slate-700 font-mono text-lg">
                      {cpi.inflationRate}%
                    </TableCell>
                    <TableCell className="text-slate-600">%</TableCell>
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