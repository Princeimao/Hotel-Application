import { Request, Response } from "express";
import { ZodError } from "zod";
import bookingModel from "../models/booking.model";
import { createBookingSchema } from "../schema/booking.schema";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      roomId,
      checkIn,
      checkOut,
      totalPrice,
      people,
      couponId,
      bookingStatus,
      specialRequest,
      paymentId,
    } = createBookingSchema.parse(req.body);

    const booking = await bookingModel.create({
      userId,
      roomId,
      checkIn,
      checkOut,
      totalPrice,
      people,
      coupon: couponId,
      bookingStatus,
      specialRequest,
      isPaid: `${paymentId !== undefined ? true : false}`,
      paymentId,
    });

    // logic to generate the invoice

    res.status(200).json({
      success: true,
      message: "booking successfull",
      booking,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while getting booking", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting booking",
      error,
    });
  }
};
