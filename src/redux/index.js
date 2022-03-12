import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/userSlice";
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"],
};

const allReducers = combineReducers({
  user: userReducer,
});

// adding persistReducer to the store
const persistedReducer = persistReducer(persistConfig, allReducers);

// store configuration
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
});

// persist the store
export const persistor = persistStore(store);
