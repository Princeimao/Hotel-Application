import { getAccommodationSuggestions } from "@/api/hotelApi";
import RoomCard from "@/components/RoomCard";
import type { Recommendation } from "@/types/host.types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const Home = () => {
  const [accommodations, setAccommodations] = useState<Recommendation[] | null>(
    null
  );

  const getAccommodations = async () => {
    try {
      const response = await getAccommodationSuggestions();
      if (response.success === false) {
        throw new Error("something went wrong while getting accommodations");
      }
      setAccommodations(response.accommodations);
    } catch (error) {
      console.log("something went wrong while getting accommodations", error);
    }
  };

  useEffect(() => {
    getAccommodations();
  }, []);

  return (
    <div className="px-9 py-3">
      {/* <h1 className="px-2 font-bold font-[Arial] text-xl">
        Popular homes in Gurgaon District
      </h1> */}
      <div className="w-full flex">
        {accommodations === null ? (
          <div className="w-full h-screen flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          accommodations.map((accommodation) => (
            <RoomCard
              key={accommodation._id}
              adults={accommodation.adultOccupancy}
              childs={accommodation.childrenOccupancy}
              city={accommodation.location.city}
              price={accommodation.basePrice}
              id={accommodation._id}
              photo={accommodation.photo[0]}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
