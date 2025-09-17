import { getUserLocation, searchSuggestion } from "@/api/mapsApi";
import type { OlaApiResponse } from "@/types/maps.types";
import { format } from "date-fns";
import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, type Range, type RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import AddGuest from "../AddGuest";
import AutoComplete from "../AutoComplete";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export interface Query {
  location: {
    name: string;
    lat: number;
    lng: number;
  };
  guest: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
}

const SearchBar = () => {
  const [query, setQuery] = useState<Query>({
    location: {
      name: "",
      lat: 0,
      lng: 0,
    },
    guest: {
      adults: 0,
      children: 0,
      infants: 0,
      pets: 0,
    },
  });
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<OlaApiResponse | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  const debouncedSearch = useDebounce(inputValue, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      async function call() {
        const userLocation = await getUserLocation();
        if (!userLocation) {
          throw new Error("something went wrong");
        }
        const response = await searchSuggestion(
          debouncedSearch,
          userLocation.latitude,
          userLocation.longitude
        );
        setSuggestions(response);
        setShowSuggestions(true);
      }

      if (inputValue !== query.location.name) {
        call();
      }
    } else {
      setSuggestions(null);
    }
  }, [debouncedSearch, inputValue, query.location.name]);

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-full shadow-lg border border-gray-200 px-2 py-2 max-w-3xl w-full mx-auto"
    >
      <div className="flex items-center gap-1 flex-wrap md:flex-nowrap">
        {/* Location */}
        <div className="flex relative items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors flex-1 min-w-[140px]">
          <div className="flex-1 px-2">
            <label className="block text-xs font-bold text-gray-700 mb-0.5">
              Where
            </label>
            <input
              type="text"
              name="location"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                setShowSuggestions(true);
              }}
              placeholder="Search destinations"
              className="w-full text-sm text-gray-900 placeholder-gray-500 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent"
            />
          </div>
          {showSuggestions && (
            <AutoComplete
              searchSuggestions={suggestions}
              setQuery={setQuery}
              setShowSuggestions={setShowSuggestions}
              setInputValue={setInputValue}
            />
          )}
        </div>
        <Separator className="hidden md:block my-2" orientation="vertical" />

        {/* Check-in */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors flex-1 min-w-[110px]">
          <div className="flex-1 px-2">
            <label className="block text-xs font-bold text-gray-700 mb-0.5">
              Check-in
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center">
                  <p className="w-full text-sm cursor-pointer text-gray-900">
                    {dateRange[0].startDate === undefined
                      ? null
                      : format(dateRange[0].startDate, "dd/MM/yyyy")}
                  </p>
                  <Calendar size={17} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-auto mt-4">
                <DateRange
                  editableDateInputs
                  onChange={(item) => setDateRange([item.selection])}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  months={2}
                  direction="horizontal"
                  minDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Check-out */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors flex-1 min-w-[110px]">
          <div className="flex-1 px-2">
            <label className="block text-xs font-bold text-gray-700 mb-0.5">
              Check-out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex justify-between items-center">
                  <p className="w-full text-sm cursor-pointer text-gray-900">
                    {dateRange[0].endDate === undefined
                      ? null
                      : format(dateRange[0].endDate, "dd/MM/yyyy")}
                  </p>
                  <Calendar size={17} />
                </div>
              </PopoverTrigger>
              <PopoverContent className="p-4 w-auto mt-4">
                <DateRange
                  editableDateInputs
                  onChange={(item: RangeKeyDict) =>
                    setDateRange([item.selection])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  months={2}
                  direction="horizontal"
                  minDate={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Guests */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors flex-1 min-w-[120px]">
          <div className="flex-1 px-2">
            <label className="block text-xs font-bold px-2 text-gray-700 mb-0.5">
              Who
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <p className="w-full text-sm cursor-pointer text-gray-900">
                  {(() => {
                    const guests: string[] = [];
                    if (query.guest.adults + query.guest.children > 0) {
                      guests.push(
                        `Adults: ${query.guest.adults + query.guest.children}`
                      );
                    }
                    if (query.guest.infants > 0) {
                      guests.push(`Infants: ${query.guest.infants}`);
                    }
                    if (query.guest.pets > 0) {
                      guests.push(`Pets: ${query.guest.pets}`);
                    }
                    return guests.length > 0 ? guests.join(", ") : "Add Guest";
                  })()}
                </p>
              </PopoverTrigger>
              <PopoverContent className="w-100 min-h-80 mt-6">
                <AddGuest query={query} setQuery={setQuery} />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Button */}
        <Button
          type="submit"
          className="bg-red-500 text-white w-12 h-12 rounded-full hover:bg-red-600 flex-shrink-0"
        >
          <Search strokeWidth={3} size={18} />
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
