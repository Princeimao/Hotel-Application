import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { urlConstants } from "@/constants/listingUrlConstants";
import { occupancyMap } from "@/constants/occupancyMap";
import { useState } from "react";

const Occupancy = () => {
  const [occupancy, setOccupancy] = useState<string[]>([]);

  const toggleButton = (label: string) => {
    if (occupancy.includes(label)) {
      const occupancies = occupancy.filter((a) => a !== label);
      setOccupancy(occupancies);
    } else {
      setOccupancy((prev) => [...prev, label]);
    }
  };

  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">Who else might be there?</h1>
        <p className="text-gray-400 font-medium text-sm mt-1.5">
          Guest need to know whether they'll encounter other people during their
          stay.
        </p>
        <div className="w-130 mt-4 flex flex-wrap justify-between gap-3">
          {occupancyMap.map((occ, i) => (
            <Button
              key={i}
              className={`h-18 w-30 bg-transparent items-start justify-baseline py-4 shadow-none border-3  hover:bg-transparent text-black font-bold ${
                occupancy.includes(occ.label)
                  ? "border-black"
                  : "border-gray-400"
              }`}
              onClick={() => toggleButton(occ.label)}
            >
              <div className="">
                {occ.icon}
                <h1>{occ.name}</h1>
              </div>
            </Button>
          ))}
        </div>
        <p className="text-gray-400 font-medium text-sm  mt-3">
          We'll show this information on your listing and in search results.
        </p>
      </div>
      <ProgressBar
        progress={6.25 * 2}
        back={urlConstants["floorPlan"].url}
        front={urlConstants["amenities"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default Occupancy;
