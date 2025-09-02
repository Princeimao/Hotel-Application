import { getUser } from "@/api/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetchhost", async () => {
  const response = await getUser();

  return response.user;
});
