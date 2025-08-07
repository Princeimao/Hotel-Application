import { instance } from "./axios";
const controller = new AbortController();

export const fetchRoomDetailsFromSearch = async () => {
  try {
    const response = await instance.get(`listing/get-accommodations`);

    return response.data;
  } catch (error) {
    console.log("something went wrong while getting the hotel", error);
  }
};

export const fetchRoomDetails = async (accommodationId: string) => {
  try {
    const response = await instance.get(
      `/listing/get-accommodation/${accommodationId}`
    );

    console.log(response);
    return response.data.room;
  } catch (error) {
    console.log("something went wrong while getting the hotel", error);
  }
};

export const generateUploadToken = async (): Promise<{
  success: boolean;
  message: string;
  imagekit?: {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
  };
}> => {
  try {
    const response = await instance.get("/upload-token", {
      signal: controller.signal,
    });

    return response.data;
  } catch (error) {
    if (error.name === "CanceledError") {
      console.log("Request cancelled", error);
      return {
        success: false,
        message: "Request cancelled",
      };
    }

    console.log("something went wrong while getting upload token", error);
    return {
      success: false,
      message: "something went wrong while getting upload token",
    };
  }
};
