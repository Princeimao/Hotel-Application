import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HostSignIn from "./pages/auth/HostSignIn";
import HostSignUp from "./pages/auth/HostSignUp";
import UserSignIn from "./pages/auth/UserSignIn";
import CreateListing from "./pages/CreatingListing";
import Home from "./pages/Home";
import AuthLayout from "./pages/layout/AuthLayout";
import Layout from "./pages/layout/Layout";
import RoomDetails from "./pages/RoomDetails";
import Setting from "./pages/Setting";
import HostAddressForm from "./pages/steps/host/HostAddressForm";
import HostDetailForm from "./pages/steps/host/HostDetailForm";
import HostOtpVerification from "./pages/steps/host/HostOtpVerification";
import HostProfile from "./pages/steps/HostProfile";
import UserDetailForm from "./pages/steps/user/UserDetailForm";
import UserOtpVerification from "./pages/steps/user/UserOtpVerification";

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
            {/* HOST AUTH ROUTES */}
            <Route path="/hostSignin" element={<HostSignIn />} />
            <Route path="/hostSignup" element={<HostSignUp />} />
            <Route
              path="/hostSignup-verification"
              element={<HostOtpVerification type="signup" />}
            />
            <Route
              path="/hostSignin-verification"
              element={<HostOtpVerification type="signin" />}
            />
            <Route path="/hostDetails" element={<HostDetailForm />} />
            <Route path="/hostAddress" element={<HostAddressForm />} />

            {/* USER AUTH ROUTES */}
            <Route path="/userSignin" element={<UserSignIn />} />
            <Route path="/userSignup" element={<HostAddressForm />} />
            <Route
              path="/userSignin-verification"
              element={<UserOtpVerification type="signin" />}
            />
            <Route
              path="/userSignup-verification"
              element={<UserOtpVerification type="signup" />}
            />
            <Route path="/userDetails" element={<UserDetailForm />} />

            {/* SIDE ROUTES */}
            <Route path="/settings" element={<Setting />} />
            <Route path="/host-profile" element={<HostProfile />} />
            <Route path="/host-profile" element={<HostProfile />} />
            <Route path="/create-listing" element={<CreateListing />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
