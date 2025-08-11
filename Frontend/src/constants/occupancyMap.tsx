import type { ReactNode } from "react";
import {
  FaPeopleGroup,
  FaPerson,
  FaPersonDigging,
  FaPersonRifle,
} from "react-icons/fa6";

import { UserX } from "lucide-react";

export const occupancyMap: [{ icon: ReactNode; label: string; name: string }] =
  [
    {
      icon: <FaPerson />,
      label: "owner",
      name: "Owner",
    },
    {
      icon: <FaPeopleGroup />,
      label: "tenant",
      name: "Tenants",
    },
    {
      icon: <FaPersonDigging />,
      label: "cleaner",
      name: "Cleaner",
    },
    {
      icon: <FaPeopleGroup />,
      label: "staff",
      name: "Staff",
    },
    {
      icon: <FaPersonRifle />,
      label: "security",
      name: "Security",
    },
    {
      icon: <UserX />,
      label: "nobody",
      name: "Nobody",
    },
  ];
