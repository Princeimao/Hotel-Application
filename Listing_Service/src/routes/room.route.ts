import express from "express";
import {
  accommodationAddress,
  accommodationAmenities,
  accommodationBasicDetails,
  accommodationCompleteSetup,
  accommodationDetails,
  accommodationImages,
  accommodationType,
  getAccommodation,
  getAccommodationByHostId,
  getAccommodationsByArea,
  peopleAtAccommodation,
} from "../controller/room.controller";

const router = express.Router();

router.route("/accommodation-type/:hostId").post(accommodationType);
router.route("/accommodation-address/:hostId").post(accommodationAddress);
router.route("/accommodation-details/:hostId").post(accommodationDetails);
router.route("/accommodation-people/:hostId").post(peopleAtAccommodation);
router.route("/accommodation-amenities/:hostId").post(accommodationAmenities);
router.route("/accommodation-images/:hostId").post(accommodationImages);
router
  .route("/accommodation-baiscDetails/:hostId")
  .post(accommodationBasicDetails);
router.route("/accommodation-metaData/:hostId").post(accommodationBasicDetails);
router
  .route("/accommodation-complete/:hostId")
  .post(accommodationCompleteSetup);

router.route("/get-accommodation/:roomId").get(getAccommodation);
router.route("/get-accommodations").get(getAccommodationsByArea);
router.route("/get-accommodation-hostId/:hostId").get(getAccommodationByHostId);

export default router;
