import React, { useRef, useEffect, useState, useMemo } from "react";
import Globe, { GlobeMethods } from "react-globe.gl";

interface MapComponentProps {
  onGlobeClick?: (coords: { lat: number; lng: number }, event: MouseEvent) => void;
  markerCoords?: { lat: number; lng: number };
  rangeInMiles?: number; // New prop for range in miles
}

const MapComponent: React.FC<MapComponentProps> = ({ onGlobeClick, markerCoords, rangeInMiles }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [rangeData, setRangeData] = useState<any[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView(
        {
          lat: markerCoords?.lat,
          lng: markerCoords?.lng,
          altitude: 2.5,
        },
        600
      );
    }
  }, [markerCoords, globeRef]);

  const markerSvg = `<svg viewBox="-4 0 36 36">
    <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
    <circle fill="black" cx="14" cy="14" r="7"></circle>
  </svg>`;

  const markerData = markerCoords
    ? [
        {
          lat: markerCoords.lat,
          lng: markerCoords.lng,
        },
      ]
    : [];

  // Generate random paths
  const N_PATHS = 10;
  const MAX_POINTS_PER_LINE = 10000;
  const MAX_STEP_DEG = 1;
  const MAX_STEP_ALT = 0.015;    
  const rangeData3 = useMemo(() => [...Array(N_PATHS).keys()].map(() => {
      let lat = (Math.random() - 0.5) * 90;
      let lng = (Math.random() - 0.5) * 360;
      let alt = 0;

      return [[lat, lng, alt], ...[...Array(Math.round(Math.random() * MAX_POINTS_PER_LINE)).keys()].map(() => {
        lat += (Math.random() * 2 - 1) * MAX_STEP_DEG;
        lng += (Math.random() * 2 - 1) * MAX_STEP_DEG;
        alt += (Math.random() * 2 - 1) * MAX_STEP_ALT;
        alt = Math.max(0, alt);

        return [lat, lng, alt];
      })];    
  }), []);

// const rangeData = [[
//     [45.0249, -131.6194, 0],
//     [45.0249, -113.2194, 0],
//     [30.5249, -131.6194, 0],
//     [30.5249, -113.2194, 0]
// ]];

const markerToRangePath = ({ lat, lng, range, altitude = 0 }: { lat: number, lng: number, range: number, altitude?: number }) => {
    const numPoints = 50; // Number of points to generate for the circle
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const rangeInKm = range * 1.60934; // Convert miles to kilometers
  
    const circlePoints = [];
    for (let i = 0; i < numPoints; i++) {
      const bearing = (i / numPoints) * 2 * Math.PI;
      
      // Use the Haversine formula to calculate the new point
      const latRad = lat * (Math.PI / 180);
      const lngRad = lng * (Math.PI / 180);
      const angularDistance = rangeInKm / earthRadius;
  
      const newLatRad = Math.asin(
        Math.sin(latRad) * Math.cos(angularDistance) +
        Math.cos(latRad) * Math.sin(angularDistance) * Math.cos(bearing)
      );
  
      const newLngRad = lngRad + Math.atan2(
        Math.sin(bearing) * Math.sin(angularDistance) * Math.cos(latRad),
        Math.cos(angularDistance) - Math.sin(latRad) * Math.sin(newLatRad)
      );
  
      const newLat = newLatRad * (180 / Math.PI);
      const newLng = newLngRad * (180 / Math.PI);
  
      circlePoints.push([newLat, newLng, altitude]);
    }
  
    return circlePoints;
  };

useEffect(() => {
  if (markerCoords && rangeInMiles) {
    setRangeData([markerToRangePath({ lat: markerCoords.lat, lng: markerCoords.lng, range: rangeInMiles })]);
  }
}, [markerCoords, rangeInMiles]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <Globe
        ref={globeRef}
        height={dimensions.height}
        width={dimensions.width}
        // backgroundColor="#f2f2f2"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        // globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        onGlobeClick={onGlobeClick} // Register the callback
        htmlElementsData={markerData}
        htmlElement={(d) => {
          const el = document.createElement("div");
          el.innerHTML = markerSvg;
          el.style.color = "red";
          el.style.width = `20px`;

          el.style["pointer-events"] = "auto";
          el.style.cursor = "pointer";
          el.onclick = () => console.info(d);
          return el;
        }}
        pathsData={rangeData}
        pathColor={() => ['red', 'red']}
        pathDashLength={1}
        pointsTransitionDuration={0}
      />
    </div>
  );
};

export default MapComponent;
