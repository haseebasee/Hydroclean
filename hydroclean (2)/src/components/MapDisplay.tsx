import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { AlertTriangle } from 'lucide-react';

// Fix for default marker icon in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapDisplayProps {
  location: { lat: number; lng: number } | null;
  intensity?: 'Low' | 'Medium' | 'High';
}

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  map.setView(center, 13);
  return null;
}

export const MapDisplay: React.FC<MapDisplayProps> = ({ location, intensity }) => {
  const defaultCenter: [number, number] = [0, 0];
  const center: [number, number] = location ? [location.lat, location.lng] : defaultCenter;

  const isHighIntensity = intensity === 'High';

  return (
    <div className="w-full h-[400px] rounded-3xl overflow-hidden border border-white/10 relative">
      <MapContainer center={center} zoom={location ? 13 : 2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {location && (
          <>
            <ChangeView center={center} />
            <Marker position={center}>
              <Popup>
                <div className="p-2">
                  <h4 className="font-bold text-lg mb-1">Pollution Report</h4>
                  <p className="text-sm opacity-80">Intensity: <span className={intensity === 'High' ? 'text-red-400 font-bold' : ''}>{intensity || 'Unknown'}</span></p>
                </div>
              </Popup>
            </Marker>
          </>
        )}
      </MapContainer>

      {isHighIntensity && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-500/90 backdrop-blur-md text-white px-6 py-3 rounded-full flex items-center gap-3 shadow-2xl animate-pulse">
          <AlertTriangle size={20} />
          <span className="font-bold tracking-wide uppercase text-sm">High Intensity Alert</span>
        </div>
      )}
    </div>
  );
};
