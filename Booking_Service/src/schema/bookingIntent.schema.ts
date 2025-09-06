import { z } from "zod";

export const createBookingIntentSchema = z.object({
  checkIn: z.date(),
  checkOut: z.date(),
  totalPrice: z.number(),
  guests: z.object({
    adults: z.number().optional(),
    children: z.number().optional().default(0),
    infants: z.number().optional().default(0),
    pets: z.number().optional().default(0),
  }),
});
