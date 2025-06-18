import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TipSubmission.css';

const TipSubmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: {
      latitude: '',
      longitude: ''
    },
    attachments: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const locationField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        location: {
          ...prev.location,
          [locationField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: files
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Handle file uploads first
      const attachmentUrls = [];
      if (formData.attachments.length > 0) {
        for (const file of formData.attachments) {
          const formData = new FormData();
          formData.append('file', file);
          const uploadRes = await axios.post('/api/upload', formData);
          attachmentUrls.push(uploadRes.data.url);
        }
      }

      // Submit the tip with attachment URLs
      const response = await axios.post('/api/crisis/incidents', {
        ...formData,
        attachments: attachmentUrls
      });

      setMessage('Tip submitted successfully!');
      setTimeout(() => {
        navigate('/crisis-map');
      }, 2000);
    } catch (error) {
      console.error('Error submitting tip:', error);
      setMessage('Error submitting tip. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tip-submission">
      <h2>Submit a Tip</h2>
      
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            placeholder="Brief title describing the incident"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Detailed description of the incident"
            rows="5"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="latitude">Latitude</label>
            <input
              type="number"
              id="latitude"
              name="location.latitude"
              value={formData.location.latitude}
              onChange={handleInputChange}
              required
              step="any"
              placeholder="e.g., 51.5074"
            />
          </div>

          <div className="form-group">
            <label htmlFor="longitude">Longitude</label>
            <input
              type="number"
              id="longitude"
              name="location.longitude"
              value={formData.location.longitude}
              onChange={handleInputChange}
              required
              step="any"
              placeholder="e.g., -0.1278"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="attachments">Attachments</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleFileChange}
            multiple
            accept="image/*,.pdf,.doc,.docx"
          />
          <small>Supported files: Images, PDF, DOC (Max 5 files)</small>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Tip'}
        </button>
      </form>
    </div>
  );
};

export default TipSubmission; 