import * as React from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import type { CircleLayer, FillLayer, LineLayer } from "react-map-gl";
import type { FeatureCollection } from "geojson";
import { LayerSpecification, ProjectionSpecification } from "mapbox-gl";
import useCircleGeoJSON from "../hooks/useCircleGeoJSON";
import "mapbox-gl/dist/mapbox-gl.css";
import * as MC from "../components/MapComponentShared";
import { MapComponentProps } from "../components/MapComponentShared";
import { Crosshair, Dot, MapPin } from "@phosphor-icons/react";

const DEFAULT_VIEW_STATE = {
    longitude: -122.0363,
    latitude: 37.3688,
    zoom: 3,
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

const MapComponent: React.FC<MapComponentProps> = ({
    rangeRadius = 800,
    lightDarkMode = "dark",
    projection = "globe",
    rangeCenter = {
        longitude: DEFAULT_VIEW_STATE.longitude,
        latitude: DEFAULT_VIEW_STATE.latitude,
    },
}) => {
    const rangeCircle: FeatureCollection = useCircleGeoJSON({
        center: { longitude: rangeCenter.longitude, latitude: rangeCenter.latitude },
        radius: rangeRadius,
    });

    const mapStyle = lightDarkMode === "light" ? MC.MAP_STYLE_LIGHT : MC.MAP_STYLE_DARK;

    return (
        <Map
            mapboxAccessToken={MC.MAPBOX_ACCESS_TOKEN}
            initialViewState={DEFAULT_VIEW_STATE}
            projection={
                projection === "globe" ? MC.MAP_PROJECTION_GLOBE : MC.MAP_PROJECTION_MERCATOR
            }
            mapStyle={mapStyle}
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
                {/* <div className="text-lg font-medium text-neutral-content pb-10 drop-shadow-[0_1px_2px_rgba(255,255,255,1)]">Sunnyvale</div> */}
                <div className="text-lg font-medium text-neutral-content pb-10 drop-shadow drop-shadow-neutral">Sunnyvale</div>
            </Marker>            
        </Map>
    );
};

export default MapComponent;
