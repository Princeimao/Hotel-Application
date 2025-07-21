import { configureStore } from "@reduxjs/toolkit";
import hostReducer from "../context/features/HostContext";
import userReducer from "../context/features/userContext";

export const store = configureStore({
  reducer: {
    user: userReducer,
    host: hostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
