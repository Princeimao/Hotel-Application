import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import expressProxy from "express-http-proxy";

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
import aggregateRouter from "./src/routes/aggregate.route";

app.get("/", (req, res) => {
  res.send("working");
});

app.use("/api/v1/user", expressProxy(process.env.AUTH_SERVICE_URL!));
app.use("/api/v1/host", expressProxy(process.env.HOST_SERVICE_URL!));
app.use("/api/v1/listing", expressProxy(process.env.LISTING_SERVICE_URL!));
app.use("/api/v1/booking", expressProxy(process.env.BOOKING_SERVICE_URL!));

app.use("/api/v1/overview", aggregateRouter);
