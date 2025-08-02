import { Camera, Lock, Save } from "lucide-react";
import { useState } from "react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const onSubmitProfile = async (data: sting) => {
    console.log(data);
  };

  const profile = {
    profile_photo: "aljkdfs",
    full_name: "dskjfa ",
  };

  const handlePhoneVerification = () => {};

  const handleEmailVerification = () => {};

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">
          Manage your profile and account preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="px-6 flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Profile Information
          </button>
          <button
            onClick={() => setActiveTab("verification")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "verification"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Verification
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "security"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Security
          </button>
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  {profile.profile_photo ? (
                    <img
                      src={profile.profile_photo}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {profile.full_name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <button className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Profile Photo
                </h3>
                <p className="text-sm text-gray-500">
                  Upload a photo to help guests recognize you
                </p>
              </div>
            </div>

            <form
              // onSubmit={handleSubmit(onSubmitProfile)}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    //   {...register("full_name")}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your full name"
                  />
                  {/* {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.full_name.message}
                      </p>
                    )} */}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    //   value={profile.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 text-gray-500"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email cannot be changed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    //   {...register("phone")}
                    type="tel"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                  {/* {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )} */}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  // {...register("bio")}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Tell guests a little about yourself..."
                />
                {/* {errors.bio && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.bio.message}
                    </p>
                  )} */}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  // disabled={loading}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {/* {loading ? "Saving..." : "Save Changes"} */}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === "verification" && (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-800">
                Why verify your account?
              </h3>
              <p className="mt-1 text-sm text-blue-700">
                Verified accounts build trust with guests and can lead to more
                bookings.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                  //   className={`w-3 h-3 rounded-full ${
                  //     profile.email_verified ? "bg-green-500" : "bg-red-500"
                  //   }`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Email Verification
                    </h4>
                    {/* <p className="text-sm text-gray-500">{profile.email}</p> */}
                  </div>
                </div>
                {/* {!profile.email_verified && (
                    <button
                      onClick={handleEmailVerification}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Verify
                    </button>
                  )} */}
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                  //   className={`w-3 h-3 rounded-full ${
                  //     profile.phone_verified ? "bg-green-500" : "bg-red-500"
                  //   }`}
                  ></div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Phone Verification
                    </h4>
                    <p className="text-sm text-gray-500">
                      {/* {profile.phone || "No phone number added"} */}
                    </p>
                  </div>
                </div>
                {/* {profile.phone && !profile.phone_verified && (
                    <button
                      onClick={handlePhoneVerification}
                      className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Send OTP
                    </button>
                  )} */}
              </div>
            </div>
          </div>
        )}

        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-red-800">
                Password Security
              </h3>
              <p className="mt-1 text-sm text-red-700">
                Use a strong password and update it regularly to keep your
                account secure.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">Password</h4>
                    <p className="text-sm text-gray-500">
                      Last updated 30 days ago
                    </p>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                    <Lock className="w-4 h-4 mr-1" />
                    Change Password
                  </button>
                </div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Two-Factor Authentication
                    </h4>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="inline-flex items-center px-3 py-1.5 border border-blue-300 rounded text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 transition-colors">
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
