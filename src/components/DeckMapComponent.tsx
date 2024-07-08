import React from "react";
import { Map, useControl} from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, GeoJsonLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";
import { GreatCircleLayer, _GlobeView as GlobeView } from "deck.gl";
import { ProjectionSpecification } from "mapbox-gl";
import {MapboxOverlay} from '@deck.gl/mapbox';
import {DeckProps} from '@deck.gl/core';
import useCircleGeoJSON from "../hooks/useCircleGeoJSON";

const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ3RnOTIyciIsImEiOiJjbHk4dWp1b24wazRhMmxweDFwNnhzeTRpIn0.b4fNZIf8_gPKmn-sQrGzcA";
const INITIAL_VIEW_STATE = {
    longitude: -122.0363,
    latitude: 37.3688,
    zoom: 3,
};
const MAP_STYLE_LIGHT = "mapbox://styles/mapbox/streets-v11";
const MAP_STYLE_DARK = "mapbox://styles/mapbox/dark-v11";
const MAP_PROJECTION = {name: "mercator"} as ProjectionSpecification;

interface DataPoint {
    position: [number, number];
}

export interface MapComponentProps {
  rangeRadius: number;
  lightDarkMode: "light" | "dark";
  projection: "globe" | "mercator";
}

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const MapComponent: React.FC<MapComponentProps> = ({
    rangeRadius,
    lightDarkMode,
    projection   
}) => {

    const rangeCircle = useCircleGeoJSON({
        center: { longitude: -122.0363, latitude: 37.3688 },
        radius: rangeRadius,
    });

    const layers = [
        // new ScatterplotLayer<DataPoint>({
        //     id: "deckgl-circle",
        //     data: [{ position: [-122.0363, 37.3688] }],
        //     getPosition: (d: DataPoint) => d.position,
        //     getFillColor: [255, 0, 0, 20],
        //     getLineColor: [255, 0, 0, 100],
        //     lineWidthMinPixels: 1,
        //     stroked: true,
        //     getRadius: rangeRadius * 1000,
        //     beforeId: "waterway-label",
        // }),
        new GeoJsonLayer({
            id: "geojson-layer",
            data: rangeCircle,
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            getLineColor: [255, 0, 0],
            getFillColor: [255, 0, 0, 20],
            getLineWidth: 1,
            // wrapLongitude: true,
        }),
    ];

    const mapProjectionSpec = {name: projection} as ProjectionSpecification

    // /* Reverse Controlled */
    // return (
    //     <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
    //       {/* <GlobeView id="map" controller > */}
    //         <Map
    //             projection={MAP_PROJECTION}
    //             mapStyle={lightDarkMode === "light" ? MAP_STYLE_LIGHT : MAP_STYLE_DARK}
    //             mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    //         />
    //       {/* </GlobeView>             */}
    //     </DeckGL>
    // );

    /* Interleaved or Overlaid */
    return (
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={lightDarkMode === "light" ? MAP_STYLE_LIGHT : MAP_STYLE_DARK}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        projection={mapProjectionSpec}
      >
        <DeckGLOverlay layers={layers} interleaved />
      </Map>
    );    
};

export default MapComponent;
