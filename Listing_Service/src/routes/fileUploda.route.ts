import express from "express";
import { uploadToken } from "./../controller/fileUpload.controller";

const router = express.Router();

router.route("/upload-token").get(uploadToken);

export default router;
