import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

const productData = [
  { id: 1, 제품명: 'CMA Type1', 상담건수: '45', 판매건수: '38', 수수료: '500,000', MTD상담건수: '1,350', MTD판매건수: '1,140', 수수료MTD: '25,000,000', YTD상담건수: '16,200', YTD판매건수: '13,680', 수수료YTD: '300,000,000' },
  { id: 2, 제품명: 'CMA Type2', 상담건수: '28', 판매건수: '22', 수수료: '300,000', MTD상담건수: '840', MTD판매건수: '660', 수수료MTD: '15,000,000', YTD상담건수: '10,080', YTD판매건수: '7,920', 수수료YTD: '180,000,000' },
  { id: 3, 제품명: '총합계', 상담건수: '73', 판매건수: '60', 수수료: '800,000', MTD상담건수: '2,190', MTD판매건수: '1,800', 수수료MTD: '40,000,000', YTD상담건수: '26,280', YTD판매건수: '21,600', 수수료YTD: '480,000,000' }
];

const salesPersonData = [
  { id: 1, 판매자명: '김영희', 상담건수: '35', 판매건수: '28', 수수료: '400,000', MTD상담건수: '1,050', MTD판매건수: '840', 수수료MTD: '20,000,000', YTD상담건수: '12,600', YTD판매건수: '10,080', 수수료YTD: '240,000,000' },
  { id: 2, 판매자명: '박민수', 상담건수: '25', 판매건수: '18', 수수료: '300,000', MTD상담건수: '750', MTD판매건수: '540', 수수료MTD: '15,000,000', YTD상담건수: '9,000', YTD판매건수: '6,480', 수수료YTD: '180,000,000' },
  { id: 3, 판매자명: '총합계', 상담건수: '60', 판매건수: '46', 수수료: '700,000', MTD상담건수: '1,800', MTD판매건수: '1,380', 수수료MTD: '35,000,000', YTD상담건수: '21,600', YTD판매건수: '16,560', 수수료YTD: '420,000,000' }
];

const institutionData = [
  { id: 1, 이용기관: 'A증권', 상담건수: '42', 판매건수: '35', 수수료: '500,000', MTD상담건수: '1,260', MTD판매건수: '1,050', 수수료MTD: '25,000,000', YTD상담건수: '15,120', YTD판매건수: '12,600', 수수료YTD: '300,000,000' },
  { id: 2, 이용기관: 'B증권', 상담건수: '22', 판매건수: '16', 수수료: '250,000', MTD상담건수: '660', MTD판매건수: '480', 수수료MTD: '12,500,000', YTD상담건수: '7,920', YTD판매건수: '5,760', 수수료YTD: '150,000,000' },
  { id: 3, 이용기관: '총합계', 상담건수: '64', 판매건수: '51', 수수료: '750,000', MTD상담건수: '1,920', MTD판매건수: '1,530', 수수료MTD: '37,500,000', YTD상담건수: '23,040', YTD판매건수: '18,360', 수수료YTD: '450,000,000' }
];

const performanceData = [
  { id: 1, 구분: '수수료수익', 당일: '1,200,000', 전일: '1,150,000', 전주: '1,250,000', MTD당일: '60,000,000', 전일MTD: '58,850,000', 전주MTD: '61,250,000', YTD당일: '720,000,000', 전일YTD: '718,850,000', 전주YTD: '731,250,000' },
  { id: 2, 구분: '총수익', 당일: '1,200,000', 전일: '1,150,000', 전주: '1,250,000', MTD당일: '60,000,000', 전일MTD: '58,850,000', 전주MTD: '61,250,000', YTD당일: '720,000,000', 전일YTD: '718,850,000', 전주YTD: '731,250,000' }
];

