import axios from "axios";

export const instance = axios.create({
  // baseURL: `${import.meta.env.VITE_SOME_KEY}/api/v1` || ,
  baseURL:
    "https://international-canberra-una-classes.trycloudflare.com/api/v1",
  timeout: 5000,
  withCredentials: true,
});
