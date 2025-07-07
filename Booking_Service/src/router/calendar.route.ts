import express from "express";
import { getCalendarAvailability } from "../controller/calendar.controller";

const router = express.Router();

router.route("/calendar-availability/:roomId").get(getCalendarAvailability);

export default router;
