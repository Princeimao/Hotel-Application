import { z } from "zod";
import {
  AccommodationType,
  Amenities,
  SharedWith,
} from "../shared/room.shared";

export const accomodationTypeSchema = z.nativeEnum(AccommodationType);

export const addressSchema = z.object({
  hosueAddress: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string().min(5).max(10),
});

export const accommodationDetailsSchema = z.object({
  totalGuest: z.number().min(1, { message: "Guest cannot be less than 1" }),
  adultOccupancy: z.number().min(1, { message: "Guest cannot be less than 1" }),
  childrenOccupancy: z.number(),
  bedrooms: z.number(),
  beds: z.number(),
  bedroomLock: z.boolean(),
  petsAllowed: z.boolean(),
});

export const peopleAtAccommodationSchema = z
  .array(z.nativeEnum(SharedWith))
  .min(1);

export const accommodationAmenitiesSchema = z
  .array(z.nativeEnum(Amenities))
  .min(1);
