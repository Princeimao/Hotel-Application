import { UserGender } from "@prisma/client";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const signupSchema = z.object({
  phone: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val);
      return phone?.isValid() ?? false;
    },
    {
      message: "Invalid phone number",
    }
  ),
});

export const signup_verifySchema = z.object({
  phone: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val);
      return phone?.isValid() ?? false;
    },
    {
      message: "Invalid phone number",
    }
  ),
  otp: z.number(),
});

export const userSchema = z.object({
  name: z.string().min(3, { message: "Name should atleast 3 charcter long" }),
  email: z.string().email({ message: "Please provide a valid email" }),
  phone: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val);
      return phone?.isValid() ?? false;
    },
    {
      message: "Invalid phone number",
    }
  ),
  gender: z.nativeEnum(UserGender).optional().nullable(),
});
