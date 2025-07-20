import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HostSignIn from "./pages/auth/HostSignIn";
import HostSignUp from "./pages/auth/HostSignUp";
import Home from "./pages/Home";
import AuthLayout from "./pages/layout/AuthLayout";
import Layout from "./pages/layout/Layout";
import RoomDetails from "./pages/RoomDetails";
import HostAddressForm from "./pages/steps/host/HostAddressForm";
import HostDetailForm from "./pages/steps/host/HostDetailForm";
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

            <Route path="/hostDetails" element={<HostDetailForm />} />
            <Route path="/hostAddress" element={<HostAddressForm />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
