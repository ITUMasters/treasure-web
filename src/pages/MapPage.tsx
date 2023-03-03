import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { Button } from "../ui/Button";

export function MapPage() {
  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });

  const paths = [
    { lat: 41.10803, lng: 29.02004 },
    { lat: 41.10366, lng: 29.01859 },
    { lat: 41.10182, lng: 29.02939 },
    { lat: 41.10803, lng: 29.02004 },
  ];
  const options = {
    strokeColor: "#9A4FE9",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1,
  };
  const [markerPos, setMarkerPos] = useState({
    lat: 41.10382,
    lng: 29.02041,
  });

  const [prevMarkerPos, setPrevMarkerPos] = useState({
    lat: 41.10382,
    lng: 29.02041,
  });

  return (
    <div className="flex items-center justify-center flex-col">
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyDyvMDj2P2iK5Q43ZwZurzzhvcvLy-wvXs"
      >
        <GoogleMap
          center={center}
          zoom={16}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            position: "absolute",
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
          }}
          onCenterChanged={() => {
            setCenter(center);
          }}
        >
          <Polyline path={paths} options={options} />
          <Marker
            position={markerPos}
            draggable={true}
            onDragStart={(pos) => {
              const coord = pos.latLng;
              if (coord !== null) {
                setPrevMarkerPos({ lat: coord.lat(), lng: coord.lng() });
              }
            }}
            onDragEnd={(pos) => {
              const coord = pos.latLng;
              const polygon = new window.google.maps.Polygon({
                paths: paths,
              });
              if (coord !== null) {
                const isInsideThePolyline =
                  window.google.maps.geometry.poly.containsLocation(
                    coord,
                    polygon
                  );
                if (!isInsideThePolyline) {
                  setMarkerPos(prevMarkerPos);
                } else {
                  setPrevMarkerPos(markerPos);
                  setMarkerPos({ lat: coord.lat(), lng: coord.lng() });
                }
              }
            }}
          />
        </GoogleMap>
      </LoadScript>
      <div className="absolute bottom-12 w-56">
        <Button size="large">Submit Treasure Coordinate</Button>
      </div>
    </div>
  );
}
