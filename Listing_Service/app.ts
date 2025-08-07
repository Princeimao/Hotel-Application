import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// Public Routes
import fileUpload from "./src/routes/fileUploda.route";
import roomRoute from "./src/routes/room.route";
import seasonRoute from "./src/routes/season.route";

app.use("/", roomRoute);
app.use("/", seasonRoute);
app.use("/", fileUpload);
