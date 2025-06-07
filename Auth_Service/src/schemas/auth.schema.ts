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
  otp: z.number()
});