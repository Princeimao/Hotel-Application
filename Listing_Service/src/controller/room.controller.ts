import { Request, Response } from "express";

import { redis } from "../db/redis.client";
import roomModel from "../models/room.model";
import {
  accommodationAmenitiesSchema,
  accommodationDetailsSchema,
  accommodationPhotoSchema,
  accommodationSchema,
  accomodationTypeSchema,
  addressSchema,
  detailsSchema,
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

// image will directly store to cloud bucket (can be S3, GCP bucket), i will use imagekit.io
export const accommodationImages = async (req: Request, res: Response) => {
  try {
    const hostId = req.params;
    const photo = accommodationPhotoSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          photo,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "updated accommodation photo",
    });
  } catch (error) {
    console.log("something went wrong while creating photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
    });
  }
};

export const accommodationBasicDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const hostId = req.params;
    const { title, description, basePrice } = detailsSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          title,
          description,
          basePrice,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "updated accommodation photo",
    });
  } catch (error) {
    console.log("something went wrong while creating photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
    });
  }
};

export const accommodationCompleteSetup = async (
  req: Request,
  res: Response
) => {
  try {
    const hostId = req.params;
    const { minimumBookingDays, petsAllowed } = accommodationSchema.parse(
      req.body
    );

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    const room = await roomModel.findByIdAndUpdate(
      { _id: roomId },
      { $set: { minimumBookingDays, petsAllowed, status: "ACTIVE" } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Thanks for your patience, Accommodation created Successfully",
      room,
    });
  } catch (error) {
    console.log("something went wrong while creating photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
    });
  }
};