export function DataTablesSection() {
  return (
    <div className="space-y-6">
      {/* 제품별 관리현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">제품별 관리현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Product Management Status</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead rowSpan={2} className="border-slate-200 bg-slate-100/50 font-semibold text-slate-700 text-center py-4">제품명</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-blue-50 text-center font-semibold text-blue-700 py-3">Today</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-emerald-50 text-center font-semibold text-emerald-700 py-3">MTD</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-violet-50 text-center font-semibold text-violet-700 py-3">YTD</TableHead>
                </TableRow>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-blue-50/30 transition-colors duration-200 ${row.제품명 === '총합계' ? 'border-t-2 border-slate-300 bg-slate-100/50 font-semibold' : ''}`}
                  >
                    <TableCell className="border-slate-200 text-slate-700 font-medium text-center py-3">{row.제품명}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-blue-600 text-sm text-right py-3 font-medium">{row.수수료}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-emerald-600 text-sm text-right py-3 font-medium">{row.수수료MTD}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-violet-600 text-sm text-right py-3 font-medium">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 판매자별 판매현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-emerald-500 to-emerald-600 rounded-full"></div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">판매자별 판매현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Sales Performance by Salesperson</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead rowSpan={2} className="border-slate-200 bg-slate-100/50 font-semibold text-slate-700 text-center py-4">판매자명</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-blue-50 text-center font-semibold text-blue-700 py-3">Today</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-emerald-50 text-center font-semibold text-emerald-700 py-3">MTD</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-violet-50 text-center font-semibold text-violet-700 py-3">YTD</TableHead>
                </TableRow>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesPersonData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-emerald-50/30 transition-colors duration-200 ${row.판매자명 === '총합계' ? 'border-t-2 border-slate-300 bg-slate-100/50 font-semibold' : ''}`}
                  >
                    <TableCell className="border-slate-200 text-slate-700 font-medium text-center py-3">{row.판매자명}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-blue-600 text-sm text-right py-3 font-medium">{row.수수료}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-emerald-600 text-sm text-right py-3 font-medium">{row.수수료MTD}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-violet-600 text-sm text-right py-3 font-medium">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 이용기관별 판매현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-violet-500 to-violet-600 rounded-full"></div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">이용기관별 판매현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Sales Performance by Institution</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead rowSpan={2} className="border-slate-200 bg-slate-100/50 font-semibold text-slate-700 text-center py-4">이용기관</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-blue-50 text-center font-semibold text-blue-700 py-3">Today</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-emerald-50 text-center font-semibold text-emerald-700 py-3">MTD</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-violet-50 text-center font-semibold text-violet-700 py-3">YTD</TableHead>
                </TableRow>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">상담건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">판매건수</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">수수료</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {institutionData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-violet-50/30 transition-colors duration-200 ${row.이용기관 === '총합계' ? 'border-t-2 border-slate-300 bg-slate-100/50 font-semibold' : ''}`}
                  >
                    <TableCell className="border-slate-200 text-slate-700 font-medium text-center py-3">{row.이용기관}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-blue-600 text-sm text-right py-3 font-medium">{row.수수료}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.MTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-emerald-600 text-sm text-right py-3 font-medium">{row.수수료MTD}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD상담건수}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.YTD판매건수}</TableCell>
                    <TableCell className="border-slate-200 text-violet-600 text-sm text-right py-3 font-medium">{row.수수료YTD}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 수익현황 */}
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full"></div>
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">수익현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Revenue Performance</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50">
                  <TableHead rowSpan={2} className="border-slate-200 bg-slate-100/50 font-semibold text-slate-700 text-center py-4">구분</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-blue-50 text-center font-semibold text-blue-700 py-3">Today</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-emerald-50 text-center font-semibold text-emerald-700 py-3">MTD</TableHead>
                  <TableHead colSpan={3} className="border-slate-200 bg-violet-50 text-center font-semibold text-violet-700 py-3">YTD</TableHead>
                </TableRow>
                <TableRow className="bg-slate-50/50">
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">당일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전주</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">당일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전주</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">당일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전일</TableHead>
                  <TableHead className="border-slate-200 text-slate-600 text-xs text-center py-2">전주</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {performanceData.map((row, index) => (
                  <TableRow 
                    key={row.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'} hover:bg-amber-50/30 transition-colors duration-200 ${row.구분 === '총수익' ? 'border-t-2 border-slate-300 bg-slate-100/50 font-semibold' : ''}`}
                  >
                    <TableCell className="border-slate-200 text-slate-700 font-medium text-center py-3">{row.구분}</TableCell>
                    <TableCell className="border-slate-200 text-blue-600 text-sm text-right py-3 font-medium">{row.당일}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전일}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전주}</TableCell>
                    <TableCell className="border-slate-200 text-emerald-600 text-sm text-right py-3 font-medium">{row.MTD당일}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전일MTD}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전주MTD}</TableCell>
                    <TableCell className="border-slate-200 text-violet-600 text-sm text-right py-3 font-medium">{row.YTD당일}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전일YTD}</TableCell>
                    <TableCell className="border-slate-200 text-slate-600 text-sm text-right py-3">{row.전주YTD}</TableCell>
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