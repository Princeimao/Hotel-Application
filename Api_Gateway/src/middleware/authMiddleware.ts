import { NextFunction, Request, Response } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      res.status(400).json({ success: false, message: "Unauthorized Request" });
      return;
    }

    req.headers.authorization = `Bearer ${token}`;

    next();
  } catch (error) {
    console.log(
      "something went wrong while authenticating user, middleware",
      error
    );
  }
};
