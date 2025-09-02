import { DashboardHeader } from "./components/DashboardHeader";
import { ChartsSection } from "./components/ChartsSection";
import { DataTablesSection } from "./components/DataTablesSection";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <DashboardHeader />
      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <ChartsSection />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <DataTablesSection />
          </div>
        </div>
      </div>
    </div>
  );
}