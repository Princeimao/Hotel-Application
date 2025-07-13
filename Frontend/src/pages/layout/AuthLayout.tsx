import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="w-full h-screen">
      <Navbar authLayout={true} />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
