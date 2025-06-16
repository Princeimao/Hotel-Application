import mongoose, { Schema } from "mongoose";

const CouponSchema = new Schema({
  hostId: {
    type: Schema.Types.ObjectId,
    ref: "Host",
    required: true,
  },
  couponName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ["percentage", "flat"],
    default: "percentage",
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  applicableListingIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "room",
      required: true,
    },
  ],
  availableFrom: {
    type: Date,
    required: true,
  },
  availableTo: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("Coupon", CouponSchema);
