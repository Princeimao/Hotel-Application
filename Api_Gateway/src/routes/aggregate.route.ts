import express from "express";
import {
  getAccommodationDetails,
  getHostDetails,
} from "../controller/aggregate.controller";
import { authMiddleware } from "../middleware/authMiddleware";


const router = express.Router();

router
  .route("/accommodation-details/:accommodationId")
  .get(getAccommodationDetails);

router.route("/host-details/:hostId").get(authMiddleware, getHostDetails);

export default router;
