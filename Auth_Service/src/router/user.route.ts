import express from "express";
import { signUp, signup_verify } from "../controller/user.controller";

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signup-verify").post(signup_verify);

export default router;
