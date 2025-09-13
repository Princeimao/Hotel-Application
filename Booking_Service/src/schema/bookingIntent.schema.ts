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

export const userDetailsSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name atleast 3 character long" }),
  LastName: z.string(),
  Email: z.string().email(),
  country: z.string(),
  phone: z.string(),
  bookingFor: z.enum(["FOR_ME", "NOT_FOR_ME", ""]).optional(),
  specialRequest: z.string().optional(),
});
