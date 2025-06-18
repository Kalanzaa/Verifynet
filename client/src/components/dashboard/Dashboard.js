import React, { useState, useEffect } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalTips: 0,
    verifiedClaims: 0,
    pendingVerification: 0,
    activeRegions: 0
  });

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats');
        setStats(response.data.stats);
        setChartData(response.data.chartData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tips</h3>
          <p>{stats.totalTips}</p>
        </div>
        <div className="stat-card">
          <h3>Verified Claims</h3>
          <p>{stats.verifiedClaims}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Verification</h3>
          <p>{stats.pendingVerification}</p>
        </div>
        <div className="stat-card">
          <h3>Active Regions</h3>
          <p>{stats.activeRegions}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart">
          <h3>Verification Trends</h3>
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </div>
        <div className="chart">
          <h3>Regional Distribution</h3>
          <Doughnut
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 