export function GeoJSONToPolyLine(geojson: Array<Array<Number>>) {
  const paths: google.maps.LatLngLiteral[] = [];
  for (let i = 0; i < geojson.length; i++) {
    paths.push({ lat: geojson[i][1] as any, lng: geojson[i][0] as any });
  }
  return paths;
}
