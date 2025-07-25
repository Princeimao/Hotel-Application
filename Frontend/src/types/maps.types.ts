export interface PhotonResponse {
  features: PhotonFeature[];
  type: string;
}

export interface PhotonFeature {
  geometry: {
    coordinates: [number, number];
    type: string;
  };
  properties: {
    name: string;
    country: string;
    city?: string;
    state?: string;
    street?: string;
    postcode?: string;
    countrycode?: string;
    extent?: [number, number, number, number];
    locality: string;
    type?: string;
    osm_id: number;
    osm_type: string;
    osm_key: string;
    osm_value: string;
  };
  type: string;
}

export interface UserLocation {
  city: string;
  countryName: string;
  latitude: number;
  longitude: number;
  phoneCode: string;
  currency: string;
}
