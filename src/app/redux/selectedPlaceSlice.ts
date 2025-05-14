// app/redux/selectedPlaceSlice.ts

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type SelectedPlace = {
  id: string;
  displayName?: string;
  allowsDogs?: boolean;
  nationalPhoneNumber?: string;
  location?: google.maps.LatLng;
  photos?: google.maps.places.Photo[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  regularOpeningHours?: any;
  address?: string;
  url?: string;
} | null;

const initialState: SelectedPlace = null;

const selectedPlaceSlice = createSlice({
  name: 'selectedPlace',
  initialState,
  reducers: {
    setSelectedPlace: (state, action: PayloadAction<SelectedPlace>) =>
      action.payload,
    clearSelectedPlace: () => null,
  },
});

export const { setSelectedPlace, clearSelectedPlace } =
  selectedPlaceSlice.actions;
export const selectedPlaceReducer = selectedPlaceSlice.reducer;
