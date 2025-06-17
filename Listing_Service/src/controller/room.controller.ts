import { Request, Response } from "express";

import { redis } from "../db/redis.client";
import roomModel from "../models/room.model";
import {
  accommodationAmenitiesSchema,
  accommodationDetailsSchema,
  accomodationTypeSchema,
  addressSchema,
  peopleAtAccommodationSchema,
} from "../schema/room.schema";

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

export const accommodationDetails = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const {
      totalGuest,
      adultOccupancy,
      childrenOccupancy,
      bedrooms,
      beds,
      bedroomLock,
      petsAllowed,
    } = accommodationDetailsSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          totalGuest,
          adultOccupancy,
          childrenOccupancy,
          bedrooms,
          beds,
          bedroomLock,
          petsAllowed,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "updated accommodation details",
    });
  } catch (error) {
    console.log("something went wrong while creating details", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating details",
    });
  }
};

export const peopleAtAccommodation = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const sharedWith = peopleAtAccommodationSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          sharedWith,
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

export const accommodationAmenities = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const amenities = accommodationAmenitiesSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          amenities,
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
