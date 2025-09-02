import BookingForm from "@/components/forms/BookingForm";
import { Separator } from "@/components/ui/separator";
import { differenceInDays, format } from "date-fns";
import { Heater, Snowflake, Star, Wifi } from "lucide-react";
import type { ReactElement } from "react";

const amenities: { icon: ReactElement; label: string }[] = [
  { icon: <Wifi className="w-4 h-4 text-gray-700" />, label: "Wifi" },
  {
    icon: <Snowflake className="w-4 h-4 text-gray-700" />,
    label: "Air Conditioner",
  },
  { icon: <Heater className="w-4 h-4 text-gray-700" />, label: "Heater" },
];

const BookingPage = () => {
  return (
    <div className="w-full px-25 py-10 flex justify-between">
      <div className="w-[36%] min-h-screen flex flex-col gap-4">
        <div className="rounded-xl overflow-hidden">
          <div className="w-[100%] h-70">
            <img
              className="w-[100%] h-70 object-cover"
              src="https://images.trvl-media.com/lodging/1000000/800000/790500/790474/af431139.jpg"
              alt="image"
            />
          </div>
          <div className="p-5 border-2 border-gray-200 rounded-b-xl flex flex-col gap-2">
            <div className="flex space-x-3">
              <h4 className="text-sm">Hotel</h4>
              <div className="flex items-center space-x-2">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <h3 className="text-sm text-gray-900">4 • 152 reviews</h3>
              </div>
            </div>
            <h1 className="font-extrabold text-xl">Coby Studio</h1>
            <div className="flex gap-4">
              {amenities.map((amenity, key) => {
                return (
                  <div key={key} className="flex items-center gap-2">
                    {amenity.icon}
                    <span className="text-sm text-gray-700">
                      {amenity.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="h-140 rounded-xl overflow-hidden border-2 border-gray-200 p-5 flex flex-col gap-4">
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
              {differenceInDays(new Date("09-04-2025"), new Date("09-02-2025"))}{" "}
              nights
            </p>
          </div>

          <Separator />

          <div>
            <p className="font-semibold text-sm">You Selected</p>
            <h4 className="font-bold text-lg">cozy studio for 2 adults</h4>
          </div>

          <Separator />

          <div>
            <p className="font-semibold text-sm">Your Price Summary</p>
            {/* Task to do  */}
          </div>
        </div>
      </div>
      <div className="w-[60%] min-h-screen gap-5">
        <div className="w-full h-50 border-2 border-gray-200 rounded-2xl p-5">
          <h1 className="font-bold text-xl">Enter your details</h1>
          <BookingForm />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
