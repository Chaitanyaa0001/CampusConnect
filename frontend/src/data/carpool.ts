export interface CarpoolListing {
  id: string;
  driverName: string;
  from: string;
  to: string;
  departureTime: string;
  seats: number;
  pricePerSeat: number;
  description?: string;
  rating: number;
  passengers: number;
}

export const carpoolData: CarpoolListing[] = [
  {
    id: "1",
    driverName: "John Doe",
    from: "Campus Gate",
    to: "Downtown Market",
    departureTime: "09:00 AM",
    seats: 3,
    pricePerSeat: 150,
    description: "Comfortable car, AUX cable available",
    rating: 4.5,
    passengers: 1,
  },
  {
    id: "2",
    driverName: "Sarah Williams",
    from: "Hostel A",
    to: "Railway Station",
    departureTime: "02:30 PM",
    seats: 2,
    pricePerSeat: 200,
    description: "AC vehicle, music system",
    rating: 4.8,
    passengers: 0,
  },
  {
    id: "3",
    driverName: "Mike Johnson",
    from: "Library",
    to: "Shopping Mall",
    departureTime: "05:00 PM",
    seats: 4,
    pricePerSeat: 120,
    description: "Regular car, friendly driver",
    rating: 4.2,
    passengers: 2,
  },
  {
    id: "4",
    driverName: "Emily Chen",
    from: "Campus Gate",
    to: "Airport",
    departureTime: "06:00 AM",
    seats: 3,
    pricePerSeat: 500,
    description: "Morning shuttle to airport",
    rating: 4.9,
    passengers: 2,
  },
  {
    id: "5",
    driverName: "Raj Patel",
    from: "Sports Complex",
    to: "Beach",
    departureTime: "10:00 AM",
    seats: 5,
    pricePerSeat: 180,
    description: "Spacious SUV, ideal for group trips",
    rating: 4.6,
    passengers: 3,
  },
  {
    id: "6",
    driverName: "Lisa Anderson",
    from: "Hostel B",
    to: "Food Court",
    departureTime: "12:00 PM",
    seats: 2,
    pricePerSeat: 80,
    description: "Quick trip, casual driver",
    rating: 4.3,
    passengers: 1,
  },
];
