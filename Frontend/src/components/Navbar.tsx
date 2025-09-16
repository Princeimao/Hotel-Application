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
import {
  BadgeQuestionMark,
  CalendarSearch,
  LogOut,
  MapPinHouse,
  Menu,
  Settings,
  User,
  UserPen,
  UserRoundCheck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MobileSearchForm from "./forms/MobileSearchForm";
import SearchBar from "./forms/SearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

interface Props {
  authLayout: boolean;
}

const Navbar = ({ authLayout }: Props) => {
  const host = useSelector((state: RootState) => state.host);
  const user = useSelector((state: RootState) => state.user);
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

  const [isMobileView, setIsMobileView] = useState<boolean>(false);

  useEffect(() => {
    const checkWidth = () => setIsMobileView(window.innerWidth < 1200);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="w-full h-20 bg-secondary flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-2">
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
        {isMobileView ? null : (
          <h1 className="font-bold text-xl text-red-500">roamInn</h1>
        )}
      </div>

      {!authLayout && !isMobileView && <SearchBar />}

      <div className="flex items-center gap-3">
        {host.isAuthenticated ? (
          <>
            {!isMobileView && (
              <Button
                onClick={() => navigate(`/become-a-host/${host.host?.id}`)}
                className="bg-secondary text-black px-4 py-2 rounded-full hover:bg-[#EBEBEB] shadow-none"
              >
                List Accommodation
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300 transition-all ease-in">
                  <Avatar className="w-9 h-9">
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
                  className="py-4"
                  onClick={() => navigate(`/host-profile/${host.host?.id}`)}
                >
                  <UserPen /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/bookings")}
                >
                  <MapPinHouse /> My Listings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/settings")}
                >
                  <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="py-4" onClick={handleLogout}>
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : user.isAuthenticated ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full flex justify-center items-center hover:bg-gray-300 transition-all ease-in">
                  <Avatar className="w-9 h-9">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>GU</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-55">
                <DropdownMenuLabel>
                  Welcome, {user.user?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate(`/user-profile/${user.user?.id}`)}
                >
                  <UserPen /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/bookings")}
                >
                  <CalendarSearch /> Booking History
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/settings")}
                >
                  <Settings /> Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="py-4" onClick={handleLogout}>
                  <LogOut /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            {!isMobileView && (
              <Button
                onClick={() =>
                  navigate(
                    `/hostSignup/?${new URLSearchParams({
                      redirect: "become-a-host",
                    })}`
                  )
                }
                className="bg-secondary text-black px-4 py-2 rounded-full hover:bg-[#EBEBEB] shadow-none"
              >
                Become a host
              </Button>
            )}
            {isMobileView && <MobileSearchForm />}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-[#EBEBEB] hover:bg-gray-300 transition-all ease-in ">
                  <Menu />
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-55 mr-6 mt-2">
                <DropdownMenuLabel>Welcome</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/userSignin")}
                >
                  <User />
                  User Login
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/userSignup")}
                >
                  <UserPen /> User Register
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/userSignup")}
                >
                  <MapPinHouse /> Become a host
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/userSignin")}
                >
                  <UserRoundCheck />
                  Host Login
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="py-4"
                  onClick={() => navigate("/userSignin")}
                >
                  <BadgeQuestionMark /> Help Center
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
