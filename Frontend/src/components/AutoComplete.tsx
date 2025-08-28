import type { OlaApiResponse } from "@/types/maps.types";
import { MapPin } from "lucide-react";
import type { Query } from "./forms/SearchBar";

interface Props {
  searchSuggestions: OlaApiResponse | null;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}

const AutoComplete = ({
  searchSuggestions,
  setQuery,
  setShowSuggestions,
  setInputValue,
}: Props) => {
  console.log(searchSuggestions);
  return (
    <>
      {searchSuggestions === null ? null : (
        <div className="absolute top-20 left-0 w-80 min-h-16 bg-white shadow-xl p-2 rounded-lg">
          {searchSuggestions.predictions.map((location, index) => (
            <div
              className="w-full h-16 bg-white rounded-sm flex items-center gap-7 hover:bg-gray-200 px-1 transition-all duration-150"
              key={index}
              onClick={() => {
                setQuery((prev) => ({
                  ...prev,
                  location: {
                    name: location.structured_formatting.main_text,
                    lat: location.geometry.location.lat,
                    lng: location.geometry.location.lng,
                  },
                }));
                setInputValue(location.structured_formatting.main_text);
                setShowSuggestions(false);
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
    </>
  );
};

export default AutoComplete;
