import axios from "axios";
import { Request, Response } from "express";
import bookingModel from "../models/booking.model";
import bookingIntentModel from "../models/bookingIntent.model";

interface TokenResponse {
  access_token: string;
  issued_at: number;
  expires_at: number;
  token_type: string;
}

const getAccessToken = async (): Promise<TokenResponse | null> => {
  const requestHeaders = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  const requestBodyJson = {
    client_version: process.env.PHONEPE_CLIENT_VERSION!,
    grant_type: process.env.PHONEPE_GRANT_TYPE!,
    client_id: process.env.PHONEPE_CLIENT_ID!,
    client_secret: process.env.PHONEPE_CLIENT_SECRET!,
  };

  const requestBody = new URLSearchParams(requestBodyJson).toString();

  const options = {
    method: "POST",
    url: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
    headers: requestHeaders,
    data: requestBody,
  };

  try {
    const tokenRequest = await axios.request(options);

    return tokenRequest.data;
  } catch (error) {
    console.log("error while fetching access token", error);
    return null;
  }
};

export const madePayment = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    const { amount, metaData } = req.body;
    const merchantOrderId = crypto.randomUUID();
    const amountInPaise = Number(amount) * 100;

    const accessToken = await getAccessToken();
    if (!accessToken) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    // Finding the Booking Intent
    const bookingIntent = await bookingIntentModel.findById(sessionId);
    if (!bookingIntent) {
      res.status(500).json({
        success: false,
        message:
          "Internal Server error, booking faild - Booking Intent not found",
      });
      return;
    }

    // Creating Booking as Pending
    const booking = await bookingModel.create({
      firstName: bookingIntent.firstName,
      lastName: bookingIntent.lastName,
      email: bookingIntent.email,
      country: bookingIntent.country,
      phone: bookingIntent.phone,
      bookingFor: bookingIntent.bookingFor,
      checkOut: bookingIntent.checkOut,
      coupon: false,
      bookingStatus: "pending",
      specialRequest: bookingIntent.specialRequest,
      isPaid: true,
      paymentId: merchantOrderId,
      totalPrice: amount,
      guests: {
        adults:
          bookingIntent?.guests === null || bookingIntent?.guests === undefined
            ? 0
            : bookingIntent?.guests.adults,
        children:
          bookingIntent?.guests === null || bookingIntent?.guests === undefined
            ? 0
            : bookingIntent?.guests.children,
        infants:
          bookingIntent?.guests === null || bookingIntent?.guests === undefined
            ? 0
            : bookingIntent?.guests.infants,
        pets:
          bookingIntent?.guests === null || bookingIntent?.guests === undefined
            ? 0
            : bookingIntent?.guests.pets,
      },
      roomId: bookingIntent.roomId,
      userId: bookingIntent.userId,
    });

    // MAKING PAYMENT

    const paymentResponse = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay",
      {
        merchantOrderId,
        amount: amountInPaise,
        metaInfo: metaData,
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Payment message used for collect requests",
          merchantUrls: {
            redirectUrl: `http://localhost/3000/api/v1/booking/payment/callback/${merchantOrderId}`,
          },
        },
      },
      {
        headers: {
          Authorization: `O-Bearer ${accessToken.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "get redirect url",
      redirectUrl: paymentResponse.data.redirectUrl,
    });
  } catch (error) {
    console.log("something went wrong while processing payment", error);
  }
};
