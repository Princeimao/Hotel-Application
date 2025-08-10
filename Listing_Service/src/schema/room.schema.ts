import { z } from "zod";
import {
  AccommodationType,
  Amenities,
  SharedWith,
} from "../shared/room.shared";

export const accomodationTypeSchema = z.object({
  roomType: z.nativeEnum(AccommodationType),
});

export const addressSchema = z.object({
  flatNo: z.string(),
  street: z.string(),
  nearbyLandmark: z.string(),
  locality: z.string(),
  country: z.string(),
  state: z.string(),
  city: z.string(),
  pincode: z.string().min(5).max(10),
  coordinates: z.tuple([z.number(), z.number()]),
});

export const accommodationDetailsSchema = z.object({
  maxGuests: z.number().min(1, { message: "Guest cannot be less than 1" }),
  adultOccupancy: z.number().min(1, { message: "Guest cannot be less than 1" }),
  childrenOccupancy: z.number(),
  bedrooms: z.number(),
  beds: z.number(),
  bedroomLock: z.boolean(),
  petsAllowed: z.boolean(),
});

export const peopleAtAccommodationSchema = z.object({
  sharedWith: z.array(z.nativeEnum(SharedWith)).min(1),
});

export const accommodationAmenitiesSchema = z.object({
  amenities: z.array(z.nativeEnum(Amenities)).min(1),
});

// after setting the frontend use regex for to check the image come from the cloud not from other place
export const accommodationPhotoSchema = z.object({
  images: z.array(z.string().url()).min(1),
});

export const detailsSchema = z.object({
  title: z
    .string()
    .min(5, { message: "title cannot be shorter than 5 character" }),
  description: z
    .string()
    .min(5, { message: "title cannot be shorter than 5 character" }),
  basePrice: z.number(),
});

export const accommodationSchema = z.object({
  minimumBookingDays: z.number(),
  petsAllowed: z.boolean(),
});

export const findRoomSchema = z.object({
  coordinates: z.tuple([z.number(), z.number()]),
  guestCount: z.number().optional(),
  // will add check in and check out date
});

export const coordinateSchema = z.object({
  long: z.coerce.number(),
  lang: z.coerce.number(),
  guestCount: z.coerce.number(),
});
