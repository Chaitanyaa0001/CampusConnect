import InternshipDetailPage from "@/features/student/car-rental/components/InternshipDetailPage";
import InternshipCardProps from "@/types/InternshipCardProps";

interface PageProps {
  params: { id: string };
}

export default function CarpoolDetailPage({ params }: PageProps) {
  const rides = [
    {
      id: 1,
      position: "North Campus to Gurgaon Cyber City",
      company: "Driver: Priya Nair",
      location: "Starts 8:30 AM",
      duration: "INR 180",
      skills: ["Sedan", "3 Seats Left", "Mon-Fri"],
      description: "Daily office commute with fixed pickup at Vishwavidyalaya Metro.",
      status: "Open",
    },
    {
      id: 2,
      position: "Kamla Nagar to Noida Sector 62",
      company: "Driver: Arjun Das",
      location: "Starts 9:00 AM",
      duration: "INR 220",
      skills: ["SUV", "2 Seats Left", "Tue-Thu"],
      description: "Comfortable morning ride with music and verified rider profile.",
      status: "Open",
    },
  ] satisfies InternshipCardProps[];

  const ride = rides.find((item) => item.id === Number(params.id));

  if (!ride) {
    return <p className="text-center mt-20 text-red-500 text-xl font-medium">Ride not found</p>;
  }

  return (
    <InternshipDetailPage
      internshipState={ride}
      detailsTitle="Ride Details"
      skillsTitle="Ride Info"
      actionLabel="Contact Driver"
      actionLink={`/student/messages?user=${encodeURIComponent(ride.company)}`}
    />
  );
}
