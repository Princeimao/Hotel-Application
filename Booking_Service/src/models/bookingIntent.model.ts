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
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("BookingIntent", bookingIntentSchema);
