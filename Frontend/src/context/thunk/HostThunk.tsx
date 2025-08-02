import { getUser } from "@/api/hostApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchHost = createAsyncThunk("host/fetchhost", async () => {
  const response = await getUser();

  return response.host;
});
