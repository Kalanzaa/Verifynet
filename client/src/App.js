import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import CrisisMap from './components/crisis/CrisisMap';
import TipSubmission from './components/tips/TipSubmission';
import Verification from './components/verification/Verification';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import History from './components/history/History';
import Analytics from './components/analytics/Analytics';
import Journalists from './components/journalists/Journalists';
import Settings from './components/settings/Settings';
import ProtectedRoute from './components/routing/ProtectedRoute';
import './App.css';
import axios from 'axios';

// Set default axios auth header if token exists
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/crisis-map" element={<CrisisMap />} />

            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/submit-tip" element={
              <ProtectedRoute>
                <TipSubmission />
              </ProtectedRoute>
            } />
            <Route path="/verify" element={
              <ProtectedRoute>
                <Verification />
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/journalists" element={
              <ProtectedRoute>
                <Journalists />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 