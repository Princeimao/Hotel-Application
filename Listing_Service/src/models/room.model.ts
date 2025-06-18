import mongoose, { Schema } from "mongoose";
import { string } from "zod";
import {
  AccommodationType,
  Amenities,
  ReservationType,
  SharedWith,
} from "../shared/room.shared";

const RoomSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    unique: true,
  },
  title: {
    type: String,
    minLength: 10,
    maxLength: 100,
  },
  description: {
    type: String,
    minLength: 50,
    maxLength: 455,
  },
  location: {
    hosueAddress: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    }, // ONE MORE FIELD WILL BE ADD IN FUTURE FOR COORDINATES
  },
  accommodationType: {
    type: String,
    enum: Object.values(AccommodationType),
  },
  sharedWith: {
    type: [String],
    enum: Object.values(SharedWith),
    default: [SharedWith.NOBODY],
  },
  amenities: {
    type: [String],
    enum: Object.values(Amenities),
  },
  totalGuest: {
    type: Number,
    default: 1,
  },
  adultOccupancy: {
    type: Number,
    default: true,
  },
  childrenOccupancy: {
    type: Number,
    default: 0,
  },
  bedrooms: {
    type: Number,
  },
  beds: {
    type: Number,
  },
  bedroomLock: {
    type: Boolean,
  },
  reservationType: {
    type: String,
    enum: Object.values(ReservationType),
  },
  petsAllowed: {
    type: Boolean,
  },
  minimumBookingDays: {
    type: Number,
    default: 1,
  },
  basePrice: {
    type: String,
  },
  photo: {
    type: [String],

    min: 8,
  },
  price: [
    {
      type: Schema.Types.ObjectId,
      ref: "rate",
    },
  ],
  coupon: [
    {
      type: Schema.Types.ObjectId,
      ref: "coupon",
    },
  ],
  status: {
    type: string,
    enum: ["ACTIVE", "DRAFT", "INACTIVE"],
    default: "DRAFT",
  },
});

export default mongoose.model("Room", RoomSchema);
