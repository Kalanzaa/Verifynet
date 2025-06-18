// @ts-ignore
import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';

export default function AnalyticsCard() {
  const claimsRef = useRef<HTMLCanvasElement>(null);
  const tipsRef = useRef<HTMLCanvasElement>(null);
  const regionRef = useRef<HTMLCanvasElement>(null);
  const outcomesRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Claims Verified (Bar)
    const claimsChart = new Chart(claimsRef.current!, {
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Verified Claims',
          data: [42, 38, 56, 47, 62, 35, 51],
          backgroundColor: '#2563eb',
          borderRadius: 6,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
      },
    });
    // Tip Submission Trends (Line)
    const tipsChart = new Chart(tipsRef.current!, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Tips Submitted',
          data: [12, 19, 9, 14, 17, 11, 15],
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139,92,246,0.1)',
          tension: 0.4,
          fill: true,
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { x: { grid: { display: false } }, y: { beginAtZero: true } },
      },
    });
    // Regional Data Breakdown (Doughnut)
    const regionChart = new Chart(regionRef.current!, {
      type: 'doughnut',
      data: {
        labels: ['Nairobi', 'Mombasa', 'Kisumu', 'Eldoret'],
        datasets: [{
          label: 'Reports',
          data: [32, 18, 12, 8],
          backgroundColor: ['#2563eb', '#8b5cf6', '#10b981', '#f59e0b'],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });
    // Verification Outcomes (Pie)
    const outcomesChart = new Chart(outcomesRef.current!, {
      type: 'pie',
      data: {
        labels: ['Verified', 'Debunked', 'Pending'],
        datasets: [{
          label: 'Outcomes',
          data: [68, 21, 11],
          backgroundColor: ['#10b981', '#ef4444', '#f59e0b'],
        }],
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      },
    });
    return () => {
      claimsChart.destroy();
      tipsChart.destroy();
      regionChart.destroy();
      outcomesChart.destroy();
    };
  }, []);

  return (
    <div className="card bg-white rounded-2xl shadow p-8 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Verification Analytics</h2>
        <button className="card-action bg-blue-100 text-blue-600 w-9 h-9 rounded-lg flex items-center justify-center"><i className="fas fa-download" /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="font-semibold mb-2">Claims Verified (This Week)</div>
          <div className="h-48"><canvas ref={claimsRef} /></div>
        </div>
        <div>
          <div className="font-semibold mb-2">Tip Submission Trends</div>
          <div className="h-48"><canvas ref={tipsRef} /></div>
        </div>
        <div>
          <div className="font-semibold mb-2">Regional Data Breakdown</div>
          <div className="h-48"><canvas ref={regionRef} /></div>
        </div>
        <div>
          <div className="font-semibold mb-2">Verification Outcomes</div>
          <div className="h-48"><canvas ref={outcomesRef} /></div>
        </div>
      </div>
    </div>
  );
} 