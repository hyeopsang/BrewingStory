type LatLngLiteral = {
  lat: number;
  lng: number;
};

export interface Place {
  id: string;
  displayName?: string;
  location?: LatLngLiteral;
  allowsDogs?: boolean;
  hasRestroom?: boolean;
  nationalPhoneNumber?: string;
  photoUrl?: string | null;
  openingHours?: string[] | null;
  distance: number;
}
