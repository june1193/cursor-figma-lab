import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { useDashboardData } from "../hooks/useDashboardQueries";
import { ErrorDisplay } from "./ErrorDisplay";
import { IApiError } from "../types/error";

export function DataTablesSection() {
  const { 
    productManagement, 
    salesPersons, 
    institutions, 
    commissionStatus,
    isLoading,
    isError,
    error 
  } = useDashboardData();

  // 로딩 상태 처리
  if (isLoading) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <div className="text-center py-8">
          <div className="text-lg text-slate-600">데이터를 불러오는 중...</div>
        </div>
      </div>
    );
  }

  // 에러 상태 처리
  if (isError && error) {
    return (
      <div className="col-span-12 lg:col-span-8 space-y-8">
        <ErrorDisplay 
          error={error as IApiError}
          title="데이터를 불러오는데 실패했습니다"
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  // 데이터가 없는 경우 처리 (select 옵션으로 인해 구조가 변경됨)
  const productManagementData = productManagement.data?.items || [];
  const salesPersonData = salesPersons.data?.items || [];
  const institutionData = institutions.data?.items || [];
  const commissionData = commissionStatus.data?.items || [];

  // API 데이터를 테이블 형식으로 변환
  const productData = productManagementData.map(item => ({
    id: item.id,
    제품명: item.productName,
    상담건수: item.consultationCount.toString(),
    판매건수: item.salesCount.toString(),
    수수료: item.commission.toLocaleString(),
    MTD상담건수: item.mtdConsultationCount.toLocaleString(),
    MTD판매건수: item.mtdSalesCount.toLocaleString(),
    수수료MTD: item.mtdCommission.toLocaleString(),
    YTD상담건수: item.ytdConsultationCount.toLocaleString(),
    YTD판매건수: item.ytdSalesCount.toLocaleString(),
    수수료YTD: item.ytdCommission.toLocaleString()
  }));

  // 총합계 계산
  const totalData = {
    id: 999,
    제품명: '총합계',
    상담건수: productManagementData.reduce((sum, item) => sum + item.consultationCount, 0).toString(),
    판매건수: productManagementData.reduce((sum, item) => sum + item.salesCount, 0).toString(),
    수수료: productManagementData.reduce((sum, item) => sum + item.commission, 0).toLocaleString(),
    MTD상담건수: productManagementData.reduce((sum, item) => sum + item.mtdConsultationCount, 0).toLocaleString(),
    MTD판매건수: productManagementData.reduce((sum, item) => sum + item.mtdSalesCount, 0).toLocaleString(),
    수수료MTD: productManagementData.reduce((sum, item) => sum + item.mtdCommission, 0).toLocaleString(),
    YTD상담건수: productManagementData.reduce((sum, item) => sum + item.ytdConsultationCount, 0).toLocaleString(),
    YTD판매건수: productManagementData.reduce((sum, item) => sum + item.ytdSalesCount, 0).toLocaleString(),
    수수료YTD: productManagementData.reduce((sum, item) => sum + item.ytdCommission, 0).toLocaleString()
  };

  const finalProductData = [...productData, totalData];

  // 판매자별 데이터 변환
  const salesPersonTableData = salesPersonData.map(item => ({
    id: item.id,
    판매자명: item.salesPersonName,
    상담건수: item.consultationCount.toString(),
    판매건수: item.salesCount.toString(),
    수수료: item.commission.toLocaleString(),
    MTD상담건수: item.mtdConsultationCount.toLocaleString(),
    MTD판매건수: item.mtdSalesCount.toLocaleString(),
    수수료MTD: item.mtdCommission.toLocaleString(),
    YTD상담건수: item.ytdConsultationCount.toLocaleString(),
    YTD판매건수: item.ytdSalesCount.toLocaleString(),
    수수료YTD: item.ytdCommission.toLocaleString()
  }));

  // 이용기관별 데이터 변환
  const institutionTableData = institutionData.map(item => ({
    id: item.id,
    이용기관: item.institutionName,
    상담건수: item.consultationCount.toString(),
    판매건수: item.salesCount.toString(),
    수수료: item.commission.toLocaleString(),
    MTD상담건수: item.mtdConsultationCount.toLocaleString(),
    MTD판매건수: item.mtdSalesCount.toLocaleString(),
    수수료MTD: item.mtdCommission.toLocaleString(),
    YTD상담건수: item.ytdConsultationCount.toLocaleString(),
    YTD판매건수: item.ytdSalesCount.toLocaleString(),
    수수료YTD: item.ytdCommission.toLocaleString()
  }));

  // 수수료 현황 데이터 변환
  const commissionTableData = commissionData.map(item => ({
    id: item.id,
    구분: item.productType,
    수수료: item.commission.toLocaleString(),
    MTD수수료: item.mtdCommission.toLocaleString(),
    YTD수수료: item.ytdCommission.toLocaleString()
  }));



  return (
    <div className="col-span-12 lg:col-span-8 space-y-8">
      {/* 제품별 판매현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">제품별 판매현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">제품명</TableHead>
                  <TableHead className="text-slate-700 font-semibold">상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료MTD</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalProductData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      row.제품명 === '총합계' ? 'bg-slate-50 font-semibold' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800">{row.제품명}</TableCell>
                    <TableCell className="text-slate-700">{row.상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료MTD}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 판매자별 판매현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">판매자별 판매현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">판매자명</TableHead>
                  <TableHead className="text-slate-700 font-semibold">상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료MTD</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesPersonTableData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      row.판매자명 === '총합계' ? 'bg-slate-50 font-semibold' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800">{row.판매자명}</TableCell>
                    <TableCell className="text-slate-700">{row.상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료MTD}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 이용기관별 판매현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">이용기관별 판매현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">이용기관</TableHead>
                  <TableHead className="text-slate-700 font-semibold">상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료MTD</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD상담건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD판매건수</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료YTD</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutionTableData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      row.이용기관 === '총합계' ? 'bg-slate-50 font-semibold' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800">{row.이용기관}</TableCell>
                    <TableCell className="text-slate-700">{row.상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료MTD}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD상담건수}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD판매건수}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 수수료 현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-slate-800">수수료 현황</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200">
                  <TableHead className="text-slate-700 font-semibold">구분</TableHead>
                  <TableHead className="text-slate-700 font-semibold">수수료</TableHead>
                  <TableHead className="text-slate-700 font-semibold">MTD수수료</TableHead>
                  <TableHead className="text-slate-700 font-semibold">YTD수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissionTableData.map((row) => (
                  <TableRow 
                    key={row.id} 
                    className={`border-slate-100 hover:bg-slate-50/50 transition-colors ${
                      row.구분 === '총합계' ? 'bg-slate-50 font-semibold' : ''
                    }`}
                  >
                    <TableCell className="text-slate-800">{row.구분}</TableCell>
                    <TableCell className="text-slate-700">{row.수수료}</TableCell>
                    <TableCell className="text-slate-700">{row.MTD수수료}</TableCell>
                    <TableCell className="text-slate-700">{row.YTD수수료}</TableCell>
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