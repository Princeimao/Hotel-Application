import { format } from "date-fns";
import {
  Calendar,
  CheckCircle,
  Download,
  MapPin,
  Star,
  Users,
} from "lucide-react";

const room = {
  images: "something",
  title: "something",
  rating: "something",
  review: "something",
};

const BookingConfirmation = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your reservation has been successfully processed
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-6">
            <h2 className="text-2xl font-semibold mb-2">Booking Details</h2>
            <p className="text-green-100">
              Confirmation #: BK-{Date.now().toString().slice(-8)}
            </p>
          </div>

          <div className="p-6 space-y-6">
            <div className="border-b pb-6 last:border-b-0 last:pb-0">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={room.images}
                  alt={room.title}
                  className="w-full md:w-48 h-48 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                    {room.title}
                  </h3>

                  <div className="flex items-center space-x-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {room.rating}
                    </span>
                    <span className="text-sm text-gray-500">(20 reviews)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>New Delhi</span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>4 guests</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Check-in</div>
                        <div className="font-semibold text-gray-900 flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(
                              new Date("14-10-2024"),
                              "EEE, MMM dd, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          After 3:00 PM
                        </div>
                      </div>

                      <div>
                        <div className="text-sm text-gray-600">Check-out</div>
                        <div className="font-semibold text-gray-900 flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {format(
                              new Date("20-10-2024"),
                              "EEE, MMM dd, yyyy"
                            )}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          Before 11:00 AM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Download Confirmation</span>
          </button>

          <button
            // onClick={handleNewBooking}
            className="flex-1 bg-white text-blue-600 py-4 rounded-xl font-semibold border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-200"
          >
            Book Another Stay
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-6 p-6 bg-blue-50 rounded-xl">
          <h3 className="font-semibold text-gray-900 mb-3">
            Important Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              • A confirmation email has been sent to your registered email
              address
            </li>
            <li>• Please bring a valid ID for check-in verification</li>
            <li>• Free cancellation up to 48 hours before check-in</li>
            <li>
              • Contact the host directly for any special requests or questions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
