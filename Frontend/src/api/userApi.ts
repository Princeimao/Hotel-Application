import { instance } from "@/api/axios";
import type { ApiResponse } from "@/types/types";
import type { User } from "../types/user.types";

export const userSignUp = async (phone: string): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post(`/user/signup`, {
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signup user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const userSignupVerify = async (
  otp: number,
  phone: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/user/signup-verify", {
      otp,
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signup verify user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const registerUser = async (
  name: string,
  email: string,
  phone: string,
  gender: string
): Promise<ApiResponse<User>> => {
  try {
    const response = await instance.post("/user/create-user", {
      name,
      email,
      phone,
      gender,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while regiser user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const userSignIn = async (phone: string): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/user/signin", {
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const userSigninVerify = async (otp: number, phone: string) => {
  try {
    const response = await instance.post("/user/signin", {
      otp,
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin verify user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const userLogout = async () => {
  try {
    const response = await instance.post("/user/logout");

    return response.data;
  } catch (error) {
    console.log("something went wrong while logging out user", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};
