import { instance } from "@/api/axios";

export const sessionIdVerify = async (
  sessionId: string
): Promise<{ success: boolean; message: string; phone?: string }> => {
  try {
    const resposne = await instance.post("/user/session-verify", {
      sessionId,
    });

    console.log(resposne.data);

    return resposne.data;
  } catch (error) {
    console.log("something went wrong while verifying session id", error);
    return {
      success: false,
      message: "something went wrong while verifying session id",
    };
  }
};

export const userSignUp = async (
  phone: string
): Promise<{
  success: boolean;
  message: string;
  sessionId?: string;
}> => {
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
): Promise<{
  success: boolean;
  message: string;
}> => {
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
): Promise<{
  success: boolean;
  message: string;
  user?: {
    phone: string;
    email: string;
    id: string;
    name: string;
  };
}> => {
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

export const userSignIn = async (
  phone: string
): Promise<{
  success: boolean;
  message: string;
  sessionId?: string;
}> => {
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

export const userSigninVerify = async (
  otp: number,
  phone: string
): Promise<{
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}> => {
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
