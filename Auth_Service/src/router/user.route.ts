import express from "express";
import {
  registerUser,
  signUp,
  signup_verify,
} from "../controller/user.controller";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signup-verify").post(signup_verify);
router.route("/create-user").post(registerUser);

export default router;
