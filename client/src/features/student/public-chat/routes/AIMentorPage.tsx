import AppNavbar from "@/shared/components/navigation/AppNavbar";
import AIMentorClient from "@/features/student/public-chat/components/AIMentorClient";

export default function AIMentorPage() {
  return (
    <div className="min-h-screen dark:bg-[rgb(10,15,28)]">
      <AppNavbar />
      <AIMentorClient />
    </div>
  );
}
