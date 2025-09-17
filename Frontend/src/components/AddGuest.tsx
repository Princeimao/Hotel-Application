import type { Query } from "./forms/SearchBar";
import { Button } from "./ui/button";

interface AddGuest {
  query: Query;
  setQuery: React.Dispatch<React.SetStateAction<Query>>;
}

const AddGuest = ({ query, setQuery }: AddGuest) => {
  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center h-18">
        <div>
          <h3 className="font-bold">Adults</h3>
          <p className="text-gray-400 text-xs">Ages 13 or above</p>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.adults === 0 ? "border-gray-400 text-gray-400" : null
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
          <p className="text-sm w-8 px-3">{query.guest.adults}</p>
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.adults === 16 ? "border-gray-400 text-gray-400" : null
            }`}
            disabled={query.guest.adults === 16}
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
          <p className="text-sm w-8 px-3">{query.guest.children}</p>
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.children === 5
                ? "border-gray-400 text-gray-400"
                : null
            }`}
            disabled={query.guest.children === 5}
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
              query.guest.infants === 0 ? "border-gray-400 text-gray-400" : null
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
          <p className="text-sm w-8 px-3">{query.guest.infants}</p>
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.infants === 5 ? "border-gray-400 text-gray-400" : null
            }`}
            disabled={query.guest.infants === 5}
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
          <p className="text-gray-400 text-xs">Bringing a service animal</p>
        </div>
        <div className="flex gap-3 justify-center items-center">
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.pets === 0 ? "border-gray-400 text-gray-400" : null
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
          <p className="text-sm  w-8 px-3">{query.guest.pets}</p>
          <Button
            className={`bg-transparent text-black hover:text-white border-2 border-black px-3 w-2 h-7 ${
              query.guest.pets === 2 ? "border-gray-400 text-gray-400" : null
            }`}
            disabled={query.guest.pets === 2}
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
      <div className="flex justify-end">
        <Button
          className="bg-red-500 hover:bg-red-600"
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
    </div>
  );
};

export default AddGuest;
