import ProgressBar from "@/components/ProgressBar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";

const ReservationType = () => {
  const [lock, setLock] = useState<string>("");
  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Provide Reservation Type</h1>
        <div className="mt-4 w-68">
          <Label className="font-bold mb-2">Minimum Booking Days</Label>
          <Input type="number" placeholder="Bookings" />
        </div>

        <div className="w-130 mt-4 flex flex-wrap gap-2.5 justify-center">
          <h1 className="text-sm font-bold mt-1.5">Does pets are allowed?</h1>
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-gray-500">
              <input
                type="radio"
                name="answer"
                value="yes"
                checked={lock === "yes"}
                onChange={() => setLock("yes")}
                className="w-3 h-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">Yes</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-black text-gray-500">
              <input
                type="radio"
                name="answer"
                value="no"
                checked={lock === "no"}
                onChange={() => setLock("no")}
                className="w-3 h-3 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-800">No</span>
            </label>
          </div>
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 2}
        back={urlConstants["structure"].url}
        front={urlConstants["floorPlan"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default ReservationType;
