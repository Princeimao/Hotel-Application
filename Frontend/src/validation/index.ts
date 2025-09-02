import { z } from "zod";

export const OptValidation = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const DetailsValidation = z.object({
  name: z.string().min(3, { message: "Name should atleast 3 character long" }),
  email: z.email(),
  gender: z.enum(["MALE", "FEMALE", "PREFER_NOT_TO_SAY", ""]),
});

export const hostAddressValidation = z.object({
  houseAddress: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  pincode: z.string().min(6, { message: "Incorrect Pincode" }),
});

export const listingDetailsValidation = z.object({
  title: z
    .string()
    .min(3, { message: "title cannot be less than 3 character" }),
  details: z.string().min(1),
  basePrice: z.string().min(1),
});

export const listingAddressValidation = z.object({
  flatNo: z.string(),
  street: z.string(),
  nearbyLandmark: z.string(),
  locality: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string().min(5).max(10),
});

export const bookingFormValidation = z.object({
  firstName: z
    .string()
    .min(3, { message: "First name atleast 3 character long" }),
  lastName: z
    .string()
    .min(3, { message: "First name atleast 3 character long" }),
  email: z.email(),
  country: z.string(),
  phone: z.string(),
});
