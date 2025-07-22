import { instance } from "./axios";
import type { ApiResponse, Host } from "./types";

export const hostSignup = async (phone: string): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/host/signup", {
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signup host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const hostSignupVerify = async (
  otp: number,
  phone: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/host/signup-verfiy", {
      otp,
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signup verify host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const hostDetials = async (
  name: string,
  email: string,
  phone: string,
  gender: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/host/host-details", {
      name,
      email,
      phone,
      gender,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while details host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const hostAddress = async (
  houseAddress: string,
  city: string,
  country: string,
  state: string,
  pincode: string,
  phone: string
): Promise<ApiResponse<Host>> => {
  try {
    const response = await instance.post("/host/host-address", {
      houseAddress,
      city,
      country,
      state,
      pincode,
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while address host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};
