import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const chartData1 = [
  { name: '월', Type1: 120, Type2: 80, Type3: 60 },
  { name: '화', Type1: 190, Type2: 120, Type3: 90 },
  { name: '수', Type1: 300, Type2: 200, Type3: 150 },
  { name: '목', Type1: 250, Type2: 180, Type3: 120 },
  { name: '금', Type1: 180, Type2: 140, Type3: 100 },
  { name: '토', Type1: 90, Type2: 70, Type3: 50 },
  { name: '일', Type1: 140, Type2: 100, Type3: 80 }
];

const chartData2 = [
  { name: 'Type1', '2달전': 320, '1달전': 450, '당월': 580 },
  { name: 'Type2', '2달전': 280, '1달전': 380, '당월': 480 },
  { name: 'Type3', '2달전': 200, '1달전': 280, '당월': 350 }
];

const chartData3 = [
  { name: 'Type1', '2년전': 2800, '1년전': 3200, '올해': 3800 },
  { name: 'Type2', '2년전': 2400, '1년전': 2800, '올해': 3200 },
  { name: 'Type3', '2년전': 1800, '1년전': 2200, '올해': 2600 }
];

export function ChartsSection() {
  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">제품판매현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">Today</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData1} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <defs>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <Bar 
                dataKey="Type1" 
                fill="url(#blueGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Type2" 
                fill="url(#emeraldGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Type3" 
                fill="url(#violetGradient)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <span className="text-xs text-slate-600">Type1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <span className="text-xs text-slate-600">Type2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
              <span className="text-xs text-slate-600">Type3</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">제품판매현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">MTD</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData2} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>
              </defs>
              <Bar 
                dataKey="2달전" 
                fill="url(#orangeGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="1달전" 
                fill="url(#emeraldGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="당월" 
                fill="url(#blueGradient)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#f97316'}}></div>
              <span className="text-xs text-slate-600">2달전</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <span className="text-xs text-slate-600">1달전</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
              <span className="text-xs text-slate-600">당월</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold text-slate-800">제품판매현황</CardTitle>
              <p className="text-sm text-slate-500 mt-1">YTD</p>
            </div>
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-slate-500 to-slate-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData3} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <YAxis 
                tick={{ fill: '#64748b', fontSize: 12 }}
                axisLine={{ stroke: '#e2e8f0' }}
                tickLine={{ stroke: '#e2e8f0' }}
              />
              <defs>
                <linearGradient id="orangeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <linearGradient id="emeraldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#047857" />
                </linearGradient>
                <linearGradient id="violetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <Bar 
                dataKey="2년전" 
                fill="url(#orangeGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="1년전" 
                fill="url(#emeraldGradient)" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="올해" 
                fill="url(#violetGradient)" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{backgroundColor: '#f97316'}}></div>
              <span className="text-xs text-slate-600">2년전</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full"></div>
              <span className="text-xs text-slate-600">1년전</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full"></div>
              <span className="text-xs text-slate-600">올해</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}