
import { Header } from '@/components/dashboard/header';
import { MetricsCards } from '@/components/dashboard/metrics-cards';
import { SalesChart } from '@/components/dashboard/sales-chart';
import { ExpenseChart } from '@/components/dashboard/expense-chart';
import { RecentSales } from '@/components/dashboard/recent-sales';
import { TopBrandsChart } from '@/components/dashboard/top-brands-chart';
import { PredictiveAnalysis } from '@/components/dashboard/predictive-analysis';
import { Sidebar } from '@/components/sidebar/sidebar';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <MetricsCards />
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <SalesChart />
            </div>
            <div className="flex items-stretch">
              <ExpenseChart />
            </div>
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RecentSales />
            </div>
            <div>
              <TopBrandsChart />
            </div>
          </div>
          <div className="grid gap-4">
            <PredictiveAnalysis />
          </div>
        </main>
      </div>
    </div>
  );
}
