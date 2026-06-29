import InternshipDetailPage from "@/features/student/car-rental/components/InternshipDetailPage";
import InternshipCardProps from "@/types/InternshipCardProps";

interface PageProps {
    params: {id:string}
}

export default async function InternshipPage({params}:PageProps) {
    const {id}  = await params;

     const mockData = [
        {
      id: 1,
      imageUrl: "/I1.jpg",
      position: "Hyundai i20 Sportz",
      company: "Owner: Ananya Kapoor",
      location: "Pickup: North Campus Gate 2",
      duration: "INR 1800/day",
      skills: ["Hatchback", "Petrol", "Available Today"],
      description: "Well-maintained hatchback with AC and music system, ideal for city rides.",
      status: "Available"

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
      status: "Available"
    },
      ] satisfies InternshipCardProps[];
    
      const internship = mockData.find(i => i.id === Number(id));
    
      if (!internship) {
        return <p className="text-center mt-20 text-red-500 text-xl font-medium">Internship not found</p>;
      }

    return (
      <InternshipDetailPage
        internshipState={internship}
        detailsTitle="Vehicle Details"
        skillsTitle="Vehicle Info"
        actionLabel="Contact Owner"
        actionLink={`/student/messages?user=${encodeURIComponent(internship.company)}`}
      />
    )
}