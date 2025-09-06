import express from "express";
import { createBookingIntent } from "../controller/bookingIntent.controller";

const router = express.Router();

router.route("/create-bookingIntent/:roomId").post(createBookingIntent);

export default router;
