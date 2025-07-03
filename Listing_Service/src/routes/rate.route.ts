import express from "express";
import {
  createRate,
  getRates,
  updateRate,
} from "./../controller/rate.controller";

const router = express.Router();

router.route("/createRate/:hostId").post(createRate);
router.route("/updateRate/:rateId").post(updateRate);
router.route("/getRates/:hostId").get(getRates);

export default router;
