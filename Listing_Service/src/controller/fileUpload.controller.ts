import { Request, Response } from "express";
import { redis } from "../db/redis.client";
import { imagekit } from "../utils/imageKit";

export const uploadToken = async (req: Request, res: Response) => {
  try {
    const { phone } = req.hostUser;

    const result = await redis.json.get(`Listing:${phone}`, { path: "$" });

    if (result) {
      res.status(200).json({
        success: true,
        message: "get token successfully",
        imageKit: {
          result,
        },
      });
    }

    const { token, expire, signature } = imagekit.getAuthenticationParameters();

    await redis.json.set(`Listing:${phone}`, "$", {
      token,
      expire,
      signature,
    });

    res.status(200).json({
      success: true,
      message: "get token successfully",
      imageKit: {
        token,
        expire,
        signature,
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      },
    });
  } catch (error) {
    console.log("something went wrong while uploading the image", error);
    res.status(500).json({
      success: false,
      message: "something went wrong while uploading the image",
    });
  }
};
