import { Request, Response } from "express";
import { ZodError } from "zod";
import calendarModel from "../models/calendar.model";

export const getCalendarAvailability = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const { checkIn, checkOut } = req.params;

    const availability = await calendarModel.find({
      roomId: roomId,
      $and: [
        {
          checkIn: { $lt: checkOut },
          checkOut: { $gt: checkIn },
        },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Accommodation Availability",
      availability,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        message: "Zod Error",
        error,
      });
    }

    console.log("something went wrong while getting the availability", error);
    res.status(400).json({
      success: false,
      message: "something went wrong while getting the availability",
    });
  }
};
