export interface LostItem {
  id: string;
  title: string;
  image: string;
  description: string;
  location: string;
  dateFound: string;
  category: string;
  postedBy: string;
  contact: string;
}

export const lostAndFoundData: LostItem[] = [
  {
    id: "1",
    title: "Black Wallet",
    image: "https://via.placeholder.com/300x200?text=Black+Wallet",
    description: "Black leather wallet with red stitching, contains ID and cards",
    location: "Library Floor 2",
    dateFound: "2025-05-08",
    category: "Accessories",
    postedBy: "Alex Turner",
    contact: "alex.turner@campus.edu",
  },
  {
    id: "2",
    title: "Blue Backpack",
    image: "https://via.placeholder.com/300x200?text=Blue+Backpack",
    description: "Nike blue backpack with laptop compartment and water bottle holder",
    location: "Cafeteria",
    dateFound: "2025-05-07",
    category: "Bags",
    postedBy: "Maria Garcia",
    contact: "maria.garcia@campus.edu",
  },
  {
    id: "3",
    title: "Silver Watch",
    image: "https://via.placeholder.com/300x200?text=Silver+Watch",
    description: "Silver Titan watch with brown leather strap",
    location: "Sports Ground",
    dateFound: "2025-05-06",
    category: "Electronics",
    postedBy: "Rohan Kapoor",
    contact: "rohan.kapoor@campus.edu",
  },
  {
    id: "4",
    title: "AirPods Pro",
    image: "https://via.placeholder.com/300x200?text=AirPods+Pro",
    description: "White AirPods Pro with charging case, left side slightly damaged",
    location: "Auditorium",
    dateFound: "2025-05-09",
    category: "Electronics",
    postedBy: "Sophie Chen",
    contact: "sophie.chen@campus.edu",
  },
  {
    id: "5",
    title: "Red Umbrella",
    image: "https://via.placeholder.com/300x200?text=Red+Umbrella",
    description: "Compact red umbrella with black handle",
    location: "Gate A",
    dateFound: "2025-05-05",
    category: "Accessories",
    postedBy: "Priya Nair",
    contact: "priya.nair@campus.edu",
  },
  {
    id: "6",
    title: "Student ID Card",
    image: "https://via.placeholder.com/300x200?text=ID+Card",
    description: "Laminated student ID with photo, name Rajesh Kumar",
    location: "Hostel Entrance",
    dateFound: "2025-05-09",
    category: "Documents",
    postedBy: "Ajay Singh",
    contact: "ajay.singh@campus.edu",
  },
];
