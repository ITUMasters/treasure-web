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
import { GeoJSONToPolyLine } from "../utils/GeoJSONToPolyLine";
import { PolyLineCoordinates } from "../consts/PolyLineCoordinates";

//TODO: There is type error regarding to InfoWindow (I could not solved yet!)
export function MapPage() {
  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });
  const ituPath = GeoJSONToPolyLine(PolyLineCoordinates.ITU);
  const metuPath = GeoJSONToPolyLine(PolyLineCoordinates.METU);
  const tobbPath = GeoJSONToPolyLine(PolyLineCoordinates.TOBB);
  const bilkentPath = GeoJSONToPolyLine(PolyLineCoordinates.Bilkent);

  const mockData = [
    {
      name: "ITU",
      center: {
        lat: 41.10571,
        lng: 29.02525,
      },
      paths: ituPath,
      zoomLevel: 15,
      regionId: 7,
    },
    {
      name: "METU",
      center: {
        lat: 39.88252,
        lng: 32.77875,
      },
      paths: metuPath,
      zoomLevel: 13,
      regionId: 25,
    },
    {
      name: "TOBB",
      center: {
        lat: 39.92133,
        lng: 32.7983,
      },
      paths: tobbPath,
      zoomLevel: 16,
      regionId: -1,
    },
    {
      name: "Bilkent",
      center: {
        lat: 39.86539,
        lng: 32.7443,
      },
      paths: bilkentPath,
      zoomLevel: 14,
      regionId: -1,
    },
  ];
  const [paths, setPaths] = useState(ituPath);
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
  const [selectedRegionId, setSelectedRegionId] = useState(7); //TODO: Suan default itu region idsini donuyorum.
  const [zoomLevel, setZoomLevel] = useState(15);
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
                regionId: selectedRegionId,
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
                console.log(element.regionId);
                setSelectedRegionId(element.regionId);
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
