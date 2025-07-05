import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    people: {
      adults: {
        type: Number,
        required: true,
      },
      children: {
        type: Number,
        required: true,
        default: 0,
      },
      infants: {
        type: Number,
        required: true,
        default: 0,
      },
      pets: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    coupon: {
      applied: {
        type: Boolean,
        required: true,
      },
      couponId: {
        type: mongoose.Schema.Types.ObjectId,
      },
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      required: true,
    },
    specialRequest: {
      type: String,
    },
    cancellationReason: {
      type: String,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    // will add the service part to show that other service is added or not
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", BookingSchema);
