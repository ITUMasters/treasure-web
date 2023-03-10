import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";
import { Input } from "../ui/Input";

//TODO: There is type error regarding to InfoWindow (I could not solved yet!)
export function MapPage() {
  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });
  const mockData = [
    {
      name: "ITU",
      center: {
        lat: 41.10571,
        lng: 29.02525,
      },
      paths: [
        { lat: 41.10803, lng: 29.02004 },
        { lat: 41.10366, lng: 29.01859 },
        { lat: 41.10182, lng: 29.02939 },
        { lat: 41.10626, lng: 29.03089 },
        { lat: 41.10803, lng: 29.02004 },
      ],
      zoomLevel: 16,
    },
    {
      name: "METU",
      center: {
        lat: 39.89412,
        lng: 32.77717,
      },
      paths: [
        { lat: 39.90137, lng: 32.77605 },
        { lat: 39.89696, lng: 32.79223 },
        { lat: 39.88401, lng: 32.7773 },
        { lat: 39.89185, lng: 32.76871 },
        { lat: 39.90137, lng: 32.77605 },
      ],
      zoomLevel: 15,
    },
  ];
  const [paths, setPaths] = useState([
    { lat: 41.10803, lng: 29.02004 },
    { lat: 41.10366, lng: 29.01859 },
    { lat: 41.10182, lng: 29.02939 },
    { lat: 41.10626, lng: 29.03089 },
    { lat: 41.10803, lng: 29.02004 },
  ]);
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

  const [selectedRegion, setSelectedRegion] = useState("ITU");
  const [zoomLevel, setZoomLevel] = useState(16);
  const navigate = useNavigate();
  const setTreasure = useSetTreasure();
  const treasure = useTreasure();

  const google_maps_api_key = process.env.REACT_APP_GOOGLE_MAPS_KEY ?? "";
  const [InfoWindowOffset, setInfoWindowOffset] = useState(null as any);
  const [infoWindow, setInfoWindow] = useState(null as any);
  const [marker, setMarker] = useState(null as any);
  const [mapInstance, setMapInstace] = useState(null as any);
  const [caption, setCaption] = useState("My Treasure");

  return (
    <div className="flex items-center justify-center flex-col">
      <LoadScript id="script-loader" googleMapsApiKey={google_maps_api_key}>
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
          onCenterChanged={() => {
            setCenter(center);
          }}
        >
          <Polyline path={paths} options={options} />
          <Marker
            onLoad={(e) => setMarker(e)}
            position={markerPos}
            draggable={true}
            onClick={() => {
              if (infoWindow !== null && infoWindow !== undefined) {
                infoWindow.open(mapInstance, marker);
              }
            }}
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
          >
            <InfoWindow
              position={markerPos}
              onLoad={(e) => {
                setInfoWindow(e);
                setInfoWindowOffset(new window.google.maps.Size(0, -5));
              }}
              options={{ pixelOffset: InfoWindowOffset }}
            >
              <div className="w-32 h-8 flex items-center justify-center font-bold">
                <p className="text-black text-center text-l ">{caption}</p>
              </div>
            </InfoWindow>
          </Marker>
        </GoogleMap>
      </LoadScript>
      <div className="absolute bottom-12 w-56">
        <Button
          size="large"
          onClick={() => {
            setTreasure({
              ...treasure,
              coordinate: {
                name: caption,
                lat: markerPos.lat,
                lng: markerPos.lng,
              },
            });
            navigate(PATHS.TREASUREFABRICATION);
          }}
        >
          Submit Treasure Coordinate
        </Button>
      </div>
      <div className="absolute top-24 right-4 w-32">
        {mockData.map((element) => (
          <div className="mt-2" key={element.name}>
            <Button
              size="medium"
              HasFadeColor={selectedRegion !== element.name}
              onClick={() => {
                setSelectedRegion(element.name);
                setCenter(element.center);
                setPaths(element.paths);
                setZoomLevel(element.zoomLevel);
                setMarkerPos(element.center);
                setPrevMarkerPos(element.center);
              }}
            >
              {element.name}
            </Button>
          </div>
        ))}
      </div>
      <div className="w-64 left-4 absolute top-20">
        <Input
          title="Caption"
          value={caption}
          border={true}
          onChange={(e) => setCaption(e.target.value)}
        />
      </div>
    </div>
  );
}
