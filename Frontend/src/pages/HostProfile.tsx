import { getHost } from "@/api/hostApi";
import RoomCard from "@/components/RoomCard";
import type { Host } from "@/types/host.types";
import type { RoomDetials } from "@/types/hotel.types";
import { Clock, MapPin, MessageCircle, Plus, Star } from "lucide-react";
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

  const mockReviews = [
    {
      id: "1",
      guestName: "Michael R.",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      date: "November 2024",
      comment:
        "Sarah was an amazing host! The loft was exactly as described and the location was perfect. Great communication throughout our stay.",
    },
    {
      id: "2",
      guestName: "Emma T.",
      avatar:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 5,
      date: "October 2024",
      comment:
        "Beautiful space with incredible attention to detail. Sarah provided excellent local recommendations. Highly recommend!",
    },
    {
      id: "3",
      guestName: "David L.",
      avatar:
        "https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150",
      rating: 4,
      date: "September 2024",
      comment:
        "Great location and clean, modern space. Check-in was seamless and Sarah was very responsive to questions.",
    },
  ];

  if (!host) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    // <div className="space-y-8">
    //   {/* Profile Header */}
    //   <div className="bg-white rounded-lg shadow-sm border p-6">
    //     <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
    //       <div className="w-24 h-24 rounded-full flex items-center justify-center">
    //         <img
    //           src={
    //             host?.host.profileImage === null
    //               ? "https://github.com/shadcn.png"
    //               : host?.host.profileImage
    //           }
    //           alt={host?.host.id}
    //           className="w-24 h-24 rounded-full object-cover"
    //         />
    //       </div>

    //       <div className="flex-1">
    //         <div className="flex items-center space-x-3 mb-2">
    //           <h1 className="text-3xl font-bold text-gray-900">
    //             {host?.host.name}
    //           </h1>
    //         </div>

    //         <div className="space-y-2 text-gray-600">
    //           {host?.host.email && (
    //             <div className="flex items-center space-x-2">
    //               <Mail className="w-4 h-4" />
    //               <span>{host?.host.email}</span>
    //               {host?.host.isEmailVerified && (
    //                 <CheckCircle className="w-4 h-4 text-green-500" />
    //               )}
    //             </div>
    //           )}
    //           {host?.host.phone && (
    //             <div className="flex items-center space-x-2">
    //               <Phone className="w-4 h-4" />
    //               <span>{host?.host.phone}</span>
    //               {host?.host.isPhoneVerified && (
    //                 <CheckCircle className="w-4 h-4 text-green-500" />
    //               )}
    //             </div>
    //           )}
    //         </div>

    //         {/* {profile.bio && (
    //           <p className="mt-4 text-gray-700 leading-relaxed">
    //             {profile.bio}
    //           </p>
    //         )} */}
    //       </div>

    //       <div className="flex flex-col space-y-2">
    //         <Link
    //           to="/settings"
    //           className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
    //         >
    //           <Settings className="w-4 h-4 mr-2" />
    //           Edit Profile
    //         </Link>
    //         <Link
    //           to="/create-listing"
    //           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    //         >
    //           <Plus className="w-4 h-4 mr-2" />
    //           Add Listing
    //         </Link>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Verification Status */}
    //   <div className="bg-white rounded-lg shadow-sm border p-6">
    //     <h2 className="text-xl font-semibold text-gray-900 mb-4">
    //       Verification Status
    //     </h2>
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //       <div className="flex items-center space-x-3 p-4 border rounded-lg">
    //         <div
    //           className={`w-3 h-3 rounded-full ${
    //             host?.host.isEmailVerified ? "bg-green-500" : "bg-red-500"
    //           }`}
    //         ></div>
    //         <div>
    //           <p className="font-medium">Email</p>
    //           <p className="text-sm text-gray-500">
    //             {host?.host.isEmailVerified ? "Verified" : "Not verified"}
    //           </p>
    //         </div>
    //       </div>

    //       <div className="flex items-center space-x-3 p-4 border rounded-lg">
    //         <div
    //           className={`w-3 h-3 rounded-full ${
    //             host?.host.isPhoneVerified ? "bg-green-500" : "bg-red-500"
    //           }`}
    //         ></div>
    //         <div>
    //           <p className="font-medium">Phone</p>
    //           <p className="text-sm text-gray-500">
    //             {host?.host.isPhoneVerified ? "Verified" : "Not verified"}
    //           </p>
    //         </div>
    //       </div>

    //       <div className="flex items-center space-x-3 p-4 border rounded-lg">
    //         <div
    //           className={`w-3 h-3 rounded-full ${
    //             profile.verification_status === "verified"
    //               ? "bg-green-500"
    //               : "bg-yellow-500"
    //           }`}
    //         ></div>
    //         <div>
    //           <p className="font-medium">Host Status</p>
    //           <p className="text-sm text-gray-500">
    //             {profile.verification_status === "verified"
    //               ? "Verified Host"
    //               : "Pending Review"}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   {/* Listings Summary */}
    //   <div className="bg-white rounded-lg shadow-sm border p-6">
    //     <div className="flex justify-between items-center mb-6">
    //       <h2 className="text-xl font-semibold text-gray-900">
    //         {host?.host.name.trim()}'s Listings
    //       </h2>
    //       <Link
    //         to="/listings"
    //         className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
    //       >
    //         View All
    //       </Link>
    //     </div>

    //     {host?.listing === undefined || host?.listing.length > 0 ? (
    //       <div className="space-y-4">
    //         {host?.listing.map((listing) => (
    //           <div
    //             key={listing._id}
    //             className="flex items-center space-x-4 p-4 border rounded-lg  hover:bg-gray-50 transition-colors"
    //           >
    //             <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
    //               {listing.photo.length > 0 ? (
    //                 <img
    //                   src={listing.photo[0]}
    //                   alt={listing.title}
    //                   className="w-16 h-16 rounded-lg object-cover"
    //                 />
    //               ) : (
    //                 <MapPin className="w-6 h-6 text-gray-400" />
    //               )}
    //             </div>
    //             <div className="flex-1">
    //               <h3 className="font-medium text-gray-900">{listing.title}</h3>
    //               <p className="text-sm text-gray-500">
    //                 {listing.location.state}
    //               </p>
    //             </div>
    //             <div className="text-right">
    //               <p className="font-semibold text-gray-900">
    //                 ${listing.basePrice}/night
    //               </p>
    //               <p className="text-sm text-gray-500">
    //                 {listing.accommodationType}
    //               </p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     ) : (
    //       <div className="text-center py-12">
    //         <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    //         <h3 className="text-lg font-medium text-gray-900 mb-2">
    //           No listings yet
    //         </h3>
    //         <p className="text-gray-500 mb-4">
    //           Create your first listing to start hosting
    //         </p>
    //         <Link
    //           to="/create-listing"
    //           className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
    //         >
    //           <Plus className="w-4 h-4 mr-2" />
    //           Create Your First Listing
    //         </Link>
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div className="bg-white w-full rounded-2xl shadow-sm border border-gray-100 px-15 py-14">
      <div className="justify-between flex grid-cols-2">
        <div className="flex w-[46%] items-start gap-6 mb-8">
          <div className="relative">
            <img
              src={
                host?.host.profileImage === null
                  ? "https://github.com/shadcn.png"
                  : host?.host.profileImage
              }
              alt={host.host.name}
              className="w-24 h-24 rounded-full object-cover ring-4 ring-gray-50"
            />
            {/* {host.verified && (
            <div className="absolute -bottom-1 -right-1 bg-airbnb-red text-white rounded-full p-1.5">
              <Shield className="w-4 h-4" />
            </div>
          )} */}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-semibold text-gray-900">
                {host.host.name}
              </h1>
              {/* {host.verified && (
              <span className="text-sm text-airbnb-red font-medium">
                Verified
              </span>
            )} */}
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.2</span>
                <span>(reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Responds Fast</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>100% response rate</span>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Living and working in india. Passionate about travel, food and the
              sea! We love holidays in rural setting and our home is perfect for
              long trails in countryside or curling up with a mug of tea & a
              book and star gazing in the night.
            </p>
            <p className="text-sm text-gray-500 mt-3">Joined a month ago</p>
          </div>
        </div>

        <div className="w-[01px] bg-gray-100"></div>

        <div className="space-y-6 w-[46%]">
          <h2 className="text-xl font-semibold text-gray-900">
            {host.host.name.trim()}'s Reviews
          </h2>
          <div className="space-y-4">
            {mockReviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-100 pb-4 last:border-b-0"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={review.avatar}
                    alt={review.guestName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">
                        {review.guestName}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] mt-13 bg-gray-100"></div>

      <div className="py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">
          {host.host.name.trim()}'s Listings
        </h2>

        <div>
          {host.listing.length < 0 ? (
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
          ) : (
            host.listing.map((listing) => (
              <div className="w-full flex overflow-hidden">
                <RoomCard
                  adults={listing.adultOccupancy}
                  childs={listing.childrenOccupancy}
                  city={listing.location.city}
                  id={listing._id}
                  photo={listing.photo[0]}
                  price={listing.basePrice}
                  key={listing._id}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
