import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
  sub: string;
  email: string;
  phone: string;
  jti: string;
  iat: number;
  exp: number;
}

interface AuthenticatedRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.cookies["AccessToken"];

    if (!token) {
      res.status(400).json({
        success: false,
        message: "Unauthorized Request",
      });
      return;
    }

    if (!process.env.JWT_ACCESS_TOKEN_SECRET) {
      res.status(500).json({
        success: false,
        message: "JWT Secret not found: Auth Middleware",
      });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_TOKEN_SECRET
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    console.log("something went wrong: Auth middleware", error);
    res.status(500).json({
      success: false,
      message: "something went wrong: Auth middleware",
    });
  }
};
