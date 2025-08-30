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
import Amenities from "./pages/steps/listing/Amenities";
import BecomeAHost from "./pages/steps/listing/BecomeAHost";
import CreateListing from "./pages/steps/listing/CreatingListing";
import Details from "./pages/steps/listing/Details";
import FloorPlan from "./pages/steps/listing/FloorPlan";
import Occupancy from "./pages/steps/listing/Occupancy";
import ReservationType from "./pages/steps/listing/ReservationType";
import Structure from "./pages/steps/listing/Structure";
import UploadListingImages from "./pages/steps/listing/UploadListingImages";
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
            <Route path="/host-profile/:hostId" element={<HostProfile />} />
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
            <Route path="/become-a-host/:hostId" element={<BecomeAHost />} />
            <Route path="/structure/:roomId" element={<Structure />} />
            <Route path="/address/:roomId" element={<Address />} />
            <Route path="/floor-plan/:roomId" element={<FloorPlan />} />
            <Route path="/occupancy/:roomId" element={<Occupancy />} />
            <Route path="/amenities/:roomId" element={<Amenities />} />
            <Route
              path="/upload-photos/:roomId"
              element={<UploadListingImages />}
            />
            <Route
              path="/accommodation-details/:roomId"
              element={<Details />}
            />
            <Route
              path="/reservation-type/:roomId"
              element={<ReservationType />}
            />
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
