import express from "express";
import {
  logout,
  registerUser,
  signIn,
  signin_verify,
  signUp,
  signup_verify,
} from "../controller/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signup-verify").post(signup_verify);
router.route("/create-user").post(registerUser);
router.route("/signin").post(signIn);
router.route("/signin-verify").post(signin_verify);
router.route("/logout").post(authMiddleware, logout);

export default router;
