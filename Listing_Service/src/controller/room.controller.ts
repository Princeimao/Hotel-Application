import { Request, Response } from "express";

import { ZodError } from "zod";
import roomModel from "../models/room.model";
import { producer } from "../rabbitMq/producer";
import {
  accommodationAmenitiesSchema,
  accommodationDetailsSchema,
  accommodationSchema,
  accomodationTypeSchema,
  addressSchema,
  coordinateSchema,
  detailsSchema,
  peopleAtAccommodationSchema,
} from "../schema/room.schema";

import fs from "fs";
import path from "path";

export const listAccommodation = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const room = await roomModel.create({
      hostId,
    });

    const data = {
      hostId: hostId,
      roomId: room._id,
    };

    producer("update-host", data);

    res.status(200).json({
      success: true,
      message: "Accommodation setup successfully",
      roomId: room._id,
    });
  } catch (error) {
    console.log("something went wrong while creating accomodation type", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating accomodation type",
      error,
    });
  }
};

export const accommodationType = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const { roomType } = accomodationTypeSchema.parse(req.body);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          accommodationType: roomType,
        },
      },
      { upsert: true }
    );

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
    const { roomId } = req.params;
    const {
      flatNo,
      street,
      nearbyLandmark,
      locality,
      country,
      state,
      city,
      pincode,
      coordinates,
    } = addressSchema.parse(req.body);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          location: {
            flatNo,
            street,
            nearbyLandmark,
            locality,
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
    const { roomId } = req.params;
    const {
      adultOccupancy,
      childrenOccupancy,
      bedrooms,
      beds,
      bedroomLock,
      petsAllowed,
    } = accommodationDetailsSchema.parse(req.body);

    await roomModel.updateOne(
      {
        _id: roomId,
      },
      {
        $set: {
          maxGuests: adultOccupancy + childrenOccupancy,
          adultOccupancy,
          childrenOccupancy,
          bedrooms,
          beds,
          bedroomLock,
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
    console.log(req.body);
    const { roomId } = req.params;
    const { sharedWith } = peopleAtAccommodationSchema.parse(req.body);

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
    console.log(req.body);
    const { roomId } = req.params;
    const { amenities } = accommodationAmenitiesSchema.parse(req.body);

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
// export const accommodationImages = async (req: Request, res: Response) => {
//   try {
//     const { roomId } = req.params;
//     const { images } = accommodationPhotoSchema.parse(req.body);

//     await roomModel.updateOne(
//       {
//         _id: roomId,
//       },
//       {
//         $set: {
//           photo: images,
//         },
//       },
//       { upsert: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "updated accommodation photo",
//     });
//   } catch (error) {
//     if (error instanceof ZodError) {
//       res.status(400).json({
//         success: false,
//         error: error,
//       });
//     }

//     console.log("something went wrong while creating photo", error);
//     res.status(500).json({
//       success: false,
//       message: "something went wrong while creating address",
//       error,
//     });
//   }
// };

export const accommodationImages = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    const result = await producer("room-queue", { roomId });

    if (!result) {
      const imagePath = path.join(process.cwd(), "temp-file-store");

      if (fs.existsSync(path.join(imagePath, roomId))) {
        fs.unlinkSync(path.join(imagePath, roomId));
      }

      res.status(500).json({
        success: false,
        message: "something went wrong while uploading the image",
      });
    }

    res.status(200).json({
      success: true,
      message: "accommodation uploaded successfully",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while uploading photo", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while uploading photo",
      error,
    });
  }
};

export const accommodationBasicDetails = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.params;
    const { title, description, basePrice } = detailsSchema.parse(req.body);

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

    console.log(
      "something went wrong while updating accommoadtion details",
      error
    );
    res.status(500).json({
      success: false,
      message: "something went wrong while updating accommoadtion details",
      error,
    });
  }
};

export const accommodationCompleteSetup = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.params;
    const { minimumBookingDays, petsAllowed } = accommodationSchema.parse(
      req.body
    );

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

export const getAccommodationByHostId = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const accommodations = await roomModel.find({ hostId });

    console.log(accommodations);

    res.status(200).json({
      success: true,
      message: "get accommodations successfully",
      accommodations,
    });
  } catch (error) {
    console.log("something went wrong while getting accommodation", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting all host accommodation",
      error,
    });
  }
};

export const getAccommodationSuggestions = async (
  req: Request,
  res: Response
) => {
  try {
    const { lat, lng } = req.query;

    if (!lat || !lng) {
      res.status(400).json({ error: "Latitude and Longitude are required" });
      return;
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);

    const accommodations = await roomModel
      .find({
        "location.geo": {
          $near: {
            $geometry: {
              type: "Poing",
              coordinates: [longitude, latitude],
            },
          },
        },
      })
      .limit(30)
      .select(
        "location.city _id basePrice title childrenOccupancy adultOccupancy photo"
      );

    res.status(200).json({
      success: true,
      message: "get accommodations successfully",
      accommodations,
    });
  } catch (error) {
    console.log(
      "something went wrong while getting accommodation recomendation",
      error
    );
    res.status(500).json({
      success: false,
      message: "something went wrong while getting accommodation recomendation",
      error,
    });
  }
};

export const getAccommodationForBooking = async (
  req: Request,
  res: Response
) => {
  try {
    const { roomId } = req.params;

    const accommodation = await roomModel.findOne({
      _id: roomId,
    });

    res.status(200).json({
      success: true,
      message: "get accommodations successfully",
      accommodation: {
        amenities: accommodation?.amenities.slice(0, 3),
        type: accommodation?.accommodationType,
        title: accommodation?.title,
        basePrice: accommodation?.basePrice,
        photo: accommodation?.photo[0],
        id: accommodation?._id,
      },
    });
  } catch (error) {
    console.log(
      "something went wrong while getting accommodation recomendation",
      error
    );
    res.status(500).json({
      success: false,
      message: "something went wrong while getting accommodation recomendation",
      error,
    });
  }
};
