import mongoose from "mongoose";

const bookingIntentSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
      required: true,
    },
    guests: {
      adults: {
        type: Number,
        required: true,
      },
      children: {
        type: Number,
        default: 0,
      },
      infants: {
        type: Number,
        default: 0,
      },
      pets: {
        type: Number,
        default: 0,
      },
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
    country: {
      type: String,
    },
    phone: {
      type: String,
    },
    bookingFor: {
      type: String,
      enum: ["FOR_ME", "NOT_FOR_ME"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingIntent", bookingIntentSchema);
