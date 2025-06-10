import express from "express";
import {
  hostAddress,
  hostDetails,
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

export default router;
