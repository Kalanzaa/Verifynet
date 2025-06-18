import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './History.css';

const History = () => {
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/verification/history');
      setVerificationHistory(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching verification history');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading history...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="history-container">
      <h2>Verification History</h2>
      <div className="history-list">
        {verificationHistory.map(item => (
          <div key={item._id} className="history-card">
            <div className="history-header">
              <h3>{item.title}</h3>
              <span className={`status ${item.status}`}>{item.status}</span>
            </div>
            <p>{item.content}</p>
            <div className="verification-details">
              <p><strong>Verified by:</strong> {item.verifiedBy?.name}</p>
              <p><strong>Verified on:</strong> {new Date(item.verifiedAt).toLocaleDateString()}</p>
            </div>
            {item.verificationNotes && (
              <div className="verification-notes">
                <h4>Verification Notes</h4>
                <p>{item.verificationNotes}</p>
              </div>
            )}
            {item.sources && item.sources.length > 0 && (
              <div className="sources">
                <h4>Sources</h4>
                <ul>
                  {item.sources.map((source, index) => (
                    <li key={index}>
                      <a href={source} target="_blank" rel="noopener noreferrer">
                        {source}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History; 