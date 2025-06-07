import { Request, Response } from "express";
import { ZodError } from "zod";
import { prisma } from "../db/prisma.client";
import { redis } from "../db/redis.client";
import { signup_verifySchema, signupSchema } from "../schemas/auth.schema";
import { sendOtp } from "../service/twilio.service";
import { generateOTP } from "../utils/generateOtp";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { phone } = signupSchema.parse(req.body);
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

    const otp = generateOTP();
    await redis.set(`phone:${phone}`, otp, {
      EX: 300,
    });

    if (process.env.NODE_ENV === "production") {
      sendOtp(otp, phone);
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

