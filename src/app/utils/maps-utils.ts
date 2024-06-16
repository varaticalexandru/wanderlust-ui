import { Location } from 'src/app/models/itinerary.model';

export function convertToLatLngLiteral(
  location: Location
): google.maps.LatLngLiteral {
  return {
    lat: location.latitude,
    lng: location.longitude,
  };
}

export function getBounds(
  markers: Array<google.maps.LatLngLiteral>
): google.maps.LatLngBoundsLiteral {
  if (markers.length === 0) {
    // throw new Error("Cannot calculate bounds of an empty array");
    return { north: 0, south: 0, east: 0, west: 0 };
  }

  let north = markers[0].lat;
  let south = markers[0].lat;
  let east = markers[0].lng;
  let west = markers[0].lng;

  for (const marker of markers) {
    north = north = Math.max(north, marker.lat);
    south = south = Math.min(south, marker.lat);
    east = east = Math.max(east, marker.lng);
    west = west = Math.min(west, marker.lng);
  }

  const bounds = {
    north: north,
    south: south,
    east: east,
    west: west,
  };

  return bounds;
}
