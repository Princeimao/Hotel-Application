import { reservationType } from "@/api/hotelApi";
import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ReservationType = () => {
  const [petsAllowed, setPetsAllowed] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [minBookingDays, setMinBookingDays] = useState<string>("");
  const { roomId } = useParams();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (!roomId) {
        throw new Error("room id not define");
      }

      const isPetAllowed = petsAllowed === "yes" ? true : false;

      const response = await reservationType(
        roomId,
        Number(minBookingDays),
        isPetAllowed
      );

      if (response.success === false) {
        throw new Error("something went wrong");
      }

      return;
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Provide Reservation Type</h1>
        <div className="mt-4 w-68">
          <Label className="font-bold mb-2">Minimum Booking Days</Label>
          <Input
            type="number"
            placeholder="Bookings"
            value={minBookingDays}
            onChange={(e) => setMinBookingDays(e.target.value)}
          />
        </div>

        <div className="w-130 mt-4 flex flex-wrap gap-2.5 justify-center">
          <h1 className="text-sm font-bold mt-1.5">Does pets are allowed?</h1>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-gray-500">
              <input
                type="radio"
                name="answer"
                value="yes"
                checked={petsAllowed === "yes"}
                onChange={() => setPetsAllowed("yes")}
                className="w-3 h-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">Yes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-gray-500">
              <input
                type="radio"
                name="answer"
                value="no"
                checked={petsAllowed === "no"}
                onChange={() => setPetsAllowed("no")}
                className="w-3 h-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">No</span>
            </label>
          </div>
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 2}
        back={urlConstants["basicDetails"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
        loading={isLoading}
        handleSubmit={onSubmit}
      />
    </div>
  );
};

export default ReservationType;
