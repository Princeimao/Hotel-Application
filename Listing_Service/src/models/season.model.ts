import mongoose, { Schema } from "mongoose";
import { Season } from "../shared/season.shared";

const SeasonSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  seasonType: {
    type: [String],
    enum: Object.values(Season),
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Season", SeasonSchema);