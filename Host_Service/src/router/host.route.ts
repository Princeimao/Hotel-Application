import express from "express";
import {
  getHostByAccommodationId,
  getHostbyId,
  hostAddress,
  hostDetails,
  sessionIDVerification,
  signin,
  signin_verify,
  signup,
  signup_verify,
} from "../controller/host.controller";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signup-verfiy").post(signup_verify);
router.route("/host-details").post(hostDetails);
router.route("/host-address").post(hostAddress);
router.route("/signin").post(signin);
router.route("/signin-verify").post(signin_verify);
router.route("/get-host-Id/:hostId").get(getHostbyId);
router
  .route("/get-host-accommodationId/:accommodationid")
  .get(getHostByAccommodationId);
router.route("/session-verify").post(sessionIDVerification)

export default router;
