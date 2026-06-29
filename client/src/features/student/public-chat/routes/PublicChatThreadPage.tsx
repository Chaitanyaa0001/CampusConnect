import AppNavbar from "@/shared/components/navigation/AppNavbar";
import PublicChatThreadClient from "@/features/student/public-chat/components/PublicChatThreadClient";

interface PageProps {
  params: { id: string };
}

export default async function PublicChatThreadPage({ params }: PageProps) {
  const { id } = await params;

  const threads = [
    {
      id: 1,
      title: "Best laptop-friendly cafes near North Campus?",
      description: "Looking for quiet places with charging sockets and stable Wi-Fi for project work.",
      author: "Aarav Mehta",
      category: "Campus Life",
      createdAt: "2h ago",
      replies: [
        { id: 1, author: "Riya", message: "Try Brew Loft near Patel Chest.", timestamp: "1h ago" },
        { id: 2, author: "Kabir", message: "CCD GTB Nagar has stable Wi-Fi too.", timestamp: "45m ago" },
      ],
    },
    {
      id: 2,
      title: "Need teammates for Smart Attendance System",
      description: "Building a face-recognition attendance app. Need frontend + ML contributors.",
      author: "Riya Sharma",
      category: "Projects",
      createdAt: "5h ago",
      replies: [
        { id: 3, author: "Aman", message: "I can help with Next.js and APIs.", timestamp: "3h ago" },
      ],
    },
    {
      id: 3,
      title: "How to prepare for technical club interviews?",
      description: "Can seniors share prep strategy and common questions asked by coding clubs?",
      author: "Kabir Jain",
      category: "Academics",
      createdAt: "1d ago",
      replies: [
        { id: 4, author: "Maya", message: "Focus on DSA basics and one project deep dive.", timestamp: "6h ago" },
      ],
    },
  ];

  const thread = threads.find((item) => item.id === Number(id));

  if (!thread) {
    return <p className="text-center mt-20 text-red-500 text-xl font-medium">Discussion not found</p>;
  }

  return (
    <main className="min-h-screen dark:bg-[rgb(10,15,28)]">
      <AppNavbar />
      <PublicChatThreadClient
        title={thread.title}
        description={thread.description}
        author={thread.author}
        category={thread.category}
        createdAt={thread.createdAt}
        replies={thread.replies}
      />
    </main>
  );
}
