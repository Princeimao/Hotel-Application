import { Hotel } from "lucide-react";
import type { ReactNode } from "react";
import { FaHotel } from "react-icons/fa";
import { FaTent } from "react-icons/fa6";
import { GiCaveEntrance, GiIsland, GiSofa, GiTreehouse } from "react-icons/gi";
import {
  MdApartment,
  MdMeetingRoom,
  MdOutlineCabin,
  MdOutlineChalet,
  MdOutlineHouseboat,
} from "react-icons/md";
import { TbBuildingCottage } from "react-icons/tb";

export const structureMap: [{ icon: ReactNode; label: string; name: string }] =
  [
    {
      icon: <Hotel />,
      label: "hotel",
      name: "Hotel",
    },
    {
      icon: <GiIsland />,
      label: "villa",
      name: "Villa",
    },
    {
      icon: <MdApartment />,
      label: "apartment",
      name: "Apartment",
    },
    {
      icon: <MdOutlineCabin />,
      label: "cabin",
      name: "Cabin",
    },
    {
      icon: <GiIsland />,
      label: "bungalow",
      name: "Bungalow",
    },
    {
      icon: <GiIsland />,
      label: "cottage",
      name: "Cottage",
    },
    {
      icon: <TbBuildingCottage />,
      label: "resort",
      name: "Resort",
    },
    {
      icon: <GiIsland />,
      label: "guest_house",
      name: "Guest House",
    },
    {
      icon: <FaHotel />,
      label: "hostel",
      name: "Hostel",
    },
    {
      icon: <MdMeetingRoom />,
      label: "room",
      name: "Room",
    },
    {
      icon: <GiSofa />,
      label: "shared_space",
      name: "Shared Space",
    },
    {
      icon: <GiTreehouse />,
      label: "treehouse",
      name: "Tree House",
    },
    {
      icon: <MdOutlineHouseboat />,
      label: "houseboat",
      name: "House Boat",
    },
    {
      icon: <GiCaveEntrance />,
      label: "cave",
      name: "Cave",
    },
    {
      icon: <FaTent />,
      label: "tent",
      name: "Tent",
    },
    {
      icon: <MdOutlineChalet />,
      label: "chalet",
      name: "Chalet",
    },
  ];
