export interface Host {
  phone: string;
  name: string;
  email: string;
  id: string;
}

export interface RoomHost {
  phone: string;
  name: string;
  id: string;
  profileImage: string | null;
  gender: string;
  houseAddress: string;
  city: string;
  country: string;
  state: string;
  pincode: string;
  createdAt: string;
}

export interface Recommendation {
  location: {
    city: string;
  };
  _id: string;
  basePrice: string;
  title: string;
  childrenOccupancy: number;
  adultOccupancy: number;
  photo: [string];
}
