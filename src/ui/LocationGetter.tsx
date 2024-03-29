import { useLocationInfo } from "../react-query/hooks";
import {
  useSetTreasure,
  useTreasure,
} from "../recoil-store/treasureStoreHooks";
import { StateSetter } from "./StateSetter";
import { Loader } from "./Loader";

export type LocationGetterProps = { locationId: number; regionName: string };

export function LocationGetter({
  locationId,
  regionName,
}: LocationGetterProps) {
  const locationInfo = useLocationInfo(locationId);
  const setTreasure = useSetTreasure();
  const treasure = useTreasure();
  if (locationInfo.isFetching) {
    return <Loader />;
  }
  const locationInfoReal = locationInfo.locationInfo;
  return (
    <>
      <StateSetter
        setSpecificState={() =>
          setTreasure({
            ...treasure,
            coordinate: {
              regionId: locationInfoReal.regionId,
              lat: locationInfoReal.latitude,
              lng: locationInfoReal.longitude,
              name: treasure.coordinate.name,
            },
          })
        }
      />
    </>
  );
}
