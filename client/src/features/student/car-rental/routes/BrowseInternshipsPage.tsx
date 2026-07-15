import AppNavbar from "@/shared/components/navigation/AppNavbar";
import InternshipCardProps from "@/types/InternshipCardProps";
import BrowseInternshipsClient from "@/features/student/car-rental/components/BrowseInternshipsClient";

export default function BrowseInternshipsPage() {
  const rentalListings: InternshipCardProps[] = [
    {
      id: 1,
      imageUrl: "/I1.jpg",
      position: "Hyundai i20 Sportz",
      company: "Owner: Ananya Kapoor",
      location: "Pickup: North Campus Gate 2",
      duration: "INR 1800/day",
      skills: ["Hatchback", "Petrol", "Available Today"],
      description: "Well-maintained hatchback with AC and music system, ideal for city rides.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },
    {
      id: 2,
      imageUrl: "/I2.jpg",
      position: "Honda City VX",
      company: "Owner: Rohit Verma",
      location: "Pickup: Civil Lines Metro",
      duration: "INR 2400/day",
      skills: ["Sedan", "Automatic", "Available Weekend"],
      description: "Comfortable automatic sedan for long drives and airport pickup drops.",
      status: "Available",
    },  
  ];

  return (
    <div className="min-h-screen dark:bg-[#0A0F1C]">
      <AppNavbar />

      <BrowseInternshipsClient internships={rentalListings} />
    </div>
  );
}
