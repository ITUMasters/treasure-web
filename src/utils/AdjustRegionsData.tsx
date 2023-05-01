import { GeneralRegion } from "../react-query/types";

export const AdjustRegionsData = (allRegions: GeneralRegion[]) => {
  let regionArray = [];
  for (let i = 0; i < allRegions.length; i++) {
    const region = allRegions[i];
    const pathArray = [];
    for (let j = 0; j < region.paths.length; j++) {
      const coord = region.paths[j];
      pathArray.push({ lat: coord.latitude, lng: coord.longitude });
    }
    if (pathArray[0] !== pathArray[pathArray.length - 1]) {
      pathArray.push(pathArray[0]);
    }

    regionArray.push({
      name: region.name,
      center: { lat: region.center.latitude, lng: region.center.longitude },
      paths: pathArray,
      zoomLevel: region.zoomLevel,
      regionId: region.id,
    });
  }

  return regionArray;
};
