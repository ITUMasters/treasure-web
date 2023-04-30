import { LoadScript, GoogleMap, DrawingManager } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";

export function RegionCreationPage() {
  const [zoomLevel, setZoomLevel] = useState(15);
  const [mapInstance, setMapInstace] = useState(null as any);
  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });

  const [libraries] = useState(["drawing"] as any);
  const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_KEY ?? "";
  const onLoad = (drawingManager: google.maps.drawing.DrawingManager) => {};
  const [lastPolygon, setLastPolygon] = useState<google.maps.Polygon>();

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const vertices = polygon.getPath();
    polygon.setEditable(true);

    const area = google.maps.geometry.spherical.computeArea(polygon.getPath());
    if (area >= 50) {
      setLastPolygon(polygon);
      for (let i = 0; i < vertices.getLength(); i++) {
        const xy = vertices.getAt(i);
        console.log(xy.lat(), " ", xy.lng());
      }
    } else {
      polygon.setMap(null);
    }
  };

  const removePolygon = () => {
    if (lastPolygon !== undefined) {
      lastPolygon.setMap(null);
      setLastPolygon(undefined);
    }
  };

  useEffect(() => {
    if (lastPolygon !== undefined) {
      google.maps.event.addListener(lastPolygon.getPath(), "set_at", () => {
        const newArea = google.maps.geometry.spherical.computeArea(
          lastPolygon.getPath()
        );
        if (newArea < 50 && lastPolygon !== undefined) {
          lastPolygon.setMap(null);
          setLastPolygon(undefined);
        }
      });
    }
  }, [lastPolygon]);

  return (
    <div className="flex items-center justify-center flex-col">
      <LoadScript
        id="script-loader"
        googleMapsApiKey={google_maps_api_key}
        libraries={libraries}
      >
        <GoogleMap
          onLoad={(e) => {
            setMapInstace(e);
          }}
          center={center}
          zoom={zoomLevel}
          mapContainerStyle={{
            width: "100%",
            height: "100%",
            position: "absolute",
            margin: 0,
            padding: 0,
            top: 0,
            left: 0,
          }}
        >
          {lastPolygon === undefined && (
            <DrawingManager
              options={{
                drawingControlOptions: {
                  drawingModes: new Array(
                    "polygon" as google.maps.drawing.OverlayType
                  ),
                },
              }}
              onLoad={onLoad}
              onPolygonComplete={onPolygonComplete}
            />
          )}
        </GoogleMap>
      </LoadScript>
      {lastPolygon !== undefined && (
        <div className="absolute top-20 right-1">
          <AiFillDelete
            fill="#5B3DF6"
            className="w-12 h-12"
            onClick={removePolygon}
          />
        </div>
      )}
    </div>
  );
}
