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

// routes
import hostRoute from "./src/router/host.route";

app.use("/", hostRoute);
