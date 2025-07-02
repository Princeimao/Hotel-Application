import { Request, Response } from "express";

import { ZodError } from "zod";
import { redis } from "../db/redis.client";
import roomModel from "../models/room.model";
import {
  accommodationAmenitiesSchema,
  accommodationDetailsSchema,
  accommodationPhotoSchema,
  accommodationSchema,
  accomodationTypeSchema,
  addressSchema,
  coordinateSchema,
  detailsSchema,
  peopleAtAccommodationSchema,
} from "../schema/room.schema";

export const accommodationType = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { hostId } = req.params;
    const { roomType } = accomodationTypeSchema.parse(req.body);

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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating accomodation type", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating accomodation type",
      error,
    });
  }
};

export const accommodationAddress = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const { hosueAddress, country, state, city, pincode, coordinates } =
      addressSchema.parse(req.body);

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
            geo: {
              type: "Point",
              coordinates,
            },
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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating address", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
      error,
    });
  }
};

export const accommodationDetails = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating details", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating details",
    });
  }
};

export const peopleAtAccommodation = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { sharedWith } = peopleAtAccommodationSchema.parse(req.body);

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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating shared with", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating shared with",
    });
  }
};

export const accommodationAmenities = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { amenities } = accommodationAmenitiesSchema.parse(req.body);

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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating address", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
      error,
    });
  }
};

// image will directly store to cloud bucket (can be S3, GCP bucket), i will use imagekit.io
export const accommodationImages = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;
    const { images } = accommodationPhotoSchema.parse(req.body);

    const roomId = await redis.get(`RoomDraft:${hostId}`);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          photo: images,
        },
      },
      { upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "updated accommodation photo",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
      error,
    });
  }
};

export const accommodationBasicDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { hostId } = req.params;
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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating address",
      error,
    });
  }
};

export const accommodationCompleteSetup = async (
  req: Request,
  res: Response
) => {
  try {
    const { hostId } = req.params;
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
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating room", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating room",
      error,
    });
  }
};

export const getAccommodation = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;

    const room = await roomModel.findById(roomId);

    res.status(200).json({
      success: true,
      message: "Request successful",
      room: room,
    });
  } catch (error) {
    console.log("something went wrong while getting accommodation", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting accommodation",
      error,
    });
  }
};

export const getAccommodationsByArea = async (req: Request, res: Response) => {
  try {
    const { long, lang, guestCount } = coordinateSchema.parse(req.query);
    const today = Date.now();

    const accommodations = await roomModel.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [long, lang],
          },
          distanceField: "distanceFromUser",
          spherical: true,
          maxDistance: 5000,
        },
      },
      {
        $match: {
          maxGuests: { $gte: guestCount },
        },
      },
      {
        $lookup: {
          from: "Rates",
          localField: "price",
          foreignField: "_id",
          as: "roomPrice",
          let: { roomId: "_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$$roomId", "$accommodationIds"],
                },
              },
            },
            {
              $lookup: {
                from: "Seasons",
                localField: "seasonId",
                foreignField: "_id",
                as: "season",
              },
            },
            {
              $match: {
                $expr: {
                  $and: [
                    { $lte: ["$season.startDate", today] },
                    { $gte: ["$season.endDate", today] },
                  ],
                },
              },
            },
          ],
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          state: "$location.state",
          city: "$location.city",
          accommodationType: 1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    if (accommodations.length < 0) {
      res.status(400).json({
        success: false,
        message: "Response failed to get accommodations",
      });
      return;
    }

    res.status(400).json({
      success: true,
      message: "Response Successfull",
      accommodations,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while getting accommodation", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting accommodation",
      error,
    });
  }
};
