import { Request, Response } from "express";
import { z } from "zod";
import calendarModel from "../models/calendar.model";

const calendarAvailabilitySchema = z.object({
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date(),
});

export const getCalendarAvailability = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { checkIn, checkOut } = req.query;

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
    console.log("something went wrong while getting the availability", error);
  }
};
