import { configureStore } from "@reduxjs/toolkit";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { followUser, likeReducer } from "./CreateSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, likeReducer);

export const store = configureStore({
  reducer: {
    like: persistedReducer,
  },
});

export const persistor = persistStore(store);
