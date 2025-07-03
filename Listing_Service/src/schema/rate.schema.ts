import mongoose from "mongoose";
import { z } from "zod";

export const rateSchema = z.object({
  seasonId: z.instanceof(mongoose.Schema.Types.ObjectId),
  title: z.string(),
  price: z.number(),
  accommodationIds: z.tuple([z.instanceof(mongoose.Schema.Types.ObjectId)]),
});
