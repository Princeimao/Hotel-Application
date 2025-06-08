import express from "express";
import {
  registerUser,
  signIn,
  signin_verify,
  signUp,
  signup_verify,
} from "../controller/auth.controller";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signup-verify").post(signup_verify);
router.route("/create-user").post(registerUser);
router.route("/signin").post(signIn);
router.route("/signin-verify").post(signin_verify);

export default router;
