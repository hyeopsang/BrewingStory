import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Place } from 'src/types/map';

const placesSlice = createSlice({
  name: 'places',
  initialState: [] as Place[], // 초기 상태를 빈 배열로 설정
  reducers: {
    setPlaces: (state, action: PayloadAction<Place[]>) => {
      return action.payload;
    },
  },
});

export const { setPlaces } = placesSlice.actions;
export const placeReducer = placesSlice.reducer;
