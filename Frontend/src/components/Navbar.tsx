import { useNavigate } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import SearchBar from "./SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  const isAuthenticated = true;
  const navigate = useNavigate();
  return (
    <div className="w-full h-24 bg-secondary flex items-center justify-between px-6">
      <div className="flex justify-center items-center">
        <svg
          width="45"
          height="45"
          viewBox="0 0 128 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M64 8C37 8 16 29 16 56.5C16 84 64 120 64 120C64 120 112 84 112 56.5C112 29 91 8 64 8Z
       M64 30C55 30 48 37 48 46V74H80V46C80 37 73 30 64 30Z"
            stroke="#fb2c36"
            strokeWidth="13"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <h1 className="font-bold text-3xl text-red-500">RoamInn</h1>
      </div>

      <SearchBar />

      <div className="h-24 flex items-center justify-between px-6 gap-3">
        {isAuthenticated ? (
          <>
            <Button
              onClick={() =>
                navigate(
                  `/login/?${new URLSearchParams({
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
              <DropdownMenuContent className="w-30">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Button
              onClick={() =>
                navigate(
                  `/login/?${new URLSearchParams({
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
                <div className="w-12 h-12 rounded-full flex justify-center items-center hover:bg-gray-300 transition-all ease-in">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-30">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
