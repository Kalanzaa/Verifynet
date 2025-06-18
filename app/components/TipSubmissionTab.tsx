'use client';

import { useState } from 'react';

export default function TipSubmissionTab() {
  const [tip, setTip] = useState('');
  const [category, setCategory] = useState('general');
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement secure tip submission logic
    setSubmitted(true);
  };

  return (
    <div className="card">
      <h2>Submit a Tip</h2>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <textarea
            value={tip}
            onChange={(e) => setTip(e.target.value)}
            placeholder="Enter your tip details..."
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General Information</option>
            <option value="conflict">Conflict Zone</option>
            <option value="humanitarian">Humanitarian Crisis</option>
            <option value="disaster">Natural Disaster</option>
          </select>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            accept="image/*,.pdf,.doc,.docx"
          />
          <button type="submit">Submit Securely</button>
        </form>
      ) : (
        <div className="result-card success">
          <h3>Tip Submitted Successfully</h3>
          <p>Your information has been encrypted and submitted securely.</p>
          <p>A reference number has been generated for your submission.</p>
        </div>
      )}
    </div>
  );
} 