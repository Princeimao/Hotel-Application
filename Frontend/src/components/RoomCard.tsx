import { addDays, format } from "date-fns";
import { Link } from "react-router-dom";

const RoomCard = () => {
  return (
    <Link
      to={`/room/6899fd25205bfa383a5a2f26/?${new URLSearchParams({
        checkIn: `${format(addDays(new Date(), 1), "dd-mm-yyyy")}`,
        checkOut: `${format(addDays(new Date(), 3), "dd-mm-yyyy")}`,
        adults: "2",
        childs: "1",
      })}`}
    >
      <div className="w-50 h-60 p-2 cursor-pointer">
        <div className="bg-black w-46 h-46 rounded-2xl">
          <img src="null" alt="" />
        </div>
        <div className="w-46">
          <h6 className="font-semibold text-sm">Flat in gurugram</h6>
          <p className="text-[13px]">&#8377;12,576 for 2 nights</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
