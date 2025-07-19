import { addDays, differenceInDays, format, isValid, parse } from "date-fns";
import { Car, Coffee, Heart, MapPin, Users, Wifi } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useParams, useSearchParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [guests, setGuests] = useState(1);

  // Mock data - in a real app, this would be fetched based on the ID
  const property = {
    id: id,
    title: "Luxury Beachfront Villa",
    location: "Gurugram, India",
    price: 2999,
    description:
      "Experience the ultimate luxury at this stunning beachfront villa. With panoramic ocean views, private beach access, and world-class amenities, this property offers an unforgettable getaway. The spacious living areas, gourmet kitchen, and elegant bedrooms provide comfort and sophistication.",
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    amenities: [
      { id: "wifi", label: "WiFi", icon: Wifi },
      { id: "parking", label: "Free Parking", icon: Car },
      { id: "kitchen", label: "Kitchen", icon: Coffee },
      { id: "pool", label: "Pool", icon: Users },
    ],
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    ],
    host: {
      name: "Ronnie Corbett",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      joinedDate: "September 2019",
      responseRate: "100%",
      responseTime: "within an hour",
    },
  };

  const calculateTotal = useCallback(() => {
    if (!checkIn || !checkOut) return 0;
    const days = differenceInDays(checkOut, checkIn);
    return days * property.price;
  }, [checkIn, checkOut, property.price]);

  useEffect(() => {
    const checkInString = searchParams.get("checkIn");
    const checkOutString = searchParams.get("checkOut");

    if (checkInString && checkOutString) {
      const parseCheckIn = parse(checkInString, "dd-MM-yyyy", new Date());
      const parseCheckOut = parse(checkOutString, "dd-MM-yyyy", new Date());

      if (isValid(parseCheckIn) && isValid(parseCheckOut)) {
        setCheckIn(parseCheckIn);
        setCheckOut(parseCheckOut);
      }
    }
    calculateTotal();
  }, [searchParams, calculateTotal]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {property.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-8 rounded-xl overflow-hidden">
          <div className="lg:row-span-2">
            <img
              src={property.images[0]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {property.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${property.title} ${index + 2}`}
                className="w-full h-48 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Property Info */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Hosted by {property.host.name}
                  </h2>
                  <div className="flex items-center space-x-4 text-gray-600 mt-1">
                    <span>{property.guests} guests</span>
                    <span>{property.bedrooms} bedrooms</span>
                    <span>{property.bathrooms} bathrooms</span>
                  </div>
                </div>
                <img
                  src={property.host.avatar}
                  alt={property.host.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </div>
            </div>

            {/* Description */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <p className="text-gray-700 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Amenities */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {property.amenities.map((amenity) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={amenity.id}
                      className="flex items-center space-x-3"
                    >
                      <Icon className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">{amenity.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    &#8377;{property.price}
                  </span>
                  <span className="text-gray-600"> / night</span>
                </div>
                <button className="text-red-600 hover:text-red-700 transition-colors">
                  <Heart className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn ? format(checkIn, "yyyy-MM-dd") : ""}
                      onChange={(e) => {
                        const parsed = parse(
                          e.target.value,
                          "yyyy-MM-dd",
                          new Date()
                        );
                        if (isValid(parsed)) setCheckIn(parsed);
                      }}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut ? format(checkOut, "yyyy-MM-dd") : ""}
                      min={format(addDays(new Date(), 1), "yyyy-MM-dd")}
                      
                      onChange={(e) => {
                        const parsed = parse(
                          e.target.value,
                          "yyyy-MM-dd",
                          new Date()
                        );
                        if (isValid(parsed)) setCheckOut(parsed);
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {[...Array(property.guests)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} guest{i > 0 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>
                      ${property.price} x {differenceInDays(checkOut, checkIn)}{" "}
                      nights
                    </span>
                    <span>${calculateTotal()}</span>
                  </div>

                  <div className="flex items-center justify-between font-semibold text-gray-900 pt-2 border-t">
                    <span>Total</span>
                    <span>
                      ${calculateTotal() + Math.round(calculateTotal() * 0.1)}
                    </span>
                  </div>
                </div>
              )}

              <button className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors font-medium">
                Reserve Now
              </button>

              <p className="text-sm text-gray-600 text-center mt-3">
                You won't be charged yet
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
