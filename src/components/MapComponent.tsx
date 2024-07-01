import React, { useRef, useEffect, useState } from "react";
import Globe from 'react-globe.gl';
// import 'leaflet/dist/leaflet.css';
// import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
// import { LatLng, LatLngExpression, LeafletMouseEvent } from 'leaflet';

interface MapComponentProps {
  onGlobeClick?: (coords: { lat: number, lng: number }, event: MouseEvent) => void;
}
 
// Providers at [Leaflet Provider Demo](https://leaflet-extras.github.io/leaflet-providers/preview/)
// const mapURL = "https://tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=isH2v8TDXRrzf0EOEQSjNM10BU6avRsx2Lbx4VBmMXJTa0kQ1D6CxN4kLgZK6fPA"
// 
const MapComponent: React.FC<MapComponentProps> = ({ onGlobeClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Globe
        height={dimensions.height}
        width={dimensions.width}
        globeImageUrl='//unpkg.com/three-globe/example/img/earth-blue-marble.jpg'
        onGlobeClick={onGlobeClick} // Register the callback
      />
    </div>
  );
};

export default MapComponent;
