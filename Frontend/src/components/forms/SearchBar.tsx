import { searchSuggestion } from "@/api/mapsApi";
import type { PhotonFeature } from "@/types/maps.types";
import { Search } from "lucide-react";
import { useState } from "react";
import AutoComplete from "../AutoComplete";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

export interface Query {
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
  const [suggestions, setSuggestions] = useState<PhotonFeature[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "location") {
      setShowSuggestions(true);
      setQuery((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          name: value,
        },
      }));

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(async () => {
        const suggestion = await searchSuggestion(value);

        setSuggestions(suggestion?.features || []);
      }, 2000);

      setTimeoutId(newTimeoutId);
    }

    if (name === "checkIn") {
      setQuery((prev) => ({
        ...prev,
        checkIn: value,
      }));
    } else {
      setQuery((prev) => ({
        ...prev,
        checkOut: value,
      }));
    }
  };

  const handleSubmit = () => {};

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-full shadow-lg border border-gray-200 p-2 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-1">
        {/* Location */}

        <div className="flex relative items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
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

          {/* AutoCompete */}
          {showSuggestions === true ? (
            <AutoComplete
              searchSuggestions={suggestions}
              query={query}
              setQuery={setQuery}
              showSuggestions={showSuggestions}
              setShowSuggestions={setShowSuggestions}
            />
          ) : null}
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
