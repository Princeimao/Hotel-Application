import cors from "cors";
import express from "express";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Importing Routes
import userRouter from "./src/router/user.route";

app.use("/api/v1/user", userRouter);
