import axios from "axios";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SOME_KEY}/api/v1`,
  timeout: 5000,
  headers: { "Content-Type": "application/josn" },
  withCredentials: true,
});
