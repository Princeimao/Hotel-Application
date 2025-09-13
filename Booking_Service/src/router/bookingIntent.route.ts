import express from "express";
import {
  createBookingIntent,
  sessionVerification,
  userDetails,
} from "../controller/bookingIntent.controller";

const router = express.Router();

router.route("/create-bookingIntent/:roomId").post(createBookingIntent);
router.route("/update-bookingIntent/:sessionId").post(userDetails);
router.route("/bookingIntent-verification/:sessionId").get(sessionVerification);

export default router;
