import express from "express";
import { createBooking } from "../controller/booking.controller";

const router = express.Router();

router.route("/create-booking/:sessionId").post(createBooking);

export default router;
