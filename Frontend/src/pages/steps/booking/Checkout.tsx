import { bookingPageVerification } from "@/api/hotelApi";
import { Button } from "@/components/ui/button";
import type { BookingIntent } from "@/types/booking.type";
import type { BookingRoomDetials } from "@/types/hotel.types";
import { CalculateTax } from "@/utils/taxCalculation";
import { differenceInDays, format } from "date-fns";
import { Calendar, Loader, MapPin, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Booking {
  accommodation: BookingRoomDetials;
  bookingIntent: BookingIntent;
}

export default function Checkout() {
  const [searchParams] = useSearchParams();
  const [room, setRoom] = useState<Booking | null>(null);
  const roomId = searchParams.get("roomId");
  const bookingSession = searchParams.get("bookingSession");
  const navigate = useNavigate();

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

  if (!room || !roomId || !bookingSession) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Review your booking
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={room.accommodation.photo}
                  alt={room.accommodation.title}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {room.accommodation.title} |{" "}
                      {room.accommodation.type.toUpperCase()}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>New Delhi</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(new Date(room.bookingIntent.checkIn), "MMM dd")}{" "}
                        -{" "}
                        {format(new Date(room.bookingIntent.checkIn), "MMM dd")}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>
                        {Number(room.bookingIntent.guests?.adults) +
                          Number(room.bookingIntent.guests?.adults)}{" "}
                        guests
                      </span>
                    </div>

                    <div className="text-gray-600">
                      <span>
                        {difference} night
                        {difference !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end">
                    <div className="text-sm text-gray-600">
                      &#8377;{room.accommodation.basePrice} × {difference} night
                      {difference !== 1 ? "s" : ""}
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                      &#8377;{Number(room.accommodation.basePrice) * difference}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Booking Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    &#8377;{difference * Number(room.accommodation.basePrice)}
                    .00
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Taxes</span>
                  <span>
                    {" "}
                    &#8377;{CalculateTax(Number(room.accommodation.basePrice))}
                  </span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Coupon Discount</span>
                  <span>
                    <p>&#8377;0.00</p>
                  </span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      &#8377;
                      {total}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                onClick={() =>
                  navigate(
                    `/booking-payment/?${new URLSearchParams({
                      roomId: roomId,
                      bookingSession: bookingSession,
                    })}`
                  )
                }
                className="w-full h-12 bg-red-500 hover:bg-red-600 active:bg-red-700"
              >
                Proceed to Payment
              </Button>

              <p className="text-center text-sm text-gray-600 mt-4">
                Free cancellation before check-in
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
