import { Request, Response } from "express";
import { ZodError } from "zod";
import seasonModel from "../models/season.model";
import {
  createSeasonSchema,
  updateSeasonSchema,
} from "../schema/season.schema";
import rateModel from "../models/rate.model";

export const createSeason = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { title, seasonType, startDate, endDate } = createSeasonSchema.parse(
      req.body
    );

    const season = await seasonModel.create({
      hostId,
      name,
      seasonType,
      startDate,
      endDate,
    });

    if (!season) {
      res.status(500).json({
        success: false,
        message:
          "internal server error, something went wrong while creating season",
      });
    }

    res.status(200).json({
      success: true,
      message: "season created successfully",
      season,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating season", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating season",
      error,
    });
  }
};

export const getSeasons = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const seasons = await seasonModel.find({ hostId });

    if (seasons.length < 0) {
      res.status(200).json({
        success: true,
        message: "No Season found",
      });
    }

    res.status(200).json({
      success: true,
      message: "season get successfully",
      seasons,
    });
  } catch (error) {
    console.log("something went wrong while getting seasons", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting seasons",
      error,
    });
  }
};

export const updateSeason = async (req: Request, res: Response) => {
  try {
    const { seasonId } = req.params;
    const { title, startDate, endDate } = updateSeasonSchema.parse(req.body);

    const updatedSeason = await seasonModel.findByIdAndUpdate(
      seasonId,
      {
        $set: {
          title,
          startDate,
          endDate,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedSeason) {
      res.status(500).json({
        success: false,
        message:
          "internal server error, something went wrong while creating season",
      });
    }

    res.status(200).json({
      success: true,
      message: "season created successfully",
      season: updatedSeason,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while updating season", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while updating season",
      error,
    });
  }
};

export const deleteSeason = async (req: Request, res: Response) => {
  try {
    const { seasonId } = req.params;

    const season = await seasonModel.findByIdAndDelete(seasonId);
    const rate = await rateModel.find
  } catch (error) {
    console.log("something went wrong while updating season", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while updating season",
      error,
    });
  }
};
