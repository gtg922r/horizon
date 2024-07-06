import { useMemo } from 'react';
import * as turf from '@turf/turf';

interface CircleGeoJSONHook {
  center: {
    longitude: number;
    latitude: number;
  };
  radius: number; // Radius in kilometers
}

const useCircleGeoJSON = ({ center, radius }: CircleGeoJSONHook): GeoJSON.FeatureCollection<GeoJSON.Geometry> => {
  return useMemo(() => {
    const centerPoint = [center.longitude, center.latitude];
    const circle = turf.circle(centerPoint, radius, { units: 'kilometers' });

    return {
      type: 'FeatureCollection',
      features: [circle]
    };
  }, [center, radius]);
};

export default useCircleGeoJSON;
