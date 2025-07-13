import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

interface Query {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  checkIn: string;
  checkOut: string;
  guest: {
    adult: number;
    children: number;
    infants: number;
    pets: boolean;
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState<Query>({
    location: {
      name: "",
      lat: 0,
      lng: 0,
    },
    checkIn: "",
    checkOut: "",
    guest: {
      adult: 1,
      children: 0,
      infants: 0,
      pets: false,
    },
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    console.log(name, value);
    if (name === "location") {
      setQuery((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          name: value,
        },
      }));
    }

    setQuery((prev) => ({
      ...prev,
      name: value.name,
    }));
  };

  const handleSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-full shadow-lg border border-gray-200 p-2 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-1">
        {/* Location */}

        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Where
            </label>
            <input
              type="text"
              name="location"
              value={query.location.name}
              onChange={handleOnChange}
              placeholder="Search destinations"
              className="w-full text-sm text-gray-900 placeholder-gray-500 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>
        </div>
        <Separator className="my-4" orientation="vertical" />

        {/* Check-in */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              name="checkIn"
              value={query.checkIn}
              onChange={handleOnChange}
              className="w-full text-sm text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Check-out */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              name="checkOut"
              value={query.checkOut}
              onChange={handleOnChange}
              className="w-full text-sm text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Guest
            </label>
          </div>
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="bg-red-500 text-white w-15 h-15 rounded-full hover:bg-red-600"
        >
          <span>
            <Search strokeWidth={3} size={20} />
          </span>
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
