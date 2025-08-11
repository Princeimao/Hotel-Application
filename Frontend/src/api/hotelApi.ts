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
  imageKit?: {
    token: string;
    expire: number;
    signature: string;
    publicKey: string;
  };
}> => {
  try {
    const response = await instance.get("/listing/upload-token", {
      signal: controller.signal,
    });

    console.log(response.data);
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

export const uploadImage = async (
  hotelId: string,
  images: string[]
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await instance.post(
      `/accommodation-images/${hotelId}`,
      images
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while upload the image", error);
    return {
      success: false,
      message: "something went wrontg while upload the image",
    };
  }
};

export const becomaAHost = async (
  hostId: string
): Promise<{
  success: boolean;
  message: string;
  roomId?: string;
}> => {
  try {
    const response = await instance.post(
      `/listing/list-accommodation/${hostId}`
    );

    console.log(response);

    return response.data;
  } catch (error) {
    console.log("something went wrong while setting up", error);
    return {
      success: false,
      message: "something went wrong while setting up",
    };
  }
};
