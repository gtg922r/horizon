import React from "react";
import { Map, useControl } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import "mapbox-gl/dist/mapbox-gl.css";
import { GreatCircleLayer } from "deck.gl";
import { ProjectionSpecification } from "mapbox-gl";
import {MapboxOverlay} from '@deck.gl/mapbox';
import {DeckProps} from '@deck.gl/core';

const MAPBOX_ACCESS_TOKEN =
    "pk.eyJ1IjoiZ3RnOTIyciIsImEiOiJjbHk4dWp1b24wazRhMmxweDFwNnhzeTRpIn0.b4fNZIf8_gPKmn-sQrGzcA";
const INITIAL_VIEW_STATE = {
    longitude: -122.0363,
    latitude: 37.3688,
    zoom: 3,
};
const MAP_STYLE = "mapbox://styles/mapbox/dark-v11";
const MAP_PROJECTION = {name: "mercator"} as ProjectionSpecification;

interface DataPoint {
    position: [number, number];
}

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
  overlay.setProps(props);
  return null;
}

const MapComponent: React.FC = () => {
    const layers = [
        new ScatterplotLayer<DataPoint>({
            id: "deckgl-circle",
            data: [{ position: [-122.0363, 37.3688] }],
            getPosition: (d: DataPoint) => d.position,
            getFillColor: [255, 0, 0, 20],
            getLineColor: [255, 0, 0, 100],
            lineWidthMinPixels: 1,
            stroked: true,
            getRadius: 500 * 1609,
            beforeId: "waterway-label",
        }),
    ];

    // /* Reverse Controlled */
    // return (
    //     <DeckGL initialViewState={INITIAL_VIEW_STATE} controller layers={layers}>
    //         <Map
    //             projection={MAP_PROJECTION}
    //             mapStyle={MAP_STYLE}
    //             mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
    //         />
    //     </DeckGL>
    // );

    /* Interleaved or Overlaid */
    return (
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        projection={MAP_PROJECTION}
      >
        <DeckGLOverlay layers={layers} interleaved />
      </Map>
    );    
};

export default MapComponent;
