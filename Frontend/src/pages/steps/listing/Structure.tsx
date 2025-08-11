import { structure } from "@/api/hotelApi";
import ProgressBar from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { urlConstants } from "@/constants/listingUrlConstants";
import { structureMap } from "@/constants/structuresMap";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Structure = () => {
  const { roomId } = useParams();
  const [accommodations, setAccommodations] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggleButton = (label: string) => {
    if (accommodations === label) {
      setAccommodations("");
    } else {
      setAccommodations(label);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!roomId) throw new Error("Host ID missing");
      console.log(accommodations);

      const response = await structure(roomId, accommodations);

      if (!response?.success) throw new Error("Invalid response");

      return `${urlConstants["address"].url}/${roomId}`;
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
        <h1 className="text-xl font-bold">
          Which of these best describe your place?
        </h1>
        <div className="w-130 mt-4 flex flex-wrap gap-2.5">
          {structureMap.map((accommodation) => (
            <Button
              key={accommodation.label}
              className={`h-18 w-30 bg-transparent items-start justify-baseline py-4 shadow-none border-3  hover:bg-transparent text-black font-bold ${
                accommodations.includes(accommodation.label)
                  ? "border-black"
                  : "border-gray-400"
              }`}
              onClick={() => toggleButton(accommodation.label)}
            >
              <div>
                {accommodation.icon}
                <h1>{accommodation.name}</h1>
              </div>
            </Button>
          ))}
        </div>
      </div>
      <ProgressBar
        progress={11.111 * 2}
        back={urlConstants["becomeAHost"].url}
        isBackDisable={false}
        isFrontDisable={accommodations === "" ? true : false}
        pathname={urlConstants["structure"].url}
        handleSubmit={handleSubmit}
        loading={isLoading}
      />
    </div>
  );
};

export default Structure;
