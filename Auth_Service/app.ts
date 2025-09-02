import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

//Importing Routes
import userRouter from "./src/router/user.route";
app.use("/", userRouter);
