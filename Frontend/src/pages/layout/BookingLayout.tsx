import Navbar from "@/components/Navbar";
import type { AppDispatch } from "@/context/store";
import { fetchHost } from "@/context/thunk/HostThunk";
import { fetchUser } from "@/context/thunk/UserThunk";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const BookingLayout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    Promise.all([dispatch(fetchUser()), dispatch(fetchHost())]);
  }, [dispatch]);
  return (
    <main className="w-full h-screen">
      <Navbar authLayout={true} />
      <Outlet />
    </main>
  );
};

export default BookingLayout;
