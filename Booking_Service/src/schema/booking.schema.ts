import mongoose from "mongoose";
import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.instanceof(mongoose.Schema.Types.ObjectId),
  roomId: z.instanceof(mongoose.Schema.Types.ObjectId),
  checkIn: z.date(),
  checkOut: z.date(),
  totalPrice: z.number(),
  people: z.object({
    adults: z.number().optional(),
    children: z.number().optional().default(0),
    infants: z.number().optional().default(0),
    pets: z.number().optional().default(0),
  }),
  couponId: z.string(),
  bookingStatus: z.enum(["pending", "confirmed", "cancelled", "completed"]),
  specialRequest: z.string(),
  paymentId: z.instanceof(mongoose.Schema.Types.ObjectId).optional(),
});
