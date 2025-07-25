import type { PhotonFeature } from "@/types/maps.types";
import { MapPin } from "lucide-react";
import type { Query } from "./forms/SearchBar";

interface Props {
  searchSuggestions: PhotonFeature[];
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
  showSuggestions: boolean;
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>;
}

const AutoComplete = ({
  searchSuggestions,
  query,
  setQuery,
  showSuggestions,
  setShowSuggestions,
}: Props) => {
  console.log(searchSuggestions);
  return (
    <>
      {searchSuggestions?.length === 0 ? null : (
        <div className="absolute top-20 left-0 w-80 min-h-16 bg-white shadow-xl p-2 rounded-lg">
          {searchSuggestions?.map((location) => (
            <div
              className="w-full h-16 bg-white rounded-sm flex items-center gap-7 hover:bg-gray-200 px-1 transition-all duration-150"
              key={location.geometry.coordinates[0]}
              onClick={() => {
                // @ts-ignore
                setQuery((prev) => ({
                  location: {
                    name: location.properties.state,
                    lng: location.geometry.coordinates[0],
                    lat: location.geometry.coordinates[1],
                  },
                  checkIn: prev.checkIn,
                  checkOut: prev.checkOut,
                  guest: prev.guest,
                }));
                setShowSuggestions(false);
              }}
            >
              <div className="p-4 bg-gray-200 flex rounded-sm justify-center items-center">
                <MapPin />
              </div>
              <p>{location?.properties.state}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AutoComplete;
