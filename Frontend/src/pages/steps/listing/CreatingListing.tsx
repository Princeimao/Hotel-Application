import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { Car, Coffee, Home, Upload, Wifi, X } from "lucide-react";
import { useForm } from "react-hook-form";

const listingSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  address: z.string(),
  price: z.number().min(1, "Price must be greater than 0"),
  room_type: z.string(),
});

const ROOM_TYPES = [
  "Entire home/apartment",
  "Private room",
  "Shared room",
  "Hotel room",
];

const AMENITIES = [
  { id: "wifi", label: "WiFi", icon: Wifi },
  { id: "kitchen", label: "Kitchen", icon: Coffee },
  { id: "parking", label: "Free parking", icon: Car },
  { id: "pool", label: "Pool", icon: Home },
  { id: "gym", label: "Gym", icon: Home },
  { id: "tv", label: "TV", icon: Home },
  { id: "ac", label: "Air conditioning", icon: Home },
  { id: "heating", label: "Heating", icon: Home },
  { id: "washer", label: "Washer", icon: Home },
  { id: "dryer", label: "Dryer", icon: Home },
  { id: "pets", label: "Pet friendly", icon: Home },
  { id: "smoking", label: "Smoking allowed", icon: Home },
];

const CreateListing: React.FC = () => {
  const [step, setStep] = useState(1);
  const [photos, setPhotos] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const createListing = "afd";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(listingSchema),
  });

  const watchedValues = watch();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // In a real app, you would upload to a cloud storage service
      // For demo, we'll use placeholder images
      const newPhotos = Array.from(files).map(
        (file, index) =>
          `https://images.pexels.com/photos/${
            2000000 + Math.floor(Math.random() * 1000000)
          }/pexels-photo-${
            2000000 + Math.floor(Math.random() * 1000000)
          }.jpeg?auto=compress&cs=tinysrgb&w=800`
      );
      setPhotos((prev) => [...prev, ...newPhotos].slice(0, 10));
    }
  };

  const removePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleAmenity = (amenityId: string) => {
    setAmenities((prev) =>
      prev.includes(amenityId)
        ? prev.filter((id) => id !== amenityId)
        : [...prev, amenityId]
    );
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await createListing({
        ...data,
        amenities,
        photos,
        availability: true,
      });
      toast.success("Listing created successfully!");
      navigate("/listings");
    } catch (error: any) {
      toast.error(error.message || "Failed to create listing");
    }
    setLoading(false);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Basic Information
              </h2>
              <p className="text-gray-600">
                Let's start with the basics about your space
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing Title
                </label>
                <input
                  {...register("title")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Beautiful apartment in downtown with city view"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Describe your space, what makes it special, the neighborhood, and any important details guests should know..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  {...register("address")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter the full address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Type
                  </label>
                  <select
                    {...register("room_type")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select room type</option>
                    {ROOM_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.room_type && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.room_type.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Night ($)
                  </label>
                  <input
                    {...register("price")}
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="e.g., 85"
                  />
                  {errors.price && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Amenities
              </h2>
              <p className="text-gray-600">What amenities do you offer?</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {AMENITIES.map((amenity) => {
                const Icon = amenity.icon;
                const isSelected = amenities.includes(amenity.id);
                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`flex items-center space-x-3 p-4 border-2 rounded-lg transition-all ${
                      isSelected
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{amenity.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Photos</h2>
              <p className="text-gray-600">Add photos to showcase your space</p>
            </div>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Upload className="w-12 h-12 text-gray-400" />
                  <div className="text-lg font-medium text-gray-900">
                    Upload Photos
                  </div>
                  <div className="text-sm text-gray-500">
                    Drag and drop or click to select photos
                  </div>
                </label>
              </div>

              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Review & Publish
              </h2>
              <p className="text-gray-600">
                Review your listing before publishing
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Basic Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Title:</strong> {watchedValues.title}
                    </div>
                    <div>
                      <strong>Type:</strong> {watchedValues.room_type}
                    </div>
                    <div>
                      <strong>Price:</strong> ${watchedValues.price}/night
                    </div>
                    <div>
                      <strong>Address:</strong> {watchedValues.address}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenityId) => {
                      const amenity = AMENITIES.find((a) => a.id === amenityId);
                      return (
                        <span
                          key={amenityId}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {amenity?.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Description
                </h3>
                <p className="text-sm text-gray-700">
                  {watchedValues.description}
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Photos ({photos.length})
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  {photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Progress Bar */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Create New Listing
            </h1>
            <div className="text-sm text-gray-500">Step {step} of 4</div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(Math.min(4, step + 1))}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Creating..." : "Publish Listing"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListing;
