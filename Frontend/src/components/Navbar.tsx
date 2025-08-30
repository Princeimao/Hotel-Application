import { useNavigate } from "react-router-dom";

import { hostLogout } from "@/api/hostApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/context/features/HostContext";
import type { RootState } from "@/context/store";
import { Menu } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "./forms/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
  authLayout: boolean;
}

const Navbar = ({ authLayout }: Props) => {
  const host = useSelector((state: RootState) => state.host);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await hostLogout();

      if (response.success === false) {
        console.log(response.message);
        return;
      }

      dispatch(logout());
    } catch (error) {
      console.log("something went wrong while logging out host", error);
    }
  };

  return (
    <div className="w-full h-24 bg-secondary flex items-center justify-between px-6">
      <div className="flex justify-center items-center">
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
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <h1 className="font-bold text-xl leading-0 text-red-500">roamInn</h1>
      </div>

      {authLayout ? null : <SearchBar />}

      <div className="h-24 flex items-center justify-between px-6 gap-3">
        {host.isAuthenticated ? (
          <>
            <Button
              onClick={() => navigate(`/become-a-host/${host.host?.id}`)}
              className="bg-secondary text-black px-4 py-5 rounded-full hover:bg-[#EBEBEB] shadow-none"
            >
              List Accommodation
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300 transition-all ease-in">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GU</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>
                  Welcome, {host.host?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate(`/host-profile/${host.host?.id}`)}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookings")}>
                  My Listings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              onClick={() =>
                navigate(
                  `/hostSignup/?${new URLSearchParams({
                    redirect: "become a host",
                  })}`
                )
              }
              className="bg-secondary text-black px-4 py-5 rounded-full hover:bg-[#EBEBEB] shadow-none"
            >
              Become a host
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#EBEBEB] hover:bg-gray-300 transition-all ease-in">
                  <Menu />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-40">
                <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/register")}>
                  Register
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
