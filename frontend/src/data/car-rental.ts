export interface CarRental {
  id: string;
  name: string;
  model: string;
  image: string;
  pricePerDay: number;
  pricePerHour: number;
  seats: number;
  fuelType: string;
  transmission: string;
  availability: boolean;
  owner: string;
  rating: number;
}

export const carRentalData: CarRental[] = [
  {
    id: "1",
    name: "Swift DZire",
    model: "2023",
    image: "https://via.placeholder.com/300x200?text=Swift+DZire",
    pricePerDay: 1200,
    pricePerHour: 150,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    availability: true,
    owner: "Raj Kumar",
    rating: 4.6,
  },
  {
    id: "2",
    name: "Hyundai i20",
    model: "2022",
    image: "https://via.placeholder.com/300x200?text=Hyundai+i20",
    pricePerDay: 1500,
    pricePerHour: 180,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Automatic",
    availability: true,
    owner: "Priya Singh",
    rating: 4.8,
  },
  {
    id: "3",
    name: "Maruti Ertiga",
    model: "2023",
    image: "https://via.placeholder.com/300x200?text=Maruti+Ertiga",
    pricePerDay: 2000,
    pricePerHour: 250,
    seats: 7,
    fuelType: "Petrol",
    transmission: "Manual",
    availability: false,
    owner: "Amit Verma",
    rating: 4.4,
  },
  {
    id: "4",
    name: "Toyota Innova",
    model: "2021",
    image: "https://via.placeholder.com/300x200?text=Toyota+Innova",
    pricePerDay: 2500,
    pricePerHour: 300,
    seats: 8,
    fuelType: "Diesel",
    transmission: "Manual",
    availability: true,
    owner: "David Miller",
    rating: 4.9,
  },
  {
    id: "5",
    name: "Honda City",
    model: "2022",
    image: "https://via.placeholder.com/300x200?text=Honda+City",
    pricePerDay: 1800,
    pricePerHour: 220,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Automatic",
    availability: true,
    owner: "Sarah Johnson",
    rating: 4.7,
  },
  {
    id: "6",
    name: "Tata Nexon",
    model: "2023",
    image: "https://via.placeholder.com/300x200?text=Tata+Nexon",
    pricePerDay: 1600,
    pricePerHour: 200,
    seats: 5,
    fuelType: "Petrol",
    transmission: "Manual",
    availability: true,
    owner: "Vikram Singh",
    rating: 4.5,
  },
];
