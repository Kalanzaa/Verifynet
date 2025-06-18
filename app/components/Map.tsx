'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with Next.js
const icon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  filters: {
    conflict: boolean;
    humanitarian: boolean;
    disaster: boolean;
  };
}

export default function Map({ filters }: MapProps) {
  const mapRef = useRef<L.Map>(null);

  // Mock data for crisis events
  const events = [
    {
      id: 1,
      type: 'conflict',
      lat: 33.3152,
      lng: 44.3661,
      title: 'Baghdad Security Incident',
      description: 'Multiple explosions reported in central district',
    },
    {
      id: 2,
      type: 'humanitarian',
      lat: 15.5527,
      lng: 48.5164,
      title: 'Yemen Refugee Camp',
      description: 'Humanitarian aid distribution ongoing',
    },
    {
      id: 3,
      type: 'disaster',
      lat: 35.6762,
      lng: 139.6503,
      title: 'Tokyo Earthquake',
      description: 'Magnitude 6.2 earthquake reported',
    },
  ];

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  const filteredEvents = events.filter((event) => filters[event.type as keyof typeof filters]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredEvents.map((event) => (
        <Marker
          key={event.id}
          position={[event.lat, event.lng]}
          icon={icon}
        >
          <Popup>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
} 