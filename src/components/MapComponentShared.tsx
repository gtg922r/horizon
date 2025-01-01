import { Projection } from "react-map-gl";

export const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ3RnOTIyciIsImEiOiJjbHk4dWp1b24wazRhMmxweDFwNnhzeTRpIn0.b4fNZIf8_gPKmn-sQrGzcA";

export const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/streets-v11";
export const MAP_STYLE_DARK = "mapbox://styles/mapbox/dark-v11";
export const MAP_PROJECTION_GLOBE = { name: "globe" } as Projection;
export const MAP_PROJECTION_MERCATOR = { name: "mercator" } as Projection;

export interface MapComponentProps {
    rangeCenter: { longitude: number; latitude: number };
    rangeRadius: number;
    lightDarkMode: "light" | "dark";
    projection: "globe" | "mercator";
    onMapClick?: (coords: { lat: number; lng: number }) => void;
}
