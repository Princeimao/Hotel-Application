import { Request, Response } from "express";
import { instance } from "../utils/httpClient.utils";

export const getAccommodationDetails = async (req: Request, res: Response) => {
  try {
    const { accommodationId } = req.params;
    const d = new Date();
    const date = new Date(d);

    const result = Promise.all([
      instance.get(
        `${process.env.HOST_SERVICE_URL}/api/v1/host/get-host-accommodationId/${accommodationId}`
      ),
      instance.get(
        `${process.env.LISTING_SERVICE_URL}/api/v1/listing/get-accommodation/${accommodationId}`
      ),
      instance.get(
        `${
          process.env.BOOKING_SERVICE_URL
        }/api/v1/booking/calendar-availability/${accommodationId}?checkIn=${date.setDate(
          date.getDate() + 1
        )}&checkOut=${date.setDate(date.getDate() + 3)}`
      ),
    ]);

    res.status(200).json({
      success: true,
      message: "accommodation details get successfully",
      accommodationDetails: result,
    });
  } catch (error) {
    console.log(
      "something went wrong while getting the accommodation details",
      error
    );
    res.status(400).json({
      success: false,
      message: "something went wrong while getting the accommodation details",
      error,
    });
  }
};

export const getHostDetails = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const result = Promise.all([
      instance.get(
        `${process.env.HOST_SERVICE_URL}/api/v1/host/get-host-Id/${hostId}`
      ),
      instance.get(
        `${process.env.LISTING_SERVICE_URL}/api/v1/listing/get-accommodation-hostId/${hostId}`
      ),
    ]);
  } catch (error) {
    console.log("something went wrong while getting user detaisl", error);
    res.status(400).json({
      success: false,
      message: "something went wrong while getting the accommodation details",
      error,
    });
  }
};
