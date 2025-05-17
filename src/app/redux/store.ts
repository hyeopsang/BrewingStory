import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';

import { authReducer } from './authSlice';
import { idReducer } from './idSlice';
import { mapReducer } from './mapSlice';
import { placeReducer } from './placesSlice';
import { selectedPlaceReducer } from './selectedPlaceSlice';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['auth', 'reviews', 'marker', 'selectedPlace'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  places: placeReducer,
  map: mapReducer,
  id: idReducer,
  selectedPlace: selectedPlaceReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
