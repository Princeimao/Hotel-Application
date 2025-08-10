import { Request, Response } from "express";
import { redis } from "../db/redis.client";
import { imagekit } from "../utils/imageKit";

type ImageKitAuth = {
  expire: number;
  token: string;
  signature: string;
};

export const uploadToken = async (req: Request, res: Response) => {
  try {
    const { phone } = req.hostUser;

    const result = (await redis.json.get(`Listing:${phone}`, { path: "$" })) as
      | ImageKitAuth[]
      | null;

    if (result) {
      res.status(200).json({
        success: true,
        message: "get token successfully",
        imageKit: {
          ...result[0],
          publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        },
      });
      return;
    }

    const { token, expire, signature } = imagekit.getAuthenticationParameters();

    await redis.json.set(`Listing:${phone}`, "$", {
      token,
      expire,
      signature,
    });

    redis.expire(`Listing:${phone}`, 3600);

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
