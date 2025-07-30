import { instance } from "./axios";

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
