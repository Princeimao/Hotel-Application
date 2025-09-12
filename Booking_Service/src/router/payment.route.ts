import express from "express";
import { generateToken, madePayment } from "../controller/payment.controller";

const router = express.Router();

router.route("/create-payment").post(madePayment);
router.route("/phonePe/token").post(generateToken);

export default router;
