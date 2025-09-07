import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128] },
  { name: "San Francisco", coordinates: [-122.4194, 37.7749] },
  { name: "Sydney", coordinates: [151.2093, -33.8688] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
];

export default function WorldMap() {
  return (
    <div className="w-full h-40">
      <ComposableMap projectionConfig={{ scale: 250 }} className="w-full h-full">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="fill-gray-200 stroke-gray-300 dark:fill-gray-700 dark:stroke-gray-700"
              />
            ))
          }
        </Geographies>

        {markers.map(({ name, coordinates }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle
              r={4}
              className="fill-indigo-500 stroke-white dark:fill-purple-300 dark:stroke-gray-200"
              strokeWidth={1}
            />
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
