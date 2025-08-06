import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { amenitiesArrayMap } from "@/constants/amenitiesMap";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";

const Amenities = () => {
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleButton = (label: string) => {
    if (amenities.includes(label)) {
      const occupancies = amenities.filter((a) => a !== label);
      setAmenities(occupancies);
    } else {
      setAmenities((prev) => [...prev, label]);
    }
  };

  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">
          Provide what <p className="text-red-600 inline-block">Amenities</p>{" "}
          you provide
        </h1>
        <div className="w-130 mt-4 flex flex-wrap gap-2.5">
          {amenitiesArrayMap.map((amenitie) => (
            <Button
              className={`h-18 w-41 bg-transparent items-start justify-baseline py-4 shadow-none border-3  hover:bg-transparent text-black font-bold ${
                amenities.includes(amenitie.label)
                  ? "border-black"
                  : "border-gray-400"
              }`}
              onClick={() => toggleButton(amenitie.label)}
            >
              <div
                className={`${
                  amenities.includes(amenitie.label)
                    ? "text-black"
                    : "text-gray-500"
                }`}
              >
                <div>{amenitie.icon}</div>
                <div>{amenitie.name}</div>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <ProgressBar
        progress={6.25 * 6}
        back={urlConstants["occupancy"].url}
        front={urlConstants["photo"].url}
        isBackDisable={false}
        isFrontDisable={amenities.length === 0 ? true : false}
        pathname={urlConstants["amenities"].url}
      />
    </div>
  );
};

export default Amenities;
