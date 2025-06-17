import { Request, Response } from "express";

import { redis } from "../db/redis.client";
import roomModel from "../models/room.model";
import { accomodationTypeSchema, addressSchema } from "../schema/room.schema";

export const accommodationType = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const roomType = accomodationTypeSchema.parse(req.body);

    // testing
    console.log(roomType);

    const room = await roomModel.create({
      hostId,
      accommodationType: roomType,
    });

    await redis.set(`RoomDraft:${hostId}`, `${room._id}`);

    res.status(200).json({
      success: true,
      message: "Accommodation type set successfully",
    });
  } catch (error) {
    console.log("something went wrong while creating accomodation type", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating accomodation type",
    });
  }
};

export const accommodationAddress = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const { hosueAddress, country, state, city, pincode } = addressSchema.parse(
      req.body
    );

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          location: {
            hosueAddress,
            country,
            state,
            city,
            pincode,
          },
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "updated accommodation address",
    });
  } catch (error) {
    console.log("something went wrong while creating address", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
    });
  }
};
