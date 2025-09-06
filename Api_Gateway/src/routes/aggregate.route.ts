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
router
  .route("/get-bookingIntent-details/:roomId/:sessionId")
  .get(createBookingIntent);

export default router;
