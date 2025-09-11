import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const HostSignIn = lazy(() => import("./pages/auth/HostSignIn"));
const HostSignUp = lazy(() => import("./pages/auth/HostSignUp"));
const UserSignIn = lazy(() => import("./pages/auth/UserSignIn"));
const UserSignUp = lazy(() => import("./pages/auth/UserSignUp"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Home = lazy(() => import("./pages/Home"));
const HostProfile = lazy(() => import("./pages/HostProfile"));
const AuthLayout = lazy(() => import("./pages/layout/AuthLayout"));
const BookingLayout = lazy(() => import("./pages/layout/BookingLayout"));
const Layout = lazy(() => import("./pages/layout/Layout"));
const ListingLayout = lazy(() => import("./pages/layout/ListingLayout"));
const RoomDetails = lazy(() => import("./pages/RoomDetails"));
const Setting = lazy(() => import("./pages/Setting"));
const HostAddressForm = lazy(
  () => import("./pages/steps/host/HostAddressForm")
);
const HostDetailForm = lazy(() => import("./pages/steps/host/HostDetailForm"));
const HostOtpVerification = lazy(
  () => import("./pages/steps/host/HostOtpVerification")
);
const Address = lazy(() => import("./pages/steps/listing/Address"));
const Amenities = lazy(() => import("./pages/steps/listing/Amenities"));
const BecomeAHost = lazy(() => import("./pages/steps/listing/BecomeAHost"));
const CreateListing = lazy(
  () => import("./pages/steps/listing/CreatingListing")
);
const Details = lazy(() => import("./pages/steps/listing/Details"));
const FloorPlan = lazy(() => import("./pages/steps/listing/FloorPlan"));
const Occupancy = lazy(() => import("./pages/steps/listing/Occupancy"));
const ReservationType = lazy(
  () => import("./pages/steps/listing/ReservationType")
);
const Structure = lazy(() => import("./pages/steps/listing/Structure"));
const UploadListingImages = lazy(
  () => import("./pages/steps/listing/UploadListingImages")
);
const UserDetailForm = lazy(() => import("./pages/steps/user/UserDetailForm"));
const UserOtpVerification = lazy(
  () => import("./pages/steps/user/UserOtpVerification")
);

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading....</div>}>
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

            {/* BOOKING ROUTES */}
            <Route element={<BookingLayout />}>
              <Route path="/book" element={<BookingPage />} />
            </Route>
          </Routes>
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
