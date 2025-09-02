import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const BookingLayout = () => {
  return (
    <main className="w-full h-screen">
      <Navbar authLayout={true} />
      <Outlet />
    </main>
  );
};

export default BookingLayout;
