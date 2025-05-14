import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface MapState {
  map: google.maps.Map | null;
}

const initialState: MapState = {
  map: null,
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setMap: (state, action: PayloadAction<google.maps.Map>) => {
      state.map = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export const mapReducer = mapSlice.reducer;
