import express from "express";
import {
  createBookingIntent,
  getAccommodationDetails,
  getHostDetails,
} from "../controller/aggregate.controller";

const router = express.Router();

router
  .route("/accommodation-details/:accommodationId")
  .get(getAccommodationDetails);
router.route("/host-details/:hostId").get(getHostDetails);
router.route("/create-bookingIntent").post(createBookingIntent);

export default router;
