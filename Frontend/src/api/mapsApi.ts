import type { UserLocation } from "@/types/maps.types";
import axios from "axios";

const endPoint = import.meta.env.VITE_OLAMAPS_ENDPOINT;

export const searchSuggestion = async (
  location: string,
  lat: number,
  long: number
) => {
  try {
    const response = await axios.get(
      `${endPoint}?input=${new URLSearchParams({
        input: location,
        location: `${lat},${long}`,
      })}&api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("something went wrong while getting search suggestion", error);
    return null;
  }
};

export const getUserLocation = async (): Promise<
  UserLocation | null | undefined
> => {
  const cachedLoaction = sessionStorage.getItem("userLocation");

  if (cachedLoaction) {
    console.log("here 1");
    return JSON.parse(cachedLoaction);
  }

  try {
    const response = await axios.get(`${import.meta.env.VITE_IPAPI_ENDPOINT}`, {
      headers: {
        Accept: "application/json",
      },
    });

    const userLocation = {
      city: response.data.city,
      countryName: response.data.country_name,
      latitude: response.data.latitude,
      longitude: response.data.longitude,
      phoneCode: response.data.country_calling_code,
      currency: response.data.currency,
    };

    sessionStorage.setItem("userLocation", JSON.stringify(userLocation));
    return userLocation;
  } catch (error) {
    console.error("Failed to get location", error);
    return null;
  }
};
