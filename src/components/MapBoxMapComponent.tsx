import * as React from "react";
import Map, { Source, Layer } from "react-map-gl";
import type { CircleLayer, FillLayer, Projection, LineLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import { LayerSpecification, ProjectionSpecification } from "mapbox-gl";
import useCircleGeoJSON from "../hooks/useCircleGeoJSON";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ3RnOTIyciIsImEiOiJjbHk4dWp1b24wazRhMmxweDFwNnhzeTRpIn0.b4fNZIf8_gPKmn-sQrGzcA";
const DEFAULT_VIEW_STATE = {
    longitude: -122.0363,
    latitude: 37.3688,
    zoom: 3,
};
const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/streets-v11";
const MAP_STYLE_DARK = "mapbox://styles/mapbox/dark-v11";
const MAP_PROJECTION_GLOBE = { name: "globe" } as Projection;
const MAP_PROJECTION_MERCATOR = { name: "mercator" } as Projection;

const sanFranciscoSquare: GeoJSON.FeatureCollection = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            geometry: {
                type: "Polygon",
                coordinates: [
                    [
                        [-128.0, 27.6], // Southwest corner
                        [-128.0, 48.0], // Northwest corner
                        [-122.3, 48.0], // Northeast corner
                        [-122.3, 27.6], // Southeast corner
                        [-128.0, 27.6], // Closing the polygon
                    ],
                ],
            },
            properties: {
                name: "San Francisco Encompassing Square",
            },
        },
    ],
};

const fillLayerStyle: FillLayer = {
    id: "range-overlay",
    type: "fill",
    paint: {
        "fill-color": "#ff0000",
        "fill-opacity": 0.05,
    },
};

const strokeLayerStyle: LineLayer = {
    id: "range-outline",
    type: "line",
    paint: {
        "line-color": "#ff0000",
        "line-width": 1,
    },
};

export interface MapComponentProps {
    rangeRadius: number;
    lightDarkMode: "light" | "dark";
    projection: "globe" | "mercator";
}

const MapComponent: React.FC<MapComponentProps> = ({ rangeRadius = 800, lightDarkMode = "dark", projection = "globe" }) => {
    const rangeCenter = {
        longitude: DEFAULT_VIEW_STATE.longitude,
        latitude: DEFAULT_VIEW_STATE.latitude,
    };
    const rangeCircle: FeatureCollection = useCircleGeoJSON({
        center: { longitude: rangeCenter.longitude, latitude: rangeCenter.latitude },
        radius: rangeRadius,
    });

    const mapStyle = lightDarkMode === "light" ? MAP_STYLE_LIGHT : MAP_STYLE_DARK;

    return (
        <Map
            mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
            initialViewState={DEFAULT_VIEW_STATE}
            projection={projection === "globe" ? MAP_PROJECTION_GLOBE : MAP_PROJECTION_MERCATOR}
            mapStyle={mapStyle}
        >
            <Source id="my-data" type="geojson" data={rangeCircle}>
                <Layer {...fillLayerStyle} />
                <Layer {...strokeLayerStyle} />
            </Source>
        </Map>
    );
};

export default MapComponent;
