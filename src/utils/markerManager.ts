// markerManager.ts

type ManagedMarker = {
  id: string;
  marker: google.maps.marker.AdvancedMarkerElement;
};

let markers: ManagedMarker[] = [];

export const MarkerManager = {
  clearMarkers: () => {
    markers.forEach(({ marker }) => (marker.map = null));
    markers = [];
  },

  addMarker: (id: string, marker: google.maps.marker.AdvancedMarkerElement) => {
    const exists = markers.find((m) => m.id === id);
    if (exists) return;

    markers.push({ id, marker });
  },

  getMarkers: () => markers.map((entry) => entry.marker),
};
