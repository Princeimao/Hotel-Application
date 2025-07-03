import { Request, Response } from "express";
import { ZodError } from "zod";
import rateModel from "../models/rate.model";
import { rateSchema } from "../schema/rate.schema";

export const createRate = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { seasonId, price, title, accommodationIds } = rateSchema.parse(
      req.body
    );

    const rate = await rateModel.create({
      hostId,
      seasonId,
      price,
      title,
      accommodationIds,
    });

    if (!rate) {
      res.status(500).json({
        success: false,
        message:
          "internal server error, something went wrong while creating rate",
      });
    }

    res.status(200).json({
      success: true,
      message: "rate created successfully",
      rate,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }
  }
};

export const getRates = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const rate = await rateModel.find({ hostId });

    if (rate.length < 0) {
      res.status(200).json({
        success: true,
        message: "No rate found",
      });
    }

    res.status(200).json({
      success: true,
      message: "rate get successfully",
      rate,
    });
  } catch (error) {
    console.log("something went wrong while getting rate", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting rate",
      error,
    });
  }
};

export const updateRate = async (req: Request, res: Response) => {
  try {
    const { rateId } = req.params;
    const { title, price, accommodationIds, seasonId } = rateSchema.parse(
      req.body
    );

    const updatedRate = await rateModel.findByIdAndUpdate(
      rateId,
      {
        $set: {
          title,
          price,
          accommodationIds,
          seasonId,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedRate) {
      res.status(500).json({
        success: false,
        message:
          "internal server error, something went wrong while creating season",
      });
    }

    res.status(200).json({
      success: true,
      message: "rate created successfully",
      season: updatedRate,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while updating rate", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while updating rate",
      error,
    });
  }
};
