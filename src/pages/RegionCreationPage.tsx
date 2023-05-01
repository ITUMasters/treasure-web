import {
  LoadScript,
  GoogleMap,
  DrawingManager,
  Marker,
} from "@react-google-maps/api";
import React, { useEffect, useState, useMemo } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useRegionCreationMutation } from "../react-query/hooks";
import { formatError } from "../utils/formatError";
import { useNotify } from "../hooks/useNotify";
import { GeneralRegion } from "../react-query/types";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";

export function RegionCreationPage() {
  const [zoomLevel, setZoomLevel] = useState(15);
  const [mapInstance, setMapInstace] = useState(null as any);
  const [regionName, setRegionName] = useState("");

  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });

  const [libraries] = useState(["drawing"] as any);
  const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_KEY ?? "";
  const onLoad = (drawingManager: google.maps.drawing.DrawingManager) => {};
  const [lastPolygon, setLastPolygon] = useState<google.maps.Polygon>();
  const [isMarkerPlaced, setIsMarkerPlaced] = useState(false);

  const [markerCoords, setMarkerCoords] = useState({ lat: 0, lng: 0 });

  const onPolygonComplete = (polygon: google.maps.Polygon) => {
    const vertices = polygon.getPath();
    //polygon.setEditable(true);
    polygon.addListener("click", (e: google.maps.MapMouseEvent) => {
      if (e.latLng !== null) {
        setMarkerCoords({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        setIsMarkerPlaced(true);
      }
    });

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
      setIsMarkerPlaced(false);
    }
  };
  const notify = useNotify();
  const navigate = useNavigate();
  const RegionCreationMutation = useRegionCreationMutation({
    onSuccess: (res) => {
      console.log("Success");
      navigate(PATHS.MAINPAGE);
      notify.success("Region is created!");
    },
    onError: (error) => {
      const err = formatError(error);
      if (err) {
        notify.error(err);
      }
    },
  });

  const createRegion = (regionData: GeneralRegion) => {
    RegionCreationMutation.mutate(regionData);
  };

  const submitRegion = () => {
    if (lastPolygon !== undefined) {
      const vertices = lastPolygon.getPath();
      let paths = [];
      for (let i = 0; i < vertices.getLength(); i++) {
        const xy = vertices.getAt(i);
        paths.push({ latitude: xy.lat(), longitude: xy.lng() });
      }

      const regionData = {
        name: regionName,
        paths: paths,
        center: { latitude: markerCoords.lat, longitude: markerCoords.lng },
        zoomLevel: zoomLevel,
      };

      createRegion(regionData);
    }
  };

  const isButtonDisabled = useMemo(() => {
    const c1 = lastPolygon === undefined;
    const c2 = !isMarkerPlaced;
    const c3 = regionName.trim() === "" || regionName[0] === " ";
    return c1 || c2 || c3;
  }, [lastPolygon, isMarkerPlaced, regionName]);

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
          onZoomChanged={() => {
            if (mapInstance !== null && mapInstance !== undefined) {
              setZoomLevel(mapInstance.getZoom());
            }
          }}
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
                polygonOptions: {
                  fillColor: "#E5E542",
                  strokeColor: "#9329CC",
                },
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
          {lastPolygon !== undefined && isMarkerPlaced && (
            <Marker position={markerCoords} />
          )}
        </GoogleMap>
      </LoadScript>
      {lastPolygon !== undefined && (
        <div className="absolute top-20 right-2">
          <AiFillDelete
            fill="#5B3DF6"
            className="w-10 h-10"
            onClick={removePolygon}
          />
        </div>
      )}
      <div className="absolute top-20 left-4 w-56 rounded-lg border-2 border-lightPurple">
        <Input
          title="Region Name"
          value={regionName}
          onChange={(e) => {
            setRegionName(e.target.value);
          }}
        />
      </div>
      <div className="absolute bottom-12 w-40">
        <Button
          size="large"
          onClick={submitRegion}
          disabled={isButtonDisabled}
          HasFadeColor={isButtonDisabled}
        >
          Submit Region
        </Button>
      </div>
    </div>
  );
}
