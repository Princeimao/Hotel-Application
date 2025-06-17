import { z } from "zod";
import { AccommodationType } from "../shared/room.shared";

export const accomodationTypeSchema = z.nativeEnum(AccommodationType);

export const addressSchema = z.object({
  hosueAddress: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string().min(5).max(10),
});
