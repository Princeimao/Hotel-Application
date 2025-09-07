import { Request, Response } from "express";
import { instance } from "../utils/httpClient.utils";

export const getAccommodationDetails = async (req: Request, res: Response) => {
  try {
    const { accommodationId } = req.params;

    const [hostRes, listingRes, bookingRes] = await Promise.all([
      instance.get(
        `${process.env.HOST_SERVICE_URL}/get-host-accommodationId/${accommodationId}`
      ),
      instance.get(
        `${process.env.LISTING_SERVICE_URL}/get-accommodation/${accommodationId}`
      ),
      instance.get(
        `${process.env.BOOKING_SERVICE_URL}/calendar-availability/${accommodationId}`
      ),
    ]);

    res.status(200).json({
      success: true,
      message: "accommodation details get successfully",
      accommodationDetails: {
        host: hostRes.data,
        listing: listingRes.data,
        bookings: bookingRes.data,
      },
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
    const token = req.headers.authorization;

    const [hostRes, listingRes] = await Promise.all([
      instance.get(`${process.env.HOST_SERVICE_URL}/get-host-Id/${hostId}`),

      instance.get(
        `${process.env.LISTING_SERVICE_URL}/get-accommodation-hostId/${hostId}`
      ),
    ]);

    res.status(200).json({
      success: true,
      message: "get host details successfully",
      hostDetails: {
        host: hostRes.data,
        listing: listingRes.data,
      },
    });
  } catch (error) {
    console.log("something went wrong while getting host Details", error);
    res.status(400).json({
      success: false,
      message: "something went wrong while getting host Details",
      error,
    });
  }
};

export const createBookingIntent = async (req: Request, res: Response) => {
  try {
    const { roomId, sessionId } = req.params;

    const [bookingRes, listingRes] = await Promise.all([
      instance.get(
        `${process.env.BOOKING_SERVICE_URL}/bookingIntent-verification/${sessionId}`
      ),
      instance.get(
        `${process.env.LISTING_SERVICE_URL}/get-accommodation-booking/${roomId}`
      ),
    ]);

    res.status(200).json({
      success: true,
      message: "successfully get",
      bookingDetails: {
        bookingRes: bookingRes.data,
        listingRes: listingRes.data,
      },
    });
  } catch (error) {
    console.log("something went wrong while creating booking intent", error);
    res.status(400).json({
      success: false,
      message: "something went wrong while creating booking intent",
      error,
    });
  }
};
