// markerManager.ts

let markers: google.maps.marker.AdvancedMarkerElement[] = [];

export const MarkerManager = {
  clearMarkers: () => {
    markers.forEach(marker => marker.map = null);
    markers = [];
  },
  addMarker: (
  marker: google.maps.marker.AdvancedMarkerElement,
  onClick?: () => void
) => {
  if (onClick) {
    marker.addListener("gmp-click", onClick);
  }
  markers.push(marker);
},

  getMarkers: () => markers,
};
