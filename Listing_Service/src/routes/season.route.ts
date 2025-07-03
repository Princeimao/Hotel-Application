import express from "express";
import {
  createSeason,
  getSeasons,
  updateSeason,
} from "../controller/season.controller";

const router = express.Router();

router.route("/createSeason/:hostId").post(createSeason);
router.route("/updateSeason/:seasonId").post(updateSeason);
router.route("/getSeasons/:hostId").get(getSeasons);

export default router;
