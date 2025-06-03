export type TicketCategory = "event" | "flight" | "hotel" | "tour";
export type TicketStatus = "active" | "upcoming" | "used" | "expired" | "cancelled";

export interface FlightDetails {
  fromCity: string;
  toCity: string;
  airline: string;
  flightNumber: string;
  departureTime: string | Date;
  arrivalTime: string | Date;
  departureAirportCode?: string;
  arrivalAirportCode?: string;
  gate?: string;
  seat?: string;
  class?: string;
}

export interface HotelDetails {
  checkInDate: string | Date;
  checkOutDate: string | Date;
  roomType?: string;
  numberOfGuests?: number;
}

export interface TourDetails {
  duration?: string;
  groupSize?: number;
}

export interface Ticket {
  id: string;
  category: TicketCategory;
  title: string;
  date: string | Date;
  time?: string;
  location?: string;
  price: number;
  currency: string;
  qrCodeUrl: string;
  bookingReference: string;
  status?: TicketStatus;
  purchaseDate?: string | Date;
  organizer?: string;
  flightDetails?: FlightDetails;
  hotelDetails?: HotelDetails;
  tourDetails?: TourDetails;
}