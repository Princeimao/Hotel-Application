import express from "express";
import { getCalendarAvailability } from "../controller/calendar.controller";
import { madePayment } from "../controller/payment.controller";

const router = express.Router();

router.route("/create-payment").post(madePayment);

export default router;
