import type { Host } from "@/types/host.types";
import type { RoomDetials } from "@/types/hotel.types";
import type { ApiResponse } from "@/types/types";
import { instance } from "./axios";

export const sessionIdVerify = async (
  sessionId: string
): Promise<{ success: boolean; message: string; phone: string | null }> => {
  try {
    const resposne = await instance.post("/host/session-verify", {
      sessionId,
    });

    console.log(resposne.data);

    return resposne.data;
  } catch (error) {
    console.log("something went wrong while verifying session id", error);
    return {
      success: false,
      message: "something went wrong while verifying session id",
      phone: null,
    };
  }
};

export const hostSignup = async (
  phone: string
): Promise<{ success: boolean; message: string; sessionId: string | null }> => {
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
      sessionId: null,
    };
  }
};

export const hostSignupVerify = async (
  otp: number,
  phone: string
): Promise<{ success: boolean; message: string; phone: string | null }> => {
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
      phone: null,
    };
  }
};

export const hostDetials = async (
  name: string,
  email: string,
  gender: string,
  phone: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await instance.post("/host/host-details", {
      name,
      email,
      gender,
      phone,
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
): Promise<{
  success: boolean;
  message: string;
  host?: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}> => {
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

export const hostSignin = async (
  phone: string
): Promise<{
  success: boolean;
  message: string;
  sessionId: string | null;
}> => {
  try {
    const response = await instance.post("/host/signin", {
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
      sessionId: null,
    };
  }
};

export const hostSigninVerify = async (
  otp: number,
  phone: string
): Promise<{
  success: boolean;
  message: string;
  host?: {
    id: string;
    email: string;
    name: string;
    phone: string;
  };
}> => {
  try {
    const response = await instance.post("/host/signin-verify", {
      otp,
      phone,
    });

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin verify host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const getUser = async (): Promise<{
  success: boolean;
  message: string;
  host?: Host;
}> => {
  try {
    const response = await instance.get("/host/getHost");

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin verify host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const getHost = async (
  hostId: string
): Promise<{
  success: boolean;
  message: string;
  hostDetails?: {
    host: { host: Host };
    listing: { accommodations: RoomDetials[] };
  };
}> => {
  try {
    const response = await instance.get(`/overview/host-details/${hostId}`);

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin verify host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};

export const hostLogout = async (): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await instance.get("/host/host-logout");

    return response.data;
  } catch (error) {
    console.log("something went wrong while signin verify host", error);
    return {
      success: false,
      message: "Something went wrong. Try again.",
    };
  }
};
