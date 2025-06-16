import mongoose, { Schema } from "mongoose";

const RateSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
  seasonId: {
    type: Schema.Types.ObjectId,
    ref: "Season",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  accommodationIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
  ],
});

export default mongoose.model("Rate", RateSchema);
