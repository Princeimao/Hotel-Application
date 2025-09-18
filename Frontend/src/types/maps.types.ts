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

export interface AddressValidation {
  result: {
    validated: boolean;
    validated_address: string;
    address_components: AddressValidationArray[];
  };
}

export interface AddressValidationArray {
  house_number: {
    componentName: string;
    componentType: string;
    componentStatus: string;
    componentDetails: string;
  };
}

export interface ForwardGeocode {
  geocodingResults: [
    {
      formatted_address: string;
      types: [string];
      name: string;
      geometry: {
        location: {
          lng: number;
          lat: number;
        };
      };
    }
  ];
  status: "ok";
}
