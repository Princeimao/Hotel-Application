import { addDays, format } from "date-fns";
import { Link } from "react-router-dom";

interface RoomCardProps {
  id: string;
  adults: number;
  childs: number;
  price: string;
  city: string;
  photo: string;
}

const RoomCard = ({
  id,
  adults,
  childs,
  price,
  city,
  photo,
}: RoomCardProps) => {
  return (
    <Link
      to={`/room/${id}/?${new URLSearchParams({
        checkIn: `${format(addDays(new Date(), 1), "dd-mm-yyyy")}`,
        checkOut: `${format(addDays(new Date(), 3), "dd-mm-yyyy")}`,
        adults: adults.toString(),
        childs: childs.toString(),
      })}`}
    >
      <div className="w-50 h-60 p-2 cursor-pointer">
        <div className="w-46 h-46 rounded-2xl overflow-clip">
          <img src={photo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="w-46">
          <h6 className="font-semibold text-sm">Flat in {city}</h6>
          <p className="text-[13px]">&#8377;{Number(price) * 2} for 2 nights</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
