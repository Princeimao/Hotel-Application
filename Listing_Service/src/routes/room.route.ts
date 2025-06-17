import express from "express";
import {
  accommodationAddress,
  accommodationType,
} from "../controller/room.controller";

const router = express.Router();

router.route("/accommodation-type").post(accommodationType);
router.route("/accommodation-address").post(accommodationAddress);

export default router;
