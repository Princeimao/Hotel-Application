import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Host {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImg?: string;
}

export interface HostState {
  host: Host | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: HostState = {
  host: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const hostSlice = createSlice({
  name: "host",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<HostState>) => {
      state.host = action.payload.host;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    logout: (state) => {
      state.host = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { login, logout } = hostSlice.actions;
export default hostSlice.reducer;
