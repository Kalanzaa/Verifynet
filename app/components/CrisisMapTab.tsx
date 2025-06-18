'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('./Map'), {
  ssr: false,
  loading: () => <div className="map-card">Loading map...</div>,
});

export default function CrisisMapTab() {
  const [filters, setFilters] = useState({
    conflict: true,
    humanitarian: true,
    disaster: true,
  });

  const toggleFilter = (filter: keyof typeof filters) => {
    setFilters((prev) => ({
      ...prev,
      [filter]: !prev[filter],
    }));
  };

  return (
    <div className="card">
      <h2>Crisis Map</h2>
      <div className="map-filters">
        <label>
          <input
            type="checkbox"
            checked={filters.conflict}
            onChange={() => toggleFilter('conflict')}
          />
          Conflict Zones
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.humanitarian}
            onChange={() => toggleFilter('humanitarian')}
          />
          Humanitarian Crises
        </label>
        <label>
          <input
            type="checkbox"
            checked={filters.disaster}
            onChange={() => toggleFilter('disaster')}
          />
          Natural Disasters
        </label>
      </div>
      <div className="map-card">
        <Map filters={filters} />
      </div>
    </div>
  );
} 