import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Verification.css';

const Verification = () => {
  const [claims, setClaims] = useState([]);
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [verificationData, setVerificationData] = useState({
    status: '',
    notes: '',
    sources: ['']
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPendingClaims();
  }, []);

  const fetchPendingClaims = async () => {
    try {
      const response = await axios.get('/api/verification/pending');
      setClaims(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching claims');
      setLoading(false);
    }
  };

  const handleClaimSelect = (claim) => {
    setSelectedClaim(claim);
    setVerificationData({
      status: '',
      notes: '',
      sources: ['']
    });
  };

  const handleSourceChange = (index, value) => {
    const newSources = [...verificationData.sources];
    newSources[index] = value;
    setVerificationData({ ...verificationData, sources: newSources });
  };

  const addSource = () => {
    setVerificationData({
      ...verificationData,
      sources: [...verificationData.sources, '']
    });
  };

  const removeSource = (index) => {
    const newSources = verificationData.sources.filter((_, i) => i !== index);
    setVerificationData({ ...verificationData, sources: newSources });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedClaim) return;

    try {
      await axios.post(`/api/verification/${selectedClaim._id}`, {
        ...verificationData,
        sources: verificationData.sources.filter(source => source.trim() !== '')
      });

      // Refresh claims list
      fetchPendingClaims();
      setSelectedClaim(null);
      setVerificationData({
        status: '',
        notes: '',
        sources: ['']
      });
    } catch (err) {
      setError('Error submitting verification');
    }
  };

  if (loading) return <div className="loading">Loading claims...</div>;

  return (
    <div className="verification-container">
      <div className="claims-list">
        <h2>Pending Claims</h2>
        {claims.length === 0 ? (
          <p className="no-claims">No pending claims to verify</p>
        ) : (
          claims.map(claim => (
            <div
              key={claim._id}
              className={`claim-card ${selectedClaim?._id === claim._id ? 'selected' : ''}`}
              onClick={() => handleClaimSelect(claim)}
            >
              <h3>{claim.title}</h3>
              <p>{claim.content.substring(0, 100)}...</p>
              <div className="claim-meta">
                <span>Submitted: {new Date(claim.createdAt).toLocaleDateString()}</span>
                <span>Location: {claim.location.coordinates.join(', ')}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedClaim && (
        <div className="verification-form">
          <h2>Verify Claim</h2>
          <div className="selected-claim-details">
            <h3>{selectedClaim.title}</h3>
            <p>{selectedClaim.content}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Verification Status</label>
              <select
                value={verificationData.status}
                onChange={(e) => setVerificationData({
                  ...verificationData,
                  status: e.target.value
                })}
                required
              >
                <option value="">Select Status</option>
                <option value="verified">Verified</option>
                <option value="false">False</option>
                <option value="partially_true">Partially True</option>
                <option value="unverifiable">Unverifiable</option>
              </select>
            </div>

            <div className="form-group">
              <label>Verification Notes</label>
              <textarea
                value={verificationData.notes}
                onChange={(e) => setVerificationData({
                  ...verificationData,
                  notes: e.target.value
                })}
                required
                placeholder="Provide detailed notes about your verification process..."
                rows="4"
              />
            </div>

            <div className="form-group">
              <label>Sources</label>
              {verificationData.sources.map((source, index) => (
                <div key={index} className="source-input">
                  <input
                    type="url"
                    value={source}
                    onChange={(e) => handleSourceChange(index, e.target.value)}
                    placeholder="Enter source URL"
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-source"
                      onClick={() => removeSource(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button type="button" className="add-source" onClick={addSource}>
                Add Source
              </button>
            </div>

            <button type="submit" className="submit-verification">
              Submit Verification
            </button>
          </form>
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Verification; 