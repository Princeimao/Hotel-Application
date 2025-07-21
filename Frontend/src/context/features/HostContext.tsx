import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Host {
  id: string;
  name: string;
  email: string;
  profileImg?: string;
}

interface HostState {
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
  name: "user",
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
