import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HostLogin from "./pages/auth/HostLogin";
import HostSignup from "./pages/auth/HostSignup";
import AuthLayout from "./pages/layout/AuthLayout";
import Layout from "./pages/layout/Layout";
import RoomDetails from "./pages/layout/RoomDetails";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/room/:id" element={<RoomDetails />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/hostLogin" element={<HostLogin />} />
            <Route path="/hostSignup" element={<HostSignup />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
