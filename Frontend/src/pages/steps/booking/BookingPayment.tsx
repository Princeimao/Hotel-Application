import {
  CheckCircle,
  CreditCard,
  Loader,
  Loader2,
  Lock,
  Shield,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import { bookingPageVerification } from "@/api/hotelApi";
import { createPayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { CalculateTax } from "@/utils/taxCalculation";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import type { Booking } from "./BookingPage";

declare global {
  interface Window {
    PhonePeCheckout: any;
  }
}

const BookingPayment = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [processing, setProcessing] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const [room, setRoom] = useState<Booking | null>(null);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const bookingSession = searchParams.get("bookingSession");

  // const user = useSelector((state: RootState) => state.user);
  // const navigate = useNavigate();

  useEffect(() => {
    async function getRoom() {
      if (!roomId) {
        throw new Error("room id is not defined1`");
      }

      if (!bookingSession) {
        throw new Error("session id is not defined1`");
      }
      const response = await bookingPageVerification(roomId, bookingSession);

      if (response.success === false) {
        throw new Error("something went wrong while getting accommodation");
      }

      if (!response.bookingDetails) {
        throw new Error("something went wrong while getting accommodation");
      }

      setRoom({
        accommodation: response.bookingDetails.accommodation,
        bookingIntent: response.bookingDetails.bookingIntent,
      });
    }

    getRoom();
  }, [roomId, bookingSession]);

  if (!room || !bookingSession || !roomId) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  const difference = differenceInDays(
    new Date(room?.bookingIntent.checkOut),
    new Date(room?.bookingIntent.checkIn)
  );
  const total =
    difference * Number(room.accommodation.basePrice) +
    CalculateTax(Number(room.accommodation.basePrice));

  const startPayment = async () => {
    setLoading(true);

    try {
      const res = await createPayment(total);

      // Open PayPage inside your app (IFRAME)
      window.PhonePeCheckout.transact({
        tokenUrl: res.redirectUrl,
        type: "IFRAME",
        callback: (response: string) => {
          console.log("PhonePe response:", response);

          if (response === "USER_CANCEL") {
            alert("Payment Cancelled by User");
          } else if (response === "CONCLUDED") {
            alert("Payment Completed");
          }
        },
      });
    } catch (err) {
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your booking
          </h1>
          <p className="text-gray-600">
            Your information is protected with bank-level security
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Method
              </h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <CreditCard className="w-5 h-5 text-gray-600" />
                  <span className="font-medium">Credit or Debit Card</span>
                </label>

                <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                  <input
                    type="radio"
                    name="payment"
                    value="PhonePe"
                    checked={paymentMethod === "PhonePe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="text-blue-600"
                  />
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg
                      viewBox="0 0 512 512"
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                    >
                      <circle
                        cx="-25.926"
                        cy="41.954"
                        r="29.873"
                        fill="#5f259f"
                        transform="rotate(-76.714 -48.435 5.641) scale(8.56802)"
                      />
                      <path
                        d="M372.164 189.203c0-10.008-8.576-18.593-18.584-18.593h-34.323l-78.638-90.084c-7.154-8.577-18.592-11.439-30.03-8.577l-27.17 8.577c-4.292 1.43-5.723 7.154-2.862 10.007l85.8 81.508H136.236c-4.293 0-7.154 2.861-7.154 7.154v14.292c0 10.016 8.585 18.592 18.592 18.592h20.015v68.639c0 51.476 27.17 81.499 72.931 81.499 14.292 0 25.739-1.431 40.03-7.146v45.753c0 12.87 10.016 22.886 22.885 22.886h20.015c4.293 0 8.577-4.293 8.577-8.586V210.648h32.893c4.292 0 7.145-2.861 7.145-7.145v-14.3zM280.65 312.17c-8.576 4.292-20.015 5.723-28.591 5.723-22.886 0-34.324-11.438-34.324-37.176v-68.639h62.915v100.092z"
                        fill="#fff"
                        fill-rule="nonzero"
                      />
                    </svg>
                  </div>
                  <span className="font-medium">PhonePe</span>
                </label>
              </div>
            </div>

            {/* Card Details Form */}
            {paymentMethod === "card" && (
              <form
                onSubmit={handlePayment}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
              >
                <div className="flex items-center space-x-2 mb-6">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">
                    Your payment information is secure and encrypted
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardDetails.number}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          number: formatCardNumber(e.target.value),
                        })
                      }
                      maxLength={19}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardDetails.expiry}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            expiry: e.target.value,
                          })
                        }
                        maxLength={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardDetails.cvv}
                        onChange={(e) =>
                          setCardDetails({
                            ...cardDetails,
                            cvv: e.target.value,
                          })
                        }
                        maxLength={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardDetails.name}
                      onChange={(e) =>
                        setCardDetails({
                          ...cardDetails,
                          name: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-7 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {processing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Pay &#8377;{total}</span>
                    </>
                  )}
                </Button>
              </form>
            )}

            {paymentMethod === "PhonePe" && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <p className="text-gray-600 mb-4">
                  You will be redirected to PhonePe to complete your payment.
                </p>
                <Button
                  onClick={startPayment}
                  disabled={processing}
                  className="w-full mt-6 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-7 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Processing...
                    </>
                  ) : (
                    "Continue with PhonePe"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-fit sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Order Summary
            </h3>

            <div className="space-y-4">
              <div key={room.accommodation._id} className="flex space-x-3">
                <img
                  src={room.accommodation.photo}
                  alt={room.accommodation.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">
                    {room.accommodation.title}
                  </h4>
                  <p className="text-sm text-gray-600">{difference} nights</p>
                  <p className="text-sm font-medium text-gray-900">
                    &#8377;{room.accommodation.basePrice}
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t mt-6 pt-6 space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>&#8377;{total}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>
                  &#8377;{CalculateTax(Number(room.accommodation.basePrice))}
                </span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Coupon Discount</span>
                <span>&#8377;0.00</span>
              </div>

              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    &#8377;{total}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Free cancellation</p>
                  <p>Cancel before check-in for a full refund</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPayment;
