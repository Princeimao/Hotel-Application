import { z } from "zod";
import { Season } from "../shared/season.shared";

export const createSeasonSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Season title should be atleast 3 character" }),
  seasonType: z.nativeEnum(Season),
  startDate: z.date(),
  endDate: z.date(),
});

export const updateSeasonSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Season title should be atleast 3 character" })
    .optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});
