import mongoose, { Schema } from "mongoose";
import {
  AccommodationType,
  Amenities,
  ReservationType,
  SharedWith,
} from "../shared/room.shared";

const RoomSchema = new Schema({
  hostId: {
    type: String,
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
    houseAddress: {
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
    },
    geo: {
      type: {
        type: String,
        enum: ["Point"], // Only allow "Point"
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
      },
    },
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
  maxGuests: {
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
    type: String,
    enum: ["ACTIVE", "DRAFT", "INACTIVE"],
    default: "DRAFT",
  },
});

export default mongoose.model("Room", RoomSchema);

RoomSchema.index({ "location.state": 1 });
RoomSchema.index({ "location.geo": "2dsphere" });
