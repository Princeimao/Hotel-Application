import type { BookingAvailability } from "./booking.type";
import type { RoomHost } from "./host.types";

export interface RoomDetials {
  location: {
    geo: {
      type: string;
      coordinates: [number, number];
    };
    country: string;
    state: string;
    city: string;
    pincode: string;
  };
  _id: string;
  hostId: string;
  accommodationType: string;
  sharedWith: [string];
  amenities: [string];
  maxGuests: number;
  adultOccupancy: number;
  childrenOccupancy: number;
  minimumBookingDays: number;
  photo: [string];
  price: [];
  coupon: [];
  status: string;
  __v: number;
  bedroomLock: boolean;
  bedrooms: number;
  beds: number;
  petsAllowed: boolean;
  basePrice: string;
  description: string;
  title: string;
}

export interface Room {
  listing: RoomDetials;
  host: RoomHost;
  bookings: BookingAvailability[];
}
