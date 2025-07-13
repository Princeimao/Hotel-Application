import { Link } from "react-router-dom";

const RoomCard = () => {
  return (
    <Link
      to={`/room/465454/?${new URLSearchParams({
        checkIn: "some date",
        checkOut: "some other date",
        adults: "2",
        childs: "1",
      })}`}
    >
      <div className="w-50 h-60 p-2 cursor-pointer">
        <div className="bg-black w-46 h-46 rounded-2xl">
          <img src="" alt="" />
        </div>
        <div className="w-46">
          <h6 className="font-semibold text-sm">Flat in gurugram</h6>
          <p className="text-[13px] ">&#8377;12,576 for 2 nights</p>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;
