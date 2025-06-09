import express from "express";
import { signup, signup_verify } from "../controller/host.controller";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signup-verfiy").post(signup_verify);

export default router;
