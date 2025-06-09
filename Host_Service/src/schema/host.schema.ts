import { HostGender } from "@prisma/client";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { z } from "zod";

export const phoneSchema = z.object({
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

export const hostDetailSchema = z.object({
  name: z.string().min(3, { message: "Name should atleast 3 character long" }),
  email: z.string().email(),
  phone: z.string().refine(
    (val) => {
      const phone = parsePhoneNumberFromString(val);
      return phone?.isValid() ?? false;
    },
    {
      message: "Invalid phone number",
    }
  ),
  gender: z.nativeEnum(HostGender),
});

export const addressSchema = z.object({
  houseAddress: z.string(),
  city: z.string(),
  country: z.string(),
  state: z.string(),
  pincode: z.string().min(5).max(10),
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
