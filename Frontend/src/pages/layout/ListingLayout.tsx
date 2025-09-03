import { Button } from "@/components/ui/button";
import type { AppDispatch } from "@/context/store";
import { fetchHost } from "@/context/thunk/HostThunk";
import { fetchUser } from "@/context/thunk/UserThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";

const ListingLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Promise.all([dispatch(fetchUser()), dispatch(fetchHost())]);
  }, [dispatch]);

  const location = useLocation();

  return (
    <main className="w-full h-screen">
      <Toaster />
      <div className="w-full h-20 flex justify-between items-center px-10">
        <svg
          width="35"
          height="35"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64 8C37 8 16 29 16 56.5C16 84 64 120 64 120C64 120 112 84 112 56.5C112 29 91 8 64 8Z
       M64 30C55 30 48 37 48 46V74H80V46C80 37 73 30 64 30Z"
            stroke="#fb2c36"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div className="flex gap-3.5">
          {location.pathname === "/become-a-host" ? (
            <Button className="bg-transparent border text-black rounded-2xl hover:text-white">
              Exit
            </Button>
          ) : (
            <>
              <Button className="bg-transparent border text-black rounded-2xl hover:text-white">
                Questions?
              </Button>
              <Button className="bg-transparent border text-black rounded-2xl hover:text-white">
                Save & Exit
              </Button>
            </>
          )}
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default ListingLayout;
