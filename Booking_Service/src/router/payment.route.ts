import express from "express";
import { madePayment } from "../controller/payment.controller";

const router = express.Router();

router.route("/create-payment/:sessionId").post(madePayment);

export default router;
