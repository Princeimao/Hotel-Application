import { getUserLocation, searchSuggestion } from "@/api/mapsApi";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { OlaApiResponse } from "@/types/maps.types";
import { format } from "date-fns";
import { MapPin, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange, type Range } from "react-date-range";
import AddGuest from "../AddGuest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Input } from "../ui/input";
import type { Query } from "./SearchBar";

const MobileSearchForm = () => {
  const [activeStep, setActiveStep] = useState<"where" | "date" | "guests">(
    "where"
  );

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<OlaApiResponse | null>(null);
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
      }

      if (inputValue !== query.location.name) {
        call();
      }
    } else {
      setSuggestions(null);
    }
  }, [debouncedSearch, inputValue, query.location.name]);

  if (!dateRange[0].startDate || !dateRange[0].endDate) {
    throw new Error("something went wrong");
  }

  return (
    <div>
      <Drawer>
        <DrawerTrigger asChild>
          <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#EBEBEB] hover:bg-gray-300 transition-all ease-in ">
            <Search size={17} />
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>RoamInn</DrawerTitle>
              <DrawerDescription>
                Search best accommodation for you.
              </DrawerDescription>
            </DrawerHeader>
            <div className="w-full flex flex-col mb-2">
              <Accordion
                type="single"
                collapsible
                className="w-[94%] max-w-lg mx-auto flex flex-col gap-3"
              >
                {/* Step 1: Where */}
                <AccordionItem
                  value="step-where"
                  className={`border ${
                    activeStep === "where" ? "shadow-md" : ""
                  } px-6 rounded-2xl`}
                >
                  <AccordionTrigger onClick={() => setActiveStep("where")}>
                    {query.location.name ? query.location.name : "Where"}
                  </AccordionTrigger>
                  <AccordionContent className="">
                    <div className="flex gap-2 items-center border-1 border-gray-500 px-3 rounded-2xl">
                      <Search />
                      <Input
                        value={inputValue}
                        onChange={(e) => {
                          setInputValue(e.target.value);
                        }}
                        placeholder="Search destinations"
                        className="w-full py-6 border-none rounded-sm focus-visible:border-ring focus-visible:ring-transparent"
                      />
                    </div>

                    {suggestions === null ? null : (
                      <div className="w-full min-h-16 bg-white p-2 rounded-lg">
                        {suggestions.predictions.map((location, index) => (
                          <div
                            className="w-full h-16 bg-white rounded-sm flex items-center gap-7 hover:bg-gray-200 px-1 transition-all duration-150"
                            key={index}
                            onClick={() => {
                              setQuery((prev) => ({
                                ...prev,
                                location: {
                                  name: location.structured_formatting
                                    .main_text,
                                  lat: location.geometry.location.lat,
                                  lng: location.geometry.location.lng,
                                },
                              }));
                              setInputValue(
                                location.structured_formatting.main_text
                              );
                              setActiveStep("date");
                            }}
                          >
                            <div className="p-4 bg-gray-200 flex rounded-sm justify-center items-center">
                              <MapPin />
                            </div>
                            <p>{location.structured_formatting.main_text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                {/* Step 2: Date */}
                <AccordionItem
                  value="step-date"
                  className={`border ${
                    activeStep === "date" ? "shadow-md" : ""
                  } px-6 rounded-2xl`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveStep("date");
                    }}
                  >
                    {dateRange
                      ? `${format(
                          dateRange[0].startDate,
                          "dd/MM/yyyy"
                        )} → ${format(dateRange[0].endDate, "dd/MM/yyyy")}`
                      : "Date"}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="w-full flex justify-center items-center">
                      <DateRange
                        editableDateInputs
                        onChange={(item) => setDateRange([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dateRange}
                        months={1}
                        direction="vertical"
                        minDate={new Date()}
                        className="custom-date-range"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button
                        onClick={() => setActiveStep(() => "where")}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Next
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Step 3: Guests */}
                <AccordionItem
                  value="step-guests"
                  className={`border mb-2 ${
                    activeStep === "guests" ? "shadow-md" : ""
                  } px-6 rounded-2xl`}
                >
                  <AccordionTrigger
                    onClick={() => {
                      setActiveStep("guests");
                    }}
                  >
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
                      return guests.length > 0
                        ? guests.join(", ")
                        : "Add Guest";
                    })()}
                  </AccordionTrigger>
                  <AccordionContent>
                    <AddGuest query={query} setQuery={setQuery} />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            <DrawerFooter>
              <Button className="bg-red-500 hover:bg-red-600">
                <Search />
                Seach
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileSearchForm;
