import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HostSignIn from "./pages/auth/HostSignIn";
import HostSignUp from "./pages/auth/HostSignUp";
import UserSignIn from "./pages/auth/UserSignIn";
import UserSignUp from "./pages/auth/UserSignUp";
import Home from "./pages/Home";
import HostProfile from "./pages/HostProfile";
import AuthLayout from "./pages/layout/AuthLayout";
import Layout from "./pages/layout/Layout";
import ListingLayout from "./pages/layout/ListingLayout";
import RoomDetails from "./pages/RoomDetails";
import Setting from "./pages/Setting";
import HostAddressForm from "./pages/steps/host/HostAddressForm";
import HostDetailForm from "./pages/steps/host/HostDetailForm";
import HostOtpVerification from "./pages/steps/host/HostOtpVerification";
import Address from "./pages/steps/listing/Address";
import BecomeAHost from "./pages/steps/listing/BecomeAHost";
import CreateListing from "./pages/steps/listing/CreatingListing";
import FloorPlan from "./pages/steps/listing/FloorPlan";
import Structure from "./pages/steps/listing/Structure";
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

            {/* SIDE ROUTES */}
            <Route path="/settings" element={<Setting />} />
            <Route path="/host-profile" element={<HostProfile />} />
            <Route path="/create-listing" element={<CreateListing />} />
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
            <Route path="/userSignup" element={<UserSignUp />} />
            <Route path="/userDetails" element={<UserDetailForm />} />
            <Route
              path="/userSignin-verification"
              element={<UserOtpVerification type="signin" />}
            />
            <Route
              path="/userSignup-verification"
              element={<UserOtpVerification type="signup" />}
            />
          </Route>

          <Route element={<ListingLayout />}>
            <Route path="/become-a-host" element={<BecomeAHost />} />
            <Route path="/structure" element={<Structure />} />
            <Route path="/address" element={<Address />} />
            <Route path="/floor-plan" element={<FloorPlan />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
