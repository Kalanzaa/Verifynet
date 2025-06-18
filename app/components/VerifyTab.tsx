'use client';

import { useState } from 'react';

export default function VerifyTab() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState<null | {
    score: number;
    status: 'success' | 'warning' | 'error';
    message: string;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement AI verification logic
    setResult({
      score: 85,
      status: 'success',
      message: 'This claim appears to be accurate based on available sources.',
    });
  };

  return (
    <div className="card">
      <h2>Fact Checker</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
          placeholder="Enter the claim to verify..."
          required
        />
        <button type="submit">Verify Claim</button>
      </form>
      {result && (
        <div className={`result-card ${result.status}`}>
          <h3>Verification Result</h3>
          <p>Credibility Score: {result.score}%</p>
          <p>{result.message}</p>
        </div>
      )}
    </div>
  );
} 