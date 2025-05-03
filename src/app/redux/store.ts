import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

import mapReducer from "./mapSlice"; 
import authReducer from "./authSlice";
import placesReducer from "./placesSlice";
import idReducer from "./idSlice";
import selectedPlaceReducer from "./selectedPlaceSlice"; 

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["auth", "reviews", "marker"]
};

const rootReducer = combineReducers({
  auth: authReducer,
  places: placesReducer,
  map: mapReducer,
  id: idReducer,
  selectedPlace: selectedPlaceReducer
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
