
type LatLngLiteral = {
  lat: number;
  lng: number;
};
export interface OpeningHours {
  weekdayDescriptions?: string[];
  openNow?: boolean;
  periods?: {
    open: { day: number; hour: number; minute: number };
    close: { day: number; hour: number; minute: number };
  }[];
}

export interface Place {
  id: string;
  displayName?: string;
  allowsDogs?: boolean;
  hasRestroom?: boolean;
  phone?: string;
  location: google.maps.LatLng;
  photos?: string[];
  openingHours: google.maps.places.OpeningHours;
  distance: number;
  address?: string;
  url?: string;
}
