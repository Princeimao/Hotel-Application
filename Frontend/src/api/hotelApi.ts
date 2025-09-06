import type { Location } from "@/pages/steps/listing/Address";
import type { BookingAvailability, BookingIntent } from "@/types/booking.type";
import type { Recommendation, RoomHost } from "@/types/host.types";
import type { BookingRoomDetials, RoomDetials } from "@/types/hotel.types";
import type {
  listingAddressValidation,
  listingDetailsValidation,
} from "@/validation";
import { z } from "zod";
import { instance } from "./axios";
import { getUserLocation } from "./mapsApi";

export const fetchRoomDetailsFromSearch = async () => {
  try {
    const response = await instance.get(`listing/get-accommodations`);

    return response.data;
  } catch (error) {
    console.log("something went wrong while getting the hotel", error);
  }
};

export const fetchRoomDetails = async (
  accommodationId: string
): Promise<{
  success: boolean;
  message: string;
  roomDetails?: {
    bookings: { availability: BookingAvailability[] };
    host: { host: RoomHost };
    listing: { room: RoomDetials };
  };
}> => {
  try {
    const response = await instance.get(
      `/overview/accommodation-details/${accommodationId}`
    );

    console.log(response);
    return {
      success: true,
      message: "get room successful",
      roomDetails: response.data.accommodationDetails,
    };
  } catch (error) {
    console.log("something went wrong while getting the hotel", error);
    return {
      success: false,
      message: "something went wrong while getting the hotel",
    };
  }
};

// export const generateUploadToken = async (): Promise<{
//   success: boolean;
//   message: string;
//   imageKit?: {
//     token: string;
//     expire: number;
//     signature: string;
//     publicKey: string;
//   };
// }> => {
//   try {
//     const response = await instance.get("/listing/upload-token", {
//       signal: controller.signal,
//     });

//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     if (error.name === "CanceledError") {
//       console.log("Request cancelled", error);
//       return {
//         success: false,
//         message: "Request cancelled",
//       };
//     }
//
//     console.log("something went wrong while getting upload token", error);
//     return {
//       success: false,
//       message: "something went wrong while getting upload token",
//     };
//   }
// };

