import InternshipDetailPage from "@/features/student/internships/components/InternshipDetailPage";
import InternshipCardProps from "@/types/InternshipCardProps";

interface PageProps {
  params: { id: string };
}

export default function RecommendationInternshipPage({ params }: PageProps) {
  const { id } = params;

  const mockData = [
    {
      id: 1,
      position: "Smart Campus Navigation App",
      company: "Owner: Nishant Rao",
      location: "Status: Building MVP",
      duration: "Team Size: 5",
      skills: ["React Native", "Maps API", "UI/UX", "2 Members Needed"],
      description: "Cross-platform app to navigate classrooms, labs, and events with indoor routing.",
      status: "Open",
    },
    {
      id: 2,
      position: "AI Notes Summarizer",
      company: "Owner: Kavya Iyer",
      location: "Status: Idea Validation",
      duration: "Team Size: 4",
      skills: ["Next.js", "NLP", "Python", "1 Member Needed"],
      description: "Tool for converting lecture notes into concise summaries and quiz cards.",
      status: "Open",
    },
  ] satisfies InternshipCardProps[];

  const internship = mockData.find(i => i.id === Number(id));

  if (!internship) {
    return <p className="text-center mt-20 text-red-500 text-xl font-medium">Internship not found</p>;
  }

  return (
    <InternshipDetailPage
      internshipState={internship}
      detailsTitle="Project Overview"
      skillsTitle="Tech Stack & Required Skills"
      actionLabel="Contact Owner"
      actionLink={`/student/messages?user=${encodeURIComponent(internship.company)}`}
    />
  );
}
