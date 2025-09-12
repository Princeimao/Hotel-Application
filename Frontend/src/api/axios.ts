import axios from "axios";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_ROUTE}/api/v1`,
  timeout: 5000,
  withCredentials: true,
});
