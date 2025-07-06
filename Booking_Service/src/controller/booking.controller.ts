import { Request, Response } from "express";
import { ZodError } from "zod";
import { getRabbitMqChannel } from "../db/rabbitMq.connection";
import bookingModel from "../models/booking.model";
import { createBookingSchema } from "../schema/booking.schema";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const channel = await getRabbitMqChannel();
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
    });

    // logic to generate the invoice

    channel.assertQueue("update-calendar", {
      durable: false,
    });

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
