import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="w-full h-screen">
      <Navbar authLayout={false} />
      <Outlet />
    </main>
  );
};

export default Layout;
