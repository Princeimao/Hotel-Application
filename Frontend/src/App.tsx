import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HostSignIn from "./pages/auth/HostSignIn";
import HostSignUp from "./pages/auth/HostSignup";
import AuthLayout from "./pages/layout/AuthLayout";
import Layout from "./pages/layout/Layout";
import RoomDetails from "./pages/layout/RoomDetails";
import OtpPage from "./pages/steps/host/OtpPage";

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
            <Route path="/hostSignin" element={<HostSignIn />} />
            <Route path="/hostSignup" element={<HostSignUp />} />
            <Route
              path="/hostSignup-verification"
              element={<OtpPage type="signup" />}
            />

            <Route
              path="/hostSignin-verification"
              element={<OtpPage type="signin" />}
            />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
