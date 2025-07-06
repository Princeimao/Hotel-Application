import { HostGender } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { prisma } from "../db/prisma.client";
import { redis } from "../db/redis.client";
import {
  addressSchema,
  hostDetailSchema,
  phoneSchema,
  signup_verifySchema,
} from "../schema/host.schema";
import { sendOtp } from "../service/twilio.service";
import { generateOTP } from "../utils/generateOtp";

export const signup = async (req: Request, res: Response) => {
  try {
    const { phone } = phoneSchema.parse(req.body);
    if (!phone) {
      res.status(400).json({
        success: false,
        message: "Phone Number Is Required Field",
      });
    }

    const existingHost = await prisma.host.findUnique({
      where: {
        phone: phone,
      },
    });

    if (existingHost) {
      res.status(400).json({
        success: false,
        message: "Host Already Exist",
      });
      return;
    }

    const existingOtp = await redis.get(`phone:${phone}`);
    if (existingOtp) {
      res.status(400).json({
        success: false,
        message: "Please try after 5 minutes",
      });
      return;
    }

    const otp = generateOTP();
    await redis.set(`phone:${phone}`, otp, {
      EX: 300,
    });

    if (process.env.NODE_ENV === "production") {
      sendOtp(otp, phone); //  TODO: send otp through worker process
    }

    res.status(200).json({
      success: true,
      message: `Your otp is ${otp}`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while creating host", error);
    res.status(500);
  }
};

export const signup_verify = async (req: Request, res: Response) => {
  try {
    const { otp: userOtp, phone } = signup_verifySchema.parse(req.body);

    const otp = await redis.get(`phone:${phone}`);

    if (!otp) {
      res.status(400).json({
        success: false,
        message: "Otp Expired",
      });
      return;
    }

    if (Number(otp) !== userOtp) {
      res.status(400).json({
        success: false,
        message: "Incorrect Otp",
      });
      return;
    }

    res.status(400).json({
      success: true,
      message: "Successfull",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const hostDetails = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, gender } = hostDetailSchema.parse(req.body);

    await redis.json.set(`HOST:${phone}`, "$", {
      name: name,
      email: email,
      gender: gender,
    });

    res.status(200).json({
      success: true,
      message: "Successfully created",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while saving user details",
    });
  }
};

// one route comes before address which was to add photo which saved in the redis for the first and it was an optional field

interface PreviousFields {
  name: string;
  email: string;
  gender: HostGender;
}

export const hostAddress = async (req: Request, res: Response) => {
  try {
    const { houseAddress, city, country, state, pincode, phone } =
      addressSchema.parse(req.body);

    const result = (await redis.json.get(`HOST:${phone}`, {
      path: "$",
    })) as unknown;

    const [previousField] = result as [PreviousFields];

    const host = await prisma.host.create({
      data: {
        name: previousField.name,
        email: previousField.email,
        gender: previousField.gender,
        phone: phone,
        isPhoneVerified: true,
        houseAddress: houseAddress,
        city: city,
        country: country,
        state: state,
        pincode: pincode,
      },
      select: {
        id: true,
        phone: true,
        name: true,
      },
    });

    const jti = uuidv4();

    const accessToken = jwt.sign(
      {
        sub: host.id,
        phone: host.phone,
        name: host.name,
        jti: jti,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("AccessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60,
    });

    res.status(200).json({
      success: true,
      message: "User created Successfully",
      host: host,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while creating host",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { phone } = phoneSchema.parse(req.body);
    if (!phone) {
      res.status(400).json({
        success: false,
        message: "Phone Number Is Required Field",
      });
    }

    const host = await prisma.host.findUnique({
      where: {
        phone: phone,
      },
    });

    if (!host) {
      res.status(400).json({
        success: false,
        message: "Host Not found",
      });
      return;
    }

    const existingOtp = await redis.get(`phone:${phone}`);
    if (existingOtp) {
      res.status(400).json({
        success: false,
        message: "Please try after 5 minutes",
      });
      return;
    }

    const otp = generateOTP();
    await redis.json.set(`phone:${phone}`, "$", {
      sub: host.id,
      email: host.email,
      otp: otp,
    });
    await redis.expire(`phone:${phone}`, 300);

    if (process.env.NODE_ENV === "production") {
      sendOtp(otp, phone); //  TODO: send otp through worker process
    }

    res.status(200).json({
      success: true,
      message: `Your otp is ${otp}`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while signin host",
    });
  }
};

export const signin_verify = async (req: Request, res: Response) => {
  try {
    const { otp: hostOtp, phone } = signup_verifySchema.parse(req.body);

    //@ts-ignore
    const [data] = await redis.json.get(`phone:${phone}`, {
      path: "$",
    });

    if (!data) {
      res.status(400).json({
        success: false,
        message: "Otp Expired",
      });
      return;
    }

    if (data.otp !== hostOtp) {
      res.status(400).json({
        success: false,
        message: "Incorrect Otp",
      });
      return;
    }

    if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
      res.status(500).json({
        success: false,
        message: "Internal server error: Jwt secret not found",
      });
      return;
    }

    const jti = uuidv4();
    // TODO: Also Generate Refresh Token For Long Authentication
    const AccessToken = jwt.sign(
      {
        sub: data.sub,
        email: data.email,
        phone: phone,
        jti: jti,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1h", // change that to env variabel
      }
    );

    res.cookie("AccessToken", AccessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 60,
    });

    res.status(400).json({
      success: true,
      message: "Successfull",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong while verifying otp", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const getHostbyId = async (req: Request, res: Response) => {
  try {
    const { hostId } = req.params;

    const host = await prisma.host.findUnique({
      where: {
        id: hostId,
      },
      select: {
        phone: true,
        name: true,
        id: true,
        profileImage: true,
        gender: true,
        houseAddress: true,
        city: true,
        country: true,
        state: true,
        pincode: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "host found succesfully",
      host: host,
    });
  } catch (error) {
    console.log("something went wrong while getting the host", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while getting the host",
    });
  }
};

export const getHostByAccommodationId = async (req: Request, res: Response) => {
  try {
    const { accommodationId } = req.params;

    const host = await prisma.host.findFirst({
      where: {
        accommodationId: {
          has: accommodationId,
        },
      },
      select: {
        phone: true,
        name: true,
        id: true,
        profileImage: true,
        gender: true,
        houseAddress: true,
        city: true,
        country: true,
        state: true,
        pincode: true,
        createdAt: true,
      },
    });

    res.status(200).json({
      success: true,
      message: "host found succesfully",
      host: host,
    });
  } catch (error) {
    console.log(
      "something went wrong while getting the host - accommodation Id",
      error
    );
    res.status(500).json({
      success: false,
      message: "something went wrong while getting the host - accommodation Id",
    });
  }
};
