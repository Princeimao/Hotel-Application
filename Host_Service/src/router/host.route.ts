import express from "express";
import {
  getHost,
  getHostByAccommodationId,
  getHostbyId,
  hostAddress,
  hostDetails,
  logout,
  sessionIDVerification,
  signin,
  signin_verify,
  signup,
  signup_verify,
} from "../controller/host.controller";
import { authMiddleware } from "./../middleware/auth.middleware";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signup-verfiy").post(signup_verify);
router.route("/host-details").post(hostDetails);
router.route("/host-address").post(hostAddress);
router.route("/signin").post(signin);
router.route("/signin-verify").post(signin_verify);
router.route("/get-host-Id/:hostId").get(getHostbyId);
router
  .route("/get-host-accommodationId/:accommodationId")
  .get(getHostByAccommodationId);
router.route("/session-verify").post(sessionIDVerification);
router.route("/getHost").get(authMiddleware, getHost);
router.route("/host-logout").get(authMiddleware, logout);

export default router;
