import { z } from "zod";

export const createBookingIntentSchema = z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  guests: z.object({
    adults: z.number().optional(),
    children: z.number().optional().default(0),
    infants: z.number().optional().default(0),
    pets: z.number().optional().default(0),
  }),
});
