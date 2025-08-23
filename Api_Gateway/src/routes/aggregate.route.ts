import express from "express";
import { getAccommodationDetails } from "../controller/aggregate.controller";

const router = express.Router();

router
  .route("/accommodation-details/:accommodationId")
  .get(getAccommodationDetails);

export default router;