export const uploadImage = async (
  roomId: string,
  files: File[]
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const formData = new FormData();

    files.map((file) => {
      formData.append("roomImages", file);
    });

    const response = await instance.post(
      `listing/accommodation-images/${roomId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while upload the image", error);
    return {
      success: false,
      message: "something went wrontg while upload the image",
    };
  }
};

export const becomaAHost = async (
  hostId: string
): Promise<{
  success: boolean;
  message: string;
  roomId?: string;
}> => {
  try {
    const response = await instance.post(
      `/listing/list-accommodation/${hostId}`
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while setting up", error);
    return {
      success: false,
      message: "something went wrong while setting up",
    };
  }
};

export const structure = async (
  roomId: string,
  roomType: string
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await instance.post(
      `/listing/accommodation-type/${roomId}`,
      { roomType: roomType }
    );

    return response.data;
  } catch (error) {
    console.log(
      "something went wrong while updating accommodation structure",
      error
    );
    return {
      success: false,
      message: "something went wrong while updating accommodation structure",
    };
  }
};

export const address = async (
  roomId: string,
  data: z.infer<typeof listingAddressValidation>,
  coordinates: Location
) => {
  try {
    const response = await instance.post(
      `/listing/accommodation-address/${roomId}`,
      {
        flatNo: data.flatNo,
        street: data.street,
        nearbyLandmark: data.nearbyLandmark,
        locality: data.locality,
        country: data.country,
        state: data.state,
        city: data.city,
        pincode: data.pincode,
        coordinates: [coordinates.lng, coordinates.lat],
      }
    );

    return response.data;
  } catch (error) {
    console.log(
      "something went wrong while updating accommodation address",
      error
    );
    return {
      success: false,
      message: "something went wrong while updating accommodation address",
    };
  }
};

// Need Backend Changes
// export const floorPlan = async (roomId: string) => {
//   try {
//     const response = instance.post(`/listing/accommodation-details/${roomId}`);
//   } catch (error) {
//     console.log(
//       "something went wrong while updating accommodation floor plan",
//       error
//     );
//     return {
//       success: false,
//       message: "something went wrong while updating accommodation floor plan",
//     };
//   }
// };

export const occupancyApi = async (roomId: string, sharedWith: string[]) => {
  try {
    const response = await instance.post(
      `/listing/accommodation-people/${roomId}`,
      { sharedWith: [...sharedWith] }
    );

    return response.data;
  } catch (error) {
    console.log(
      "something went wrong while updating accommodation occupancy",
      error
    );
    return {
      success: false,
      message: "something went wrong while updating accommodation occupancy",
    };
  }
};

export const amenitiesApi = async (roomId: string, amenities: string[]) => {
  try {
    const response = await instance.post(
      `/listing/accommodation-amenities/${roomId}`,
      { amenities: [...amenities] }
    );

    return response.data;
  } catch (error) {
    console.log(
      "something went wrong while updating accommodation occupancy",
      error
    );
    return {
      success: false,
      message: "something went wrong while updating accommodation occupancy",
    };
  }
};

export const uploadUrl = async (roomId: string, imageUrls: string[]) => {
  try {
    const response = await instance.post(
      `/listing/accommodation-images/${roomId}`,
      { images: [...imageUrls] }
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while uploading image urls to db", error);
    return {
      success: false,
      message: "something went wrong while uploading image urls to db",
    };
  }
};

export const basicDetails = async (
  roomId: string,
  data: z.infer<typeof listingDetailsValidation>
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await instance.post(
      `/listing/accommodation-baiscDetails/${roomId}`,
      {
        title: data.title,
        description: data.details,
        basePrice: Number(data.basePrice),
      }
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while updating basic details", error);
    return {
      success: false,
      message: "something went wrong while updating basic details",
    };
  }
};

export const reservationType = async (
  roomId: string,
  minimumBookingDays: number,
  petsAllowed: boolean
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const response = await instance.post(
      `/listing/accommodation-complete/${roomId}`,
      {
        minimumBookingDays,
        petsAllowed,
      }
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while updating basic details", error);
    return {
      success: false,
      message: "something went wrong while updating basic details",
    };
  }
};

export const getAccommodationSuggestions = async (): Promise<{
  success: boolean;
  message: string;
  accommodations: Recommendation[];
}> => {
  try {
    const userLocation = await getUserLocation();

    if (
      userLocation?.latitude === undefined ||
      userLocation?.longitude === undefined
    ) {
      throw new Error("user Location now found");
    }

    const response = await instance.get(
      `/listing/get-accommodation-suggestion/?${new URLSearchParams({
        lat: userLocation.latitude.toString(),
        lng: userLocation.longitude.toString(),
      })}`
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      "something went wrong while getting accommodation suggestion",
      error
    );
    return {
      success: false,
      message: "something went wrong while getting accommodation suggestion",
    };
  }
};

export const getAccommodationById = async (
  roomId: string
): Promise<{
  success: boolean;
  message: string;
  room?: RoomDetials;
}> => {
  try {
    const response = await instance.get(`/listing/get-accommodation/${roomId}`);

    return response.data;
  } catch (error) {
    console.log("something went wrong while getting accommodation", error);
    return {
      success: false,
      message: "something went wrong while getting accommodation",
    };
  }
};

export const createBookingIntent = async (
  roomId: string,
  guests: { adults: number; children: number; infants: number; pets: number },
  checkIn: Date,
  checkOut: Date
): Promise<{
  success: boolean;
  message: string;
  sessionId: string | null;
}> => {
  try {
    const response = await instance.post(
      `/booking/create-bookingIntent/${roomId}`,
      {
        guests,
        checkIn,
        checkOut,
      }
    );

    return response.data;
  } catch (error) {
    console.log("something went wrong while create booking intent", error);
    return {
      success: false,
      message: "something went wrong while create booking intent",
      sessionId: null,
    };
  }
};

export const bookingPageVerification = async (
  roomId: string,
  sessionId: string
): Promise<{
  success: boolean;
  message: string;
  booking?: {
    accommodation: BookingRoomDetials;
    bookingIntent: BookingIntent;
  };
}> => {
  try {
    const response = await instance.get(
      `/overview/get-bookingIntent-details/${roomId}/${sessionId}`
    );

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log("something went wrong while getting details", error);
    return {
      success: false,
      message: "something went wrong while getting details",
    };
  }
};
