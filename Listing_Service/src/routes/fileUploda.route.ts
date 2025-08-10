import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { uploadToken } from "./../controller/fileUpload.controller";

const router = express.Router();

router.route("/upload-token").get(authMiddleware, uploadToken);

export default router;
