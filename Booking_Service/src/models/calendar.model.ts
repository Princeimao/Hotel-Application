import mongoose from "mongoose";

const CalendarAvailabilitySchema = new mongoose.Schema({
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
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
});

export default mongoose.model(
  "CalendarAvailability",
  CalendarAvailabilitySchema
);
