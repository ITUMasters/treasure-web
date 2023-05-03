import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import React, { useState } from "react";
import { Button } from "../ui/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "../consts/paths";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";
import { Input } from "../ui/Input";
import { GeoJSONToPolyLine } from "../utils/GeoJSONToPolyLine";
import { PolyLineCoordinates } from "../consts/PolyLineCoordinates";
import { StateSetter } from "../ui/StateSetter";
import { coordinateType } from "../recoil-store/treasureStore";
import { useRegions } from "../react-query/hooks";
import { Loader } from "../ui/Loader";
import { AdjustRegionsData } from "../utils/AdjustRegionsData";

//TODO: There is type error regarding to InfoWindow (I could not solved yet!)
export function MapPage() {
  const regionsData = useRegions();
  const [center, setCenter] = useState({
    lat: 41.10571,
    lng: 29.02525,
  });
  const ituPath = GeoJSONToPolyLine(PolyLineCoordinates.ITU);
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
  const [selectedRegionId, setSelectedRegionId] = useState(46); //TODO: Suan default itu region idsini donuyorum.
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
  const location = useLocation();
  const isEdit = location.state.isEdit;
  const treasureIdFromRouter = location.state.treasureId;

  if (regionsData.isLoading) {
    return <Loader />;
  }

  const allRegions = regionsData.regions;
  const adjustedRegionData = AdjustRegionsData(allRegions);

  return (
    <div className="flex items-center justify-center flex-col">
      <StateSetter
        setSpecificState={() => {
          if (
            location.state !== null &&
            location.state.locationInfo !== null &&
            location.state.isEdit != null &&
            location.state.isEdit
          ) {
            const coordinate: coordinateType =
              location.state.locationInfo.coordinate;
            setMarkerPos({ lat: coordinate.lat, lng: coordinate.lng });
            setPrevMarkerPos({ lat: coordinate.lat, lng: coordinate.lng });
            setSelectedRegionId(coordinate.regionId);
            setSelectedRegion(location.state.locationInfo.regionName);
            setPaths(
              adjustedRegionData.filter(
                (e) => e.name === location.state.locationInfo.regionName
              )[0].paths
            );
            setCenter(
              adjustedRegionData.filter(
                (e) => e.name === location.state.locationInfo.regionName
              )[0].center
            );
            setZoomLevel(
              adjustedRegionData.filter(
                (e) => e.name === location.state.locationInfo.regionName
              )[0].zoomLevel
            );
          }
        }}
      />
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
              regionName: selectedRegion,
            });
            navigate(isEdit ? PATHS.EDITTREASURE : PATHS.TREASUREFABRICATION, {
              state: { treasureId: treasureIdFromRouter, comingFromMap: true },
            });
          }}
        >
          Submit Treasure Coordinate
        </Button>
      </div>
      <div className="absolute top-24 right-4 w-40">
        {adjustedRegionData.map((element) => (
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
                setSelectedRegionId(element.regionId as number);
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
