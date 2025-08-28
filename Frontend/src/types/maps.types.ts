export interface OlaApiResponse {
  predictions: [
    {
      types: string;
      structured_formatting: {
        main_text: string;
      };
      geometry: {
        location: {
          lng: number;
          lat: number;
        };
      };
    }
  ];
  status: string;
}

export interface UserLocation {
  city: string;
  countryName: string;
  latitude: number;
  longitude: number;
  phoneCode: string;
  currency: string;
}
