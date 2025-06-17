import express from "express";
import {
  accommodationAddress,
  accommodationDetails,
  accommodationType,
} from "../controller/room.controller";

const router = express.Router();

router.route("/accommodation-type").post(accommodationType);
router.route("/accommodation-address").post(accommodationAddress);
router.route("/accommodation-details").post(accommodationDetails);

export default router;
