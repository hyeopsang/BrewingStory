// app/redux/selectedPlaceSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";


  
  type SelectedPlace = {
    id: string;
    displayName?: string;
    allowsDogs?: boolean;
    nationalPhoneNumber?: string;
    location?: google.maps.LatLng;
    photos?: google.maps.places.Photo[]
    regularOpeningHours?: any;
    address?: string;
    url?: string;
  } | null;
  

const initialState: SelectedPlace = null;

const selectedPlaceSlice = createSlice({
  name: "selectedPlace",
  initialState,
  reducers: {
    setSelectedPlace: (state, action: PayloadAction<SelectedPlace>) => action.payload,
    clearSelectedPlace: () => null,
  },
});

export const { setSelectedPlace, clearSelectedPlace } = selectedPlaceSlice.actions;
export default selectedPlaceSlice.reducer;
