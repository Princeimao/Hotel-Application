import { Schema } from "mongoose";
import {
  AccommodationType,
  Amenities,
  SharedWith,
} from "../shared/room.shared";

const roomSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  titel: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 100,
  },
  description: {
    type: String,
    required: true,
    minLength: 50,
    maxLength: 455,
  },
  location: {
    hosueAddress: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
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
    required: true,
  },
  amenities: {
    type: [String],
    enum: Object.values(Amenities),
    required: true,
  },
  totalGuest: {
    type: Number,
    required: true,
    default: 1,
  },
  adultOccupancy: {
    type: Number,
    required: true,
    default: true,
  },
  childrenOccupancy: {
    type: Number,
    required: false,
    default: 0,
  },
  petsAllowed: {
    type: Boolean,
  },
  minimumBookingDays: {
    type: Number,
    default: 1,
  },
  photo: {
    type: [String],
    required: true,
    min: 8,
  },
  price: [], // reference id of price
  coupon: [], // reference id of coupon
});
