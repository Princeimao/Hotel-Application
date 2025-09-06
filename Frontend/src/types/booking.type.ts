export interface BookingAvailability {
  _id: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  bookingId: string;
}

export interface BookingIntent {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests?: {
    adults: number;
    children: number;
    infants: number;
    pets: number;
  };
}
