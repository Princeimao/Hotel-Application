import { Request, Response } from "express";
import { ZodError } from "zod/v4";
import bookingIntentModel from "../models/bookingIntent.model";
import calendarModel from "../models/calendar.model";
import {
  createBookingIntentSchema,
  userDetailsSchema,
} from "../schema/bookingIntent.schema";

export const createBookingIntent = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { guests, checkIn, checkOut } = createBookingIntentSchema.parse(
      req.body
    );

    const requestedInDate = new Date(checkIn);
    const requestedOutDate = new Date(checkOut);

    const conflict = await calendarModel.findOne({
      roomId,
      checkIn: { $lt: requestedInDate },
      checkOut: { $gt: requestedOutDate },
    });

    if (conflict !== null) {
      res.status(400).json({
        success: false,
        message: "No empty room available",
      });
      return;
    }

    const bookingIntent = await bookingIntentModel.create({
      roomId,
      checkIn,
      checkOut,
      guests,
    });

    res.status(200).json({
      success: true,
      sessionId: bookingIntent._id,
      message: "Booking intend created successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Zod Error",
        error,
      });
    }

    console.log("something went wrong while creating booking", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating booking",
      error,
    });
  }
};

export const userDetails = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const {
      firstName,
      LastName,
      Email,
      country,
      phone,
      bookingFor,
      specialRequest,
    } = userDetailsSchema.parse(req.body);

    await bookingIntentModel.findByIdAndUpdate(
      sessionId,
      {
        $set: {
          firstName,
          LastName,
          Email,
          country,
          phone,
          bookingFor,
          specialRequest,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "successfully updated",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Zod Error",
        error,
      });
    }

    console.log("something went wrong while updating user details", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while updating user details",
      error,
    });
  }
};

export const sessionVerification = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    const booking = await bookingIntentModel.findOne({ _id: sessionId });

    res.status(200).json({
      success: true,
      bookingIntent: booking,
      message: "Booking intend created successfully",
    });
  } catch (error) {
    console.log("something went wrong while creating booking", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating booking",
    });
  }
};
