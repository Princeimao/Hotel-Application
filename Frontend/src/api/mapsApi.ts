import type {
  AddressValidation,
  ForwardGeocode,
  UserLocation,
} from "@/types/maps.types";
import axios from "axios";

const endPoint = import.meta.env.VITE_OLAMAPS_ENDPOINT;

export const searchSuggestion = async (
  location: string,
  lat: number,
  long: number
) => {
  try {
    const response = await axios.get(
      `${endPoint}/places/v1/autocomplete?input=${new URLSearchParams({
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

export const addressCheck = async (
  address: any
): Promise<{
  success: boolean;
  message: string;
  vaidation?: AddressValidation;
}> => {
  try {
    const {
      flatNo,
      street,
      nearbyLandmark,
      locality,
      country,
      state,
      city,
      pincode,
    } = address;
    const response = await axios.get(
      `${endPoint}/places/v1/addressvalidation?${new URLSearchParams({
        address: `${flatNo} ${street} ${nearbyLandmark} ${locality}  ${country} ${state} ${city} ${pincode}`,
      })}&api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("something went wrong while verifying the address", error);
    return {
      success: false,
      message: "something went wrong while verifying the address",
    };
  }
};

export const forwardGeoCode = async (
  address: string
): Promise<{
  success: boolean;
  message: string;
  resut?: ForwardGeocode;
}> => {
  try {
    const response = await axios.get(
      `${endPoint}/places/v1/geocode?${new URLSearchParams({
        address: address,
      })}&api_key=${import.meta.env.VITE_OLAMAPS_API_KEY}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("something went wrong getting forward geo code", error);
    return {
      success: false,
      message: "something went wrong while verifying the address",
    };
  }
};
