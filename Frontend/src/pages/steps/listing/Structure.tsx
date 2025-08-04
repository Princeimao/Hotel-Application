import ProgressBar from "@/components/ProgressBar";
import { urlConstants } from "@/constants/listingUrlConstants";
import { useState } from "react";

const Structure = () => {
  const [accommodations, setAccommodations] = useState<string[]>([]);

  const toggleAccommodation = (accommodationLable: string) => {
    setAccommodations((prev) =>
      prev.includes(accommodationLable)
        ? prev.filter((id) => id !== accommodationLable)
        : [...prev, accommodationLable]
    );
  };

  return (
    <div className="w-full h-[80%]">
      <div className="w-full h-[100%] flex flex-col items-center ">
        <h1 className="text-xl font-bold">
          Which of these best describe your place?
        </h1>
        <div className="w-130 h-full"></div>
      </div>
      <ProgressBar
        progress={6.25 * 1}
        back={urlConstants["becomeAHost"].url}
        front={urlConstants["structure"].url}
        isBackDisable={false}
        isFrontDisable={false}
        pathname={urlConstants["structure"].url}
      />
    </div>
  );
};

export default Structure;
