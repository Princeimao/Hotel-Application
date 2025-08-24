import { fetchRoomDetails } from "@/api/hotelApi";
import { amenitiesMap } from "@/constants/amenitiesMap";
import type { Room } from "@/types/hotel.types";
import { addDays, differenceInDays, format, isValid, parse } from "date-fns";
import { Heart, Loader, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);
  const [room, setRoom] = useState<Room>();

  useEffect(() => {
    async function hotelDetails() {
      if (!id) return;

      const response = await fetchRoomDetails(id);
      console.log(response);

      if (response.success === false) {
        throw new Error("something went wrong while getting room");
      }

      if (!response.roomDetails) {
        throw new Error("something went wrong while getting room");
      }

      setRoom({
        listing: response.roomDetails.listing.room,
        host: response.roomDetails.host.host,
        bookings: response.roomDetails.bookings,
      });
    }

    hotelDetails();
  }, [id]);

  // const calculateTotal = useCallback(() => {
  //   if (!checkIn || !checkOut) return 0;
  //   const days = differenceInDays(checkOut, checkIn);
  //   return days * Number(room?.);
  // }, [checkIn, checkOut, room?.basePrice]);

  // useEffect(() => {
  //   const checkInString = searchParams.get("checkIn");
  //   const checkOutString = searchParams.get("checkOut");

  //   if (checkInString && checkOutString) {
  //     const parseCheckIn = parse(checkInString, "dd-MM-yyyy", new Date());
  //     const parseCheckOut = parse(checkOutString, "dd-MM-yyyy", new Date());

  //     if (isValid(parseCheckIn) && isValid(parseCheckOut)) {
  //       //setCheckIn(parseCheckIn);
  //       // setCheckOut(parseCheckOut);
  //     }
  //   }
  //   calculateTotal();
  // }, [searchParams, calculateTotal]);

  if (room === undefined) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {room?.listing.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{room?.listing.location.city}</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="lg:row-span-2">
            <img
              src={room?.listing.photo[0]}
              alt={room?.listing.title}
              className="w-full h-100 object-cover "
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {room?.listing.photo.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${room?.listing.title} ${index + 2}`}
                className="w-full h-48 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Hosted by {room?.host.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600 mt-1">
                    <span>{room?.listing.maxGuests} guests</span>
                    <span>{room?.listing.bedrooms} bedrooms</span>
                    <span>{room?.listing.beds} beds</span>
                  </div>
                </div>
                {/* <img
                  src={room.}
                  alt={room.}
                  className="w-16 h-16 rounded-full object-cover"
                /> */}
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {room?.listing.description && (
                  <div
                    className="prose lg:prose-xl prose-neutral max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: room.listing.description,
                    }}
                  />
                )}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Amenitie amenities={room?.listing.amenities} />
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    &#8377;{room?.listing.basePrice}
                  </span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <button className="text-red-600 hover:text-red-700 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const parsed = parse(
                          e.target.value,
                          "yyyy-MM-dd",
                          new Date()
                        );
                        if (isValid(parsed)) setCheckIn(parsed);
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
                      min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                      onChange={(e) => {
                        const parsed = parse(
                          e.target.value,
                          "yyyy-MM-dd",
                          new Date()
                        );
                        if (isValid(parsed)) setCheckOut(parsed);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[...Array(room?.listing.maxGuests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      ${room?.listing.basePrice} x{" "}
                      {differenceInDays(checkOut, checkIn)} nights
                    </span>
                    {/* <span>${calculateTotal()}</span> */}
                  </div>

                  <div className="flex items-center justify-between font-semibold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>
                      {/* ${calculateTotal() + Math.round(calculateTotal() * 0.1)} */}
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium">
                Reserve Now
              </button>

              <p className="text-sm text-gray-600 text-center mt-3">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;

export const Amenitie = ({
  amenities,
}: {
  amenities: string[] | undefined;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {amenities?.map((key) => {
        const amenity = amenitiesMap[key];
        if (!amenity) return null;

        return (
          <div key={key} className="flex items-center gap-2">
            {amenity.icon}
            <span className="text-sm text-gray-700">{amenity.label}</span>
          </div>
        );
      })}
    </div>
  );
};
