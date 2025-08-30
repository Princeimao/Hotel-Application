import { getHost } from "@/api/hostApi";
import type { Host } from "@/types/host.types";
import type { RoomDetials } from "@/types/hotel.types";
import { CheckCircle, Mail, MapPin, Phone, Plus, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface HostDetails {
  host: Host;
  listing: RoomDetials[];
}

const HostProfile = () => {
  const { hostId } = useParams();
  const [host, setHost] = useState<HostDetails>();

  useEffect(() => {
    async function fetchHostDetails() {
      if (!hostId) {
        throw new Error("host id is not defined");
      }
      const response = await getHost(hostId);

      if (!response.hostDetails) {
        throw new Error("something went wrong");
      }

      setHost({
        host: response.hostDetails.host.host,
        listing: response.hostDetails.listing.accommodations,
      });
    }

    fetchHostDetails();
  }, [hostId]);

  console.log(host?.listing);

  const profile = {
    profile_photo: "kasldfj",
    full_name: "slkjfd",
    verification_status: "slkjfd",
    email: "alskdjf ",
    email_verified: "alskdjf ",
    phone: "alskdjf ",
    phone_verified: "alskdjf ",
    bio: "alskdjf ",
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-24 h-24 rounded-full flex items-center justify-center">
            <img
              src={
                host?.host.profileImage === null
                  ? "https://github.com/shadcn.png"
                  : host?.host.profileImage
              }
              alt={host?.host.id}
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {host?.host.name}
              </h1>
            </div>

            <div className="space-y-2 text-gray-600">
              {host?.host.email && (
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{host?.host.email}</span>
                  {host?.host.isEmailVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
              {host?.host.phone && (
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{host?.host.phone}</span>
                  {host?.host.isPhoneVerified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                </div>
              )}
            </div>

            {/* {profile.bio && (
              <p className="mt-4 text-gray-700 leading-relaxed">
                {profile.bio}
              </p>
            )} */}
          </div>

          <div className="flex flex-col space-y-2">
            <Link
              to="/settings"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Link>
            <Link
              to="/create-listing"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Link>
          </div>
        </div>
      </div>

      {/* Verification Status */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Verification Status
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <div
              className={`w-3 h-3 rounded-full ${
                host?.host.isEmailVerified ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div>
              <p className="font-medium">Email</p>
              <p className="text-sm text-gray-500">
                {host?.host.isEmailVerified ? "Verified" : "Not verified"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <div
              className={`w-3 h-3 rounded-full ${
                host?.host.isPhoneVerified ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <div>
              <p className="font-medium">Phone</p>
              <p className="text-sm text-gray-500">
                {host?.host.isPhoneVerified ? "Verified" : "Not verified"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-4 border rounded-lg">
            <div
              className={`w-3 h-3 rounded-full ${
                profile.verification_status === "verified"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            ></div>
            <div>
              <p className="font-medium">Host Status</p>
              <p className="text-sm text-gray-500">
                {profile.verification_status === "verified"
                  ? "Verified Host"
                  : "Pending Review"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Listings Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Your Listings</h2>
          <Link
            to="/listings"
            className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600">
              {host?.listing.length}
            </div>
            <div className="text-sm text-gray-600">Total Listings</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600">
              {/* {host?.listing.filter((l) => l.availability).length} */}
            </div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            {/* <div className="text-3xl font-bold text-yellow-600">
              $
              {listings.reduce((sum, l) => sum + l.price, 0) /
                (listings.length || 1)}
            </div> */}
            <div className="text-sm text-gray-600">Avg. Price/Night</div>
          </div>
        </div>

        {host?.listing.length > 0 ? (
          <div className="space-y-4">
            {host?.listing.map((listing) => (
              <div
                key={listing._id}
                className="flex items-center space-x-4 p-4 border rounded-lg  hover:bg-gray-50 transition-colors"
              >
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  {listing.photo.length > 0 ? (
                    <img
                      src={listing.photo[0]}
                      alt={listing.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  ) : (
                    <MapPin className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{listing.title}</h3>
                  <p className="text-sm text-gray-500">
                    {listing.location.state}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${listing.basePrice}/night
                  </p>
                  <p className="text-sm text-gray-500">
                    {listing.accommodationType}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No listings yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first listing to start hosting
            </p>
            <Link
              to="/create-listing"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HostProfile;
