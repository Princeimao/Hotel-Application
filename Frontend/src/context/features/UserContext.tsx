import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  profileImg?: string;
}

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.status = "succeeded";
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
