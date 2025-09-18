import { getAccommodationSuggestions } from "@/api/hotelApi";
import RoomCard from "@/components/RoomCard";
import type { Recommendation } from "@/types/host.types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
// @ts-ignore
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

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

      if (!response.accommodations) {
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
          <div className="w-full h-[85vh] flex justify-center items-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          <Swiper spaceBetween={10} slidesPerView={7}>
            {accommodations.map((accommodation) => (
              <SwiperSlide key={accommodation._id}>
                <RoomCard
                  adults={accommodation.adultOccupancy}
                  childs={accommodation.childrenOccupancy}
                  city={accommodation.location.city}
                  price={accommodation.basePrice}
                  id={accommodation._id}
                  photo={accommodation.photo[0]}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default Home;
