import { getUserLocation, searchSuggestion } from "@/api/mapsApi";
import type { OlaApiResponse } from "@/types/maps.types";
import { format } from "date-fns";
import { Calendar, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
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
  const [dateRange, setDateRange] = useState([
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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-full shadow-lg border border-gray-200 p-2 max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-1">
        {/* Location */}

        <div className="flex relative items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-bold text-gray-700 mb-1">
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

          {showSuggestions === true ? (
            <AutoComplete
              searchSuggestions={suggestions}
              setQuery={setQuery}
              setShowSuggestions={setShowSuggestions}
              setInputValue={setInputValue}
            />
          ) : null}
        </div>
        <Separator className="my-4" orientation="vertical" />

        {/* Check-in */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Check-in
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex justify-between">
                  <p className="w-full text-sm cursor-pointer text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent">
                    {format(dateRange[0].startDate, "dd/MM/yyyy")}
                  </p>
                  <Calendar size={19} />
                </div>
              </PopoverTrigger>

              <PopoverContent className="p-4 w-auto mt-6">
                <DateRange
                  editableDateInputs={true}
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
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Check-out
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex justify-between">
                  <p className="w-full text-sm cursor-pointer text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent">
                    {format(dateRange[0].endDate, "dd/MM/yyyy")}
                  </p>
                  <Calendar size={19} />
                </div>
              </PopoverTrigger>

              <PopoverContent className="p-4 w-auto mt-6">
                <DateRange
                  editableDateInputs={true}
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

        {/* Guests */}
        <div className="flex items-center space-x-2 px-2 py-1 rounded-full hover:bg-secondary transition-colors">
          <div className="flex-1 p-1 w-40">
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Who
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <p className="w-full text-sm cursor-pointer text-gray-900 border-0 p-0 focus:ring-0 focus:outline-none bg-transparent">
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
                <div className="w-full">
                  <div className="w-full flex justify-between items-center h-18">
                    <div>
                      <h3 className="font-bold">Adults</h3>
                      <p className="text-gray-400 text-xs">Ages 13 or above</p>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                          query.guest.adults === 0
                            ? "border-gray-400 text-gray-400"
                            : null
                        }`}
                        disabled={query.guest.adults === 0}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              adults: query.guest.adults - 1,
                            },
                          }))
                        }
                      >
                        -
                      </Button>
                      <p className="text-sm">{query.guest.adults}</p>
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 `}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              adults: query.guest.adults + 1,
                            },
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center h-18">
                    <div>
                      <h3 className="font-bold">children</h3>
                      <p className="text-gray-400 text-xs">Ages 2–12</p>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                          query.guest.children === 0
                            ? "border-gray-400 text-gray-400"
                            : null
                        }`}
                        disabled={query.guest.children === 0}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              children: query.guest.children - 1,
                            },
                          }))
                        }
                      >
                        -
                      </Button>
                      <p className="text-sm">{query.guest.children}</p>
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 `}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              children: query.guest.children + 1,
                            },
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center h-18">
                    <div>
                      <h3 className="font-bold">Infants</h3>
                      <p className="text-gray-400 text-xs">Under 2</p>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                          query.guest.infants === 0
                            ? "border-gray-400 text-gray-400"
                            : null
                        }`}
                        disabled={query.guest.infants === 0}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              infants: query.guest.infants - 1,
                            },
                          }))
                        }
                      >
                        -
                      </Button>
                      <p className="text-sm">{query.guest.infants}</p>
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 `}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              infants: query.guest.infants + 1,
                            },
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <div className="w-full flex justify-between items-center h-18">
                    <div>
                      <h3 className="font-bold">Pets</h3>
                      <p className="text-gray-400 text-xs">
                        Bringing a service animal
                      </p>
                    </div>
                    <div className="flex gap-3 justify-center items-center">
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
                          query.guest.pets === 0
                            ? "border-gray-400 text-gray-400"
                            : null
                        }`}
                        disabled={query.guest.pets === 0}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              pets: query.guest.pets - 1,
                            },
                          }))
                        }
                      >
                        -
                      </Button>
                      <p className="text-sm">{query.guest.pets}</p>
                      <Button
                        className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 `}
                        onClick={() =>
                          setQuery((prev) => ({
                            ...prev,
                            guest: {
                              ...prev.guest,
                              pets: query.guest.pets + 1,
                            },
                          }))
                        }
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    onClick={() =>
                      setQuery((prev) => ({
                        ...prev,
                        guest: {
                          adults: 0,
                          children: 0,
                          infants: 0,
                          pets: 0,
                        },
                      }))
                    }
                  >
                    Reset
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
