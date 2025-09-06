import express from "express";
import {
  createBookingIntent,
  sessionVerification,
} from "../controller/bookingIntent.controller";

const router = express.Router();

router.route("/create-bookingIntent/:roomId").post(createBookingIntent);
router.route("/bookingIntent-verification/:sessionId").get(sessionVerification);

export default router;
