import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://authorization-sticks-champions-circle.trycloudflare.com",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

// routes
import bookingIntentRoute from "./src/router/bookingIntent.route";
import calendarRoute from "./src/router/calendar.route";
import paymentRoute from "./src/router/payment.route";

app.use("/", calendarRoute);
app.use("/", bookingIntentRoute);
app.use("/payment", paymentRoute);
