import { getAccommodationById } from "@/api/hotelApi";
import BookingForm from "@/components/forms/BookingForm";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import type { RootState } from "@/context/store";
import type { RoomDetials } from "@/types/hotel.types";
import { bookingFormValidation } from "@/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { differenceInDays, format } from "date-fns";
import { ChevronRight, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { z } from "zod";
import { Amenitie } from "./RoomDetails";

const BookingPage = () => {
  const [searchParams] = useSearchParams();
  const [room, setRoom] = useState<RoomDetials | null>(null);

  const roomId = searchParams.get("roomId");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");
  const infants = searchParams.get("infants");
  const pets = searchParams.get("pets");

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    async function getRoom() {
      if (!roomId) {
        throw new Error("room id is not defined1`");
      }
      const response = await getAccommodationById(roomId);

      if (!response.success) {
        throw new Error("something went wrong while getting accommodation");
      }

      if (!response.room) {
        throw new Error("something went wrong while getting accommodation");
      }

      setRoom(response.room);
    }

    getRoom();
  }, [roomId]);

  const form = useForm<z.infer<typeof bookingFormValidation>>({
    resolver: zodResolver(bookingFormValidation),
    defaultValues: {
      firstName:
        user?.name.split(" ")[0].trim() !== "" ? user?.name.split(" ")[0] : "",
      lastName:
        user?.name.split(" ")[1].trim() !== "" ? user?.name.split(" ")[1] : "",
      country: "",
      email: user?.email !== "" ? user?.email : "",
      phone: "",
    },
  });
  const [bookingFor, setBookingFor] = useState<string>("");
  const [specialRequest, setSpecialRequest] = useState<string>("");

  const onSubmit = async (data: z.infer<typeof bookingFormValidation>) => {
    console.log({
      ...data,
      bookFor: bookingFor,
      specialRequest: specialRequest,
    });
  };

  if (!roomId || !checkIn || !checkOut || !guests || !infants || !pets) {
    throw new Error("something went wrong while getting query");
  }

  return (
    <div className="w-full px-25 py-10 flex justify-between">
      <div className="w-[36%] min-h-screen flex flex-col gap-4">
        <div className="rounded-xl overflow-hidden">
          <div className="w-[100%] h-70">
            <img
              className="w-[100%] h-70 object-cover"
              src={room?.photo[0]}
              alt={room?._id}
            />
          </div>
          <div className="p-5 border-2 border-gray-200 rounded-b-xl flex flex-col gap-2">
            <div className="flex space-x-3">
              <h4 className="text-sm">
                {room?.accommodationType.toLocaleUpperCase()}
              </h4>
              <div className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <h3 className="text-sm text-gray-900">4 • 152 reviews</h3>
              </div>
            </div>
            <h1 className="font-extrabold text-xl">{room?.title}</h1>
            <div className="flex gap-4">
              {/* {room?.amenities.map((amenity, key) => {
                return (
                  <div key={key} className="flex items-center gap-2">
                    {amenity.icon}
                    <span className="text-sm text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                );
              })} */}

              <Amenitie amenities={room?.amenities} />
            </div>
          </div>
        </div>

        <div className="h-140 rounded-xl overflow-hidden border-2 border-gray-200 p-5 flex flex-col gap-4">
          <h2 className="font-bold text-xl">Your booking details</h2>
          <div className="w-full min-h-22 flex justify-between">
            <div className="w-[40%] h-4 flex flex-col gap-1">
              <p className="font-semibold">Check-in</p>
              <p className="text-sm">{format(new Date(checkIn), "PPPP")}</p>
              <p className="font-light text-sm">From 3:00 PM</p>
            </div>

            <div className="w-[2px] h-20 bg-gray-200" />

            <div className="w-[40%] h-4 flex flex-col gap-1">
              <p className="font-semibold">Check-out</p>
              <p className="text-sm">{format(new Date(checkOut), "PPPP")}</p>
              <p className="font-light text-sm">Until 12:00 PM</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Total length of stay:</h3>
            <p className="text-sm font-bold">
              {differenceInDays(new Date(checkOut), new Date(checkIn))} nights
            </p>
          </div>

          <Separator />

          <div>
            <p className="font-semibold text-sm">You Selected</p>
            <h4 className="font-bold text-lg">
              {room?.title} for {guests} adults{" "}
              {Number(infants) !== 0 ? `and ${infants} infants` : null}
            </h4>
          </div>

          <Separator />

          <div>
            <p className="font-semibold text-sm">Your Price Summary</p>
            {/* Task to do  */}
          </div>
        </div>
      </div>

      <div className="w-[60%] min-h-screen flex flex-col gap-5">
        <div className="w-full min-h-50 border-2 border-gray-200 rounded-2xl p-5">
          <h1 className="font-bold text-xl">Enter your details</h1>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <BookingForm form={form} />
          </form>

          <Separator />

          <RadioGroup defaultValue="option-one" className="w-full pt-4">
            <h4 className="text-sm font-black flex">
              Who are you booking for?{" "}
              <p className="text-sm ml-1 font-light text-gray-500">
                (optional)
              </p>
            </h4>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="FOR_ME"
                id="for-me"
                onChange={() => setBookingFor("FOR_ME")}
              />
              <Label htmlFor="for-me">I'm the main guest</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="NOT_FOR_ME"
                id="not-for-me"
                onChange={() => setBookingFor("NOT_FOR_ME")}
              />
              <Label htmlFor="not-for-me">I'm booking for someone else</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="w-full min-h-50 border-2 border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
          <h1 className="font-bold text-xl">Special requests</h1>

          <p className="text-sm">
            Special requests can't be guaranteed, but the property will do its
            best to meet your needs. You can always make a special request after
            your booking is complete.
          </p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-black flex">
              Please write your requests.{" "}
              <p className="text-sm ml-1 font-light text-gray-500">
                (optional)
              </p>
            </label>
            <Textarea
              value={specialRequest}
              onChange={(e) => setSpecialRequest(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full min-h-50 border-2 border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
          <h1 className="font-bold text-xl">Review House Rules</h1>

          <p className="text-sm">
            Your host would like you to agree to the following house rules:
          </p>

          <div className="px-5">
            <ul className="text-sm list-disc">
              <li>No smoking</li>
              <li>No parties/events</li>
              <li>Quiet hours are between 1:00 PM and 4:00 PM</li>
              <li>Pets are not allowed</li>
            </ul>
          </div>

          <h4 className="text-sm font-black flex">
            By continuing to the next step, you agree to these house rules.
          </h4>
        </div>
        <div className="flex justify-end">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                onClick={() => form.handleSubmit(onSubmit)()}
                className="w-50 h-12 bg-red-500 hover:bg-red-600 active:bg-red-700"
              >
                Find Details
                <ChevronRight />
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto mr-11">
              <div className="p-2 flex flex-col gap-4">
                <div>
                  <p className="font-semibold text-sm">You Selected</p>
                  <h4 className="font-bold text-lg">
                    cozy studio for 2 adults
                  </h4>
                </div>

                <Separator />

                <h2 className="font-bold text-xl">Your booking details</h2>
                <div className="w-full min-h-22 flex justify-between">
                  <div className="w-[40%] h-4 flex flex-col gap-1">
                    <p className="font-semibold">Check-in</p>
                    <p className="text-sm">{format(new Date(), "PPPP")}</p>
                    <p className="font-light text-sm">From 3:00 PM</p>
                  </div>

                  <div className="w-[2px] h-20 bg-gray-200" />

                  <div className="w-[40%] h-4 flex flex-col gap-1">
                    <p className="font-semibold">Check-out</p>
                    <p className="text-sm">{format(new Date(), "PPPP")}</p>
                    <p className="font-light text-sm">Until 12:00 PM</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Total length of stay:</h3>
                  <p className="text-sm font-bold">
                    {differenceInDays(
                      new Date("09-04-2025"),
                      new Date("09-02-2025")
                    )}{" "}
                    nights
                  </p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
