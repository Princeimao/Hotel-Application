import { z } from "zod";

export const OptValidation = z.object({
  otp: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

export const DetailsValidation = z.object({
  name: z.string().min(3, { message: "Name should atleast 3 character long" }),
  email: z.email(),
  gender: z.enum(["Male", "Female", "Prefer not to say", ""]),
});

export const hostAddressValidation = z.object({
  houseAddress: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  pincode: z.string().min(6, { message: "Incorrect Pincode" }),
});
