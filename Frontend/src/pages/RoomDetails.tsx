import { fetchRoomDetails } from "@/api/hotelApi";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { amenitiesMap } from "@/constants/amenitiesMap";
import type { Room } from "@/types/hotel.types";
import { differenceInDays, format, parse } from "date-fns";
import { Calendar, ChevronDown, Heart, Loader, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ReactMarkDown from "react-markdown";
import { Link, useParams, useSearchParams } from "react-router-dom";
import remarkGfm from "remark-gfm";

const RoomDetails = () => {
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const [room, setRoom] = useState<Room>();

  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const adults = searchParams.get("adults");

  if (!checkIn || !checkOut || !adults) {
    throw new Error("Date missing");
  }
  const [query, setQuery] = useState<{
    adults: number;
    children: number;
    infants: number;
    pets: number;
  }>({
    adults: Number(adults),
    children: 0,
    infants: 0,
    pets: 0,
  });
  const [dateRange, setDateRange] = useState([
    {
      startDate: parse(checkIn, "dd-MM-yyyy", new Date()),
      endDate: parse(checkOut, "dd-MM-yyyy", new Date()),
      key: "selection",
    },
  ]);
  console.log(dateRange, checkIn);

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
                className="w-full h-49 object-cover"
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
                <Link to={`/host-profile/${room.host.id}`}>
                  <img
                    src={
                      room.host.profileImage === null
                        ? "https://github.com/shadcn.png"
                        : room.host.profileImage
                    }
                    alt={room.host.id}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </Link>
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              {room?.listing.description && (
                <ReactMarkDown remarkPlugins={[remarkGfm]}>
                  {room.listing.description}
                </ReactMarkDown>
              )}
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center justify-between w-full text-sm cursor-pointer text-gray-900 rounded-xl border-1 border-gray-500 p-3 focus:ring-0 focus:outline-none bg-transparent">
                          <p className="">
                            {format(dateRange[0].startDate, "dd/MM/yyyy")}
                          </p>
                          <Calendar size={19} />
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="p-4 w-auto mt-6">
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDateRange([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dateRange}
                          months={2}
                          direction="horizontal"
                          minDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex items-center justify-between w-full text-sm cursor-pointer text-gray-900 rounded-xl border-1 border-gray-500 p-3 focus:ring-0 focus:outline-none bg-transparent">
                          <p className="">
                            {format(dateRange[0].endDate, "dd/MM/yyyy")}
                          </p>
                          <Calendar size={19} />
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="p-4 w-auto mt-6">
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDateRange([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dateRange}
                          months={2}
                          direction="horizontal"
                          minDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <div className="flex-1 p-1 w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex w-full p-3 text-sm font-medium text-gray-700 mb-1 border-2 border-gray-500 rounded-xl items-center justify-between">
                          <div className="">
                            Guests
                            <p className="w-full text-sm cursor-pointer text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent">
                              {(() => {
                                const guests: string[] = [];

                                if (query.adults + query.children > 0) {
                                  guests.push(
                                    `Adults: ${query.adults + query.children}`
                                  );
                                }
                                if (query.infants > 0) {
                                  guests.push(`Infants: ${query.infants}`);
                                }
                                if (query.pets > 0) {
                                  guests.push(`Pets: ${query.pets}`);
                                }

                                return guests.length > 0
                                  ? guests.join(", ")
                                  : "Add Guest";
                              })()}
                            </p>
                          </div>
                          <ChevronDown />
                        </div>
                      </PopoverTrigger>

                      <PopoverContent className="w-80 min-h-80">
                        <div className="w-full">
                          <div className="w-full flex justify-between items-center h-18">
                            <div>
                              <h3 className="font-bold">Adults</h3>
                              <p className="text-gray-400 text-xs">
                                Ages 13 or above
                              </p>
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                                  query.adults === 0
                                    ? "border-gray-400 text-gray-400"
                                    : null
                                }`}
                                disabled={query.adults === 0}
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,
                                    adults: query.adults - 1,
                                  }))
                                }
                              >
                                -
                              </Button>
                              <p className="text-sm">{query.adults}</p>
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                                  query.adults === room.listing.adultOccupancy
                                    ? "border-gray-400 text-gray-400"
                                    : null
                                }`}
                                disabled={
                                  query.adults === room.listing.adultOccupancy
                                }
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,

                                    adults: query.adults + 1,
                                  }))
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex justify-between items-center h-18">
                            <div>
                              <h3 className="font-bold">children</h3>
                              <p className="text-gray-400 text-xs">Ages 2–12</p>
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                                  query.children === 0
                                    ? "border-gray-400 text-gray-400"
                                    : null
                                }`}
                                disabled={query.children === 0}
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,

                                    children: query.children - 1,
                                  }))
                                }
                              >
                                -
                              </Button>
                              <p className="text-sm">{query.children}</p>
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 
                                  ${
                                    query.children ===
                                    room.listing.childrenOccupancy
                                      ? "border-gray-400 text-gray-400"
                                      : null
                                  }`}
                                disabled={
                                  query.children ===
                                  room.listing.childrenOccupancy
                                }
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,
                                    children: query.children + 1,
                                  }))
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex justify-between items-center h-18">
                            <div>
                              <h3 className="font-bold">Infants</h3>
                              <p className="text-gray-400 text-xs">Under 2</p>
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                                  query.infants === 0
                                    ? "border-gray-400 text-gray-400"
                                    : null
                                }`}
                                disabled={query.infants === 0}
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,
                                    infants: query.infants - 1,
                                  }))
                                }
                              >
                                -
                              </Button>
                              <p className="text-sm">{query.infants}</p>
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 `}
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,
                                    infants: query.infants + 1,
                                  }))
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="w-full flex justify-between items-center h-18">
                            <div>
                              <h3 className="font-bold">Pets</h3>
                              <p className="text-gray-400 text-xs">
                                Bringing a service animal
                              </p>
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                                  query.pets === 0
                                    ? "border-gray-400 text-gray-400"
                                    : null
                                }`}
                                disabled={query.pets === 0}
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,

                                    pets: query.pets - 1,
                                  }))
                                }
                              >
                                -
                              </Button>
                              <p className="text-sm">{query.pets}</p>
                              <Button
                                className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 
                                   ${
                                     query.pets ===
                                     (room.listing.petsAllowed === false
                                       ? 0
                                       : 1)
                                       ? "border-gray-400 text-gray-400"
                                       : null
                                   }

                                  `}
                                disabled={
                                  query.pets ===
                                  (room.listing.petsAllowed === false ? 0 : 1)
                                }
                                onClick={() =>
                                  setQuery((prev) => ({
                                    ...prev,
                                    guest: {
                                      ...prev,
                                      pets: query.pets + 1,
                                    },
                                  }))
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>
                          <Button
                            onClick={() =>
                              setQuery({
                                adults: 0,
                                children: 0,
                                infants: 0,
                                pets: 0,
                              })
                            }
                          >
                            Reset
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {dateRange[0].startDate && dateRange[0].endDate && (
                <div className="border-gray-200 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      &#8377;{room?.listing.basePrice} x{" "}
                      {differenceInDays(
                        dateRange[0].endDate,
                        dateRange[0].startDate
                      )}{" "}
                      nights
                    </span>
                  </div>

                  <div className="flex items-center justify-between font-semibold text-gray-900 pt-2">
                    <span>Total</span>
                    <span>
                      &#8377;
                      {Number(
                        differenceInDays(
                          dateRange[0].endDate,
                          dateRange[0].startDate
                        )
                      ) * room.listing.basePrice}
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
        <div>
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
            months={2}
            direction="horizontal"
            color="black"
            minDate={new Date()}
          />
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
