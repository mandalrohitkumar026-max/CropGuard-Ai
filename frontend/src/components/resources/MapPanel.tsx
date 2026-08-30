import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { AgriResource } from '../../types';
import { MapPin, Phone, Navigation } from 'lucide-react';

// Fix default Leaflet marker icons in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

interface MapPanelProps {
  resources: AgriResource[];
  userCoords: { lat: number; lng: number } | null;
  selectedResource: AgriResource | null;
  onSelectResource: (res: AgriResource) => void;
}

export const MapPanel: React.FC<MapPanelProps> = ({
  resources,
  userCoords,
  selectedResource,
  onSelectResource
}) => {
  // Default center (Pune, Maharashtra agri cluster or user coords)
  const defaultLat = userCoords?.lat || 18.5204;
  const defaultLng = userCoords?.lng || 73.8567;

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-slate-200 shadow-inner">
      <MapContainer
        center={[defaultLat, defaultLng]}
        zoom={userCoords ? 10 : 8}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Farm Location Pin */}
        {userCoords && (
          <>
            <Circle
              center={[userCoords.lat, userCoords.lng]}
              radius={5000}
              pathOptions={{ color: '#16a34a', fillColor: '#22c55e', fillOpacity: 0.15 }}
            />
            <Marker position={[userCoords.lat, userCoords.lng]}>
              <Popup>
                <div className="p-1 text-xs">
                  <strong className="text-forest-700">🌱 Your Farm Location</strong>
                  <p className="text-slate-500 text-[10px]">Active GPS Coords</p>
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Resource Markers */}
        {resources.map((res) => (
          <Marker
            key={res.id}
            position={[res.latitude, res.longitude]}
            eventHandlers={{
              click: () => onSelectResource(res)
            }}
          >
            <Popup>
              <div className="p-1 space-y-1.5 text-xs max-w-[220px]">
                <div className="font-bold text-slate-900 leading-tight">{res.name}</div>
                <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded bg-forest-100 text-forest-800">
                  {res.typeName}
                </span>
                <p className="text-[11px] text-slate-600 leading-tight">{res.address}</p>
                {res.distanceKm !== undefined && (
                  <p className="text-[11px] font-semibold text-emerald-700">
                    📍 {res.distanceKm} km away
                  </p>
                )}
                <div className="pt-1 flex items-center gap-2">
                  <a
                    href={`tel:${res.phone}`}
                    className="flex-1 text-center py-1 rounded bg-forest-600 text-white font-bold text-[10px]"
                  >
                    Call
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${res.latitude},${res.longitude}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 text-center py-1 rounded bg-slate-100 text-slate-800 font-bold text-[10px] border border-slate-300"
                  >
                    Maps
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
