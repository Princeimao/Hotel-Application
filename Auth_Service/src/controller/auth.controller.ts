import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { ZodError } from "zod";
import { prisma } from "../db/prisma.client";
import { redis } from "../db/redis.client";
import {
  phoneSchema,
  signup_verifySchema,
  userSchema,
} from "../schemas/auth.schema";
import { sendOtp } from "../service/twilio.service";
import { generateOTP } from "../utils/generateOtp";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { phone } = phoneSchema.parse(req.body);
    if (!phone) {
      res.status(400).json({
        success: false,
        message: "Phone Number Is Required Field",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User Already Exist",
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

    console.log("something went wrong while creating user", error);
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

    console.log("something went wrong");
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, gender } = userSchema.parse(req.body);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        isPhoneVerified: true,
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

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
        sub: user.id,
        email: user.email,
        phone: user.phone,
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

    res.status(200).json({
      success: true,
      message: "User created Successfully",
      user: user,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        success: false,
        error: error,
      });
    }

    console.log("something went wrong");
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { phone } = phoneSchema.parse(req.body);
    if (!phone) {
      res.status(400).json({
        success: false,
        message: "Phone Number Is Required Field",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        phone: phone,
      },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not exist",
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
      id: user.id,
      email: user.email,
      otp: otp,
    });
    await redis.expire(`phone:${phone}`, 300);

    if (process.env.NODE_ENV === "production") {
      sendOtp(otp, phone); // TODO: send otp through worker process
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
      message: "something went wrong while sign-in user",
    });
  }
};

export const signin_verify = async (req: Request, res: Response) => {
  try {
    const { otp: userOtp, phone } = signup_verifySchema.parse(req.body);

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

    if (data.otp !== userOtp) {
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
        sub: data.id,
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

    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
      return;
    }

    const { jti } = req.user;

    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies["AccessToken"];

    redis.set(`BlackList:${jti}`, token, {
      EX: 60 * 60 * 60,
    });

    res.clearCookie("AccessToken");
    res.status(200).json({
      success: true,
      message: "logout successfully",
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while verifying otp",
    });
  }
};
