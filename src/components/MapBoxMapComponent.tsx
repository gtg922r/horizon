import * as React from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import type { FillLayer, LineLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import useCircleGeoJSON from "../hooks/useCircleGeoJSON";
import "mapbox-gl/dist/mapbox-gl.css";
import * as MC from "../components/MapComponentShared";
import { MapComponentProps } from "../components/MapComponentShared";
import { Dot } from "@phosphor-icons/react";

const DEFAULT_VIEW_STATE = {
    longitude: -122.0363,
    latitude: 37.3688,
    zoom: 3,
};

const fillLayerStyle: FillLayer = {
    id: "range-overlay",
    type: "fill",
    source: "my-data",
    paint: {
        "fill-color": "#ff0000",
        "fill-opacity": 0.05,
    },
};

const strokeLayerStyle: LineLayer = {
    id: "range-outline",
    type: "line",
    source: "my-data",
    paint: {
        "line-color": "#ff0000",
        "line-width": 1,
    },
};

const MapComponent: React.FC<MapComponentProps> = ({
    rangeRadius = 800,
    lightDarkMode = "dark",
    projection = "globe",
    rangeCenter = {
        longitude: DEFAULT_VIEW_STATE.longitude,
        latitude: DEFAULT_VIEW_STATE.latitude,
    },
    onMapClick,
}) => {
    const rangeCircle: FeatureCollection = useCircleGeoJSON({
        center: { longitude: rangeCenter.longitude, latitude: rangeCenter.latitude },
        radius: rangeRadius,
    });

    const mapStyle = lightDarkMode === "light" ? MC.MAP_STYLE_LIGHT : MC.MAP_STYLE_DARK;

    const handleClick = (event: any) => {
        if (onMapClick) {
            onMapClick({
                lat: event.lngLat.lat,
                lng: event.lngLat.lng,
            });
        }
    };

    return (
        <Map
            mapboxAccessToken={MC.MAPBOX_ACCESS_TOKEN}
            initialViewState={DEFAULT_VIEW_STATE}
            projection={
                projection === "globe" ? MC.MAP_PROJECTION_GLOBE : MC.MAP_PROJECTION_MERCATOR
            }
            mapStyle={mapStyle}
            onClick={handleClick}
        >
            <Source id="my-data" type="geojson" data={rangeCircle}>
                <Layer {...fillLayerStyle} />
                <Layer {...strokeLayerStyle} />
            </Source>
            <Marker
                longitude={rangeCenter.longitude}
                latitude={rangeCenter.latitude}
                anchor="center"
            >
                <Dot size={32} weight="fill" color="#cc0000"/>
            </Marker>
            <Marker
                longitude={rangeCenter.longitude}
                latitude={rangeCenter.latitude}
                anchor="center"
            >
                <div className="text-lg font-medium text-neutral-content pb-10 drop-shadow drop-shadow-neutral">Sunnyvale</div>
            </Marker>            
        </Map>
    );
};

export default MapComponent;
