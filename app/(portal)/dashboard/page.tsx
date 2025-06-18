import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import StatsGrid from '../../components/StatsGrid';
import FactCheckerCard from '../../components/FactCheckerCard';
import AnalyticsCard from '../../components/AnalyticsCard';
import Link from 'next/link';

function Placeholder({ title }: { title: string }) {
  return (
    <div className="card bg-white rounded-2xl shadow p-8 mb-6 flex flex-col items-center justify-center min-h-[200px] text-gray-400">
      <i className="fas fa-tools text-3xl mb-2" />
      <div className="font-bold text-lg mb-1">{title}</div>
      <div>Coming soon...</div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-10">
        <Header title="Fact Verification Dashboard" />
        <StatsGrid />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <FactCheckerCard />
            <AnalyticsCard />
            <Placeholder title="Crisis Map" />
          </div>
          <div className="flex flex-col gap-8">
            <Placeholder title="History" />
            <Placeholder title="Journalists" />
            <Placeholder title="Settings" />
          </div>
        </div>
      </main>
    </div>
  );
} 