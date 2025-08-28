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
  getAccommodationSuggestions,
  listAccommodation,
  peopleAtAccommodation,
} from "../controller/room.controller";
import { upload } from "../middleware/multer";
import { authMiddleware } from "./../middleware/auth.middleware";

const router = express.Router();

router
  .route("/list-accommodation/:hostId")
  .post(authMiddleware, listAccommodation);
router
  .route("/accommodation-type/:roomId")
  .post(authMiddleware, accommodationType);
router
  .route("/accommodation-address/:roomId")
  .post(authMiddleware, accommodationAddress);
router
  .route("/accommodation-details/:roomId")
  .post(authMiddleware, accommodationDetails);
router
  .route("/accommodation-people/:roomId")
  .post(authMiddleware, peopleAtAccommodation);
router
  .route("/accommodation-amenities/:roomId")
  .post(authMiddleware, accommodationAmenities);
router
  .route("/accommodation-images/:roomId")
  .post(authMiddleware, upload.array("roomImages"), accommodationImages);
router
  .route("/accommodation-baiscDetails/:roomId")
  .post(authMiddleware, accommodationBasicDetails);
router
  .route("/accommodation-complete/:roomId")
  .post(authMiddleware, accommodationCompleteSetup);

router.route("/get-accommodation/:roomId").get(getAccommodation);
router
  .route("/get-accommodations")
  .get(authMiddleware, getAccommodationsByArea);
router
  .route("/get-accommodation-hostId/:hostId")
  .get(authMiddleware, getAccommodationByHostId);
router.route("/get-accommodation-suggestion").get(getAccommodationSuggestions);

export default router;
