import {
  Bath,
  Cctv,
  Cigarette,
  CircleParking,
  Dog,
  Dumbbell,
  Heater,
  LampDesk,
  Snowflake,
  Utensils,
  UtensilsCrossed,
  WashingMachine,
  WavesLadder,
  Wifi,
  Wind,
} from "lucide-react";
import type { ReactNode } from "react";

export const amenitiesMap: Record<string, { icon: ReactNode; label: string }> =
  {
    wifi: {
      icon: <Wifi />,
      label: "Wifi",
    },
    air_conditioning: {
      icon: <Snowflake />,
      label: "Air Conditioner",
    },
    heating: {
      icon: <Heater />,
      label: "Heater",
    },
    kitchen: {
      icon: <Utensils />,
      label: "Kitchen",
    },
    parking: {
      icon: <CircleParking />,
      label: "Parking Space",
    },
    swimming_pool: {
      icon: <WavesLadder />,
      label: "Swimming Pool",
    },
    gym: {
      icon: <Dumbbell />,
      label: "Gym",
    },
    washing_machine: {
      icon: <WashingMachine />,
      label: "Washing Machine",
    },
    dryer: {
      icon: <Wind />,
      label: "Dryer",
    },
    breakfast_included: {
      icon: <UtensilsCrossed />,
      label: "Break Fast Included",
    },
    pet_friendly: {
      icon: <Dog />,
      label: "Pet Friendly",
    },
    smoking_allowed: {
      icon: <Cigarette />,
      label: "Smoking Allowed",
    },
    // elevator: {
    //   icon: <Eleva />,
    //   label: "Elevator",
    // },
    workspace: {
      icon: <LampDesk />,
      label: "WorkSpace",
    },
    // balcony: {
    //   icon: <wifi />,
    //   label: "Balcony",
    // },
    security: {
      icon: <Cctv />,
      label: "Security",
    },
    private_bathroom: {
      icon: <Bath />,
      label: "Private Bathroom",
    },
    // hot_water: {
    //   icon: <wifi />,
    //   label: "Hot Water",
    // },
    // fire_extinguishe: {
    //   icon: <wifi />,
    //   label: "Fire Extinguishe",
    // },
    // first_aid_kit: {
    //   icon: <wifi />,
    //   label: "First Aid Kit",
    // },
  };

export const amenitiesArrayMap = [
  {
    icon: <Wifi />,
    label: "wifi",
    name: "Wifi",
  },
  {
    icon: <Snowflake />,
    label: "air_conditioning",
    name: "Air Conditioner",
  },
  {
    icon: <Heater />,
    label: "heating",
    name: "Heater",
  },
  {
    icon: <Utensils />,
    label: "kitchen",
    name: "Kitchen",
  },
  {
    icon: <CircleParking />,
    label: "parking",
    name: "Parking Space",
  },
  {
    icon: <WavesLadder />,
    label: "swimming_pool",
    name: "Swimming Pool",
  },
  {
    icon: <Dumbbell />,
    label: "gym",
    name: "Gym",
  },
  {
    icon: <WashingMachine />,
    label: "washing_machine",
    name: "Washing Machine",
  },
  {
    icon: <Wind />,
    label: "dryer",
    name: "Dryer",
  },
  {
    icon: <UtensilsCrossed />,
    label: "breakfast_included",
    name: "Break Fast Included",
  },
  {
    icon: <Dog />,
    label: "pet_friendly",
    name: "Pet Friendly",
  },
  {
    icon: <Cigarette />,
    label: "smoking_allowed",
    name: "Smoking Allowed",
  },

  {
    icon: <LampDesk />,
    label: "workspace",
    name: "WorkSpace",
  },

  {
    icon: <Cctv />,
    label: "security",
    name: "Security",
  },
  {
    icon: <Bath />,
    label: "private_bathroom",
    name: "Private Bathroom",
  },
];
