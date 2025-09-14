import { floorPlan } from "@/api/hotelApi";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FloorPlan = () => {
  const { roomId } = useParams();
  const [adult, setAdult] = useState<number>(1);
  const [child, setChild] = useState<number>(0);
  const [bedrooms, setBedrooms] = useState<number>(1);
  const [beds, setBeds] = useState<number>(1);
  const [lock, setLock] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!roomId) throw new Error("Host ID missing");

      const bedRoomLock = lock === "yes" ? true : false;

      const response = await floorPlan(
        roomId,
        adult,
        child,
        bedrooms,
        beds,
        bedRoomLock
      );

      if (!response?.success) throw new Error("Invalid response");

      return `${urlConstants["structure"].url}/${roomId}`;
    } catch (error) {
      console.error("Error in handleSubmit", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Lets starts with basics</h1>

        <div className="w-130 mt-4 flex flex-wrap gap-2.5">
          <h1 className="text-sm font-bold">How many people can stay here?</h1>
          <div>
            <div className="w-120 h-15 border-b-2 flex justify-between items-center">
              <p className="text-sm font-black text-gray-500">Adults</p>

              <div className="w-22 flex gap-3 items-center">
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => {
                    if (adult > 1) {
                      setAdult((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <p className="text-xs font-black text-gray-500 w-3">{adult}</p>
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => setAdult((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="w-120 h-15 border-b-2 flex justify-between items-center">
              <p className="text-sm font-black text-gray-500">Childrens</p>

              <div className="w-22 flex gap-3 items-center">
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => {
                    if (child > 1) {
                      setChild((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <p className="text-xs font-black text-gray-500 w-3">{child}</p>
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => setChild((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="w-120 h-15 border-b-2 flex justify-between items-center">
              <p className="text-sm font-black text-gray-500">Bedrooms</p>

              <div className="w-22 flex gap-3 items-center">
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => {
                    if (bedrooms > 1) {
                      setBedrooms((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <p className="text-xs font-black text-gray-500 w-3">
                  {bedrooms}
                </p>
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => setBedrooms((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="w-120 h-15 flex justify-between items-center">
              <p className="text-sm font-black text-gray-500">Beds</p>

              <div className="w-22 flex gap-3 items-center">
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => {
                    if (beds > 1) {
                      setBeds((prev) => prev - 1);
                    }
                  }}
                >
                  -
                </Button>
                <p className="text-xs font-black text-gray-500 w-3">{beds}</p>
                <Button
                  className="bg-transparent border-2 border-gray-400 hover:bg-transparent active:border-black text-black rounded-full px-2 py-3 h-0"
                  onClick={() => setBeds((prev) => prev + 1)}
                >
                  +
                </Button>
              </div>
            </div>
            <h1 className="text-sm font-bold mt-1.5">
              Does every bedroom has lock?
            </h1>
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
      </div>
      <ProgressBar
        progress={6.25 * 3}
        back={urlConstants["address"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
        handleSubmit={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default FloorPlan;
