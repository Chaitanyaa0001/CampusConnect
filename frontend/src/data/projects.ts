export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredMembers: number;
  currentMembers: number;
  leader: string;
  tags: string[];
  deadline?: string;
}

export const projectsData: Project[] = [
  {
    id: "1",
    title: "Campus Event Management App",
    description:
      "Building a mobile app to manage campus events, registrations, and notifications",
    category: "Mobile Development",
    requiredMembers: 4,
    currentMembers: 2,
    leader: "Alice Wong",
    tags: ["React Native", "Firebase", "UI/UX"],
    deadline: "2025-07-15",
  },
  {
    id: "2",
    title: "AI-Powered Study Assistant",
    description:
      "Create an AI chatbot to help students with subject queries and exam preparation",
    category: "AI/ML",
    requiredMembers: 3,
    currentMembers: 1,
    leader: "Vikram Singh",
    tags: ["Python", "NLP", "Machine Learning"],
    deadline: "2025-08-30",
  },
  {
    id: "3",
    title: "Campus Marketplace Platform",
    description:
      "E-commerce platform for buying and selling used items among students",
    category: "Web Development",
    requiredMembers: 5,
    currentMembers: 3,
    leader: "Priya Sharma",
    tags: ["MERN", "Payment Gateway", "Database Design"],
    deadline: "2025-06-20",
  },
  {
    id: "4",
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard to visualize campus statistics and student analytics",
    category: "Data Science",
    requiredMembers: 3,
    currentMembers: 2,
    leader: "Arun Kumar",
    tags: ["D3.js", "React", "Data Analysis"],
    deadline: "2025-07-10",
  },
  {
    id: "5",
    title: "IoT Room Temperature Monitor",
    description:
      "Smart system to monitor and control room temperatures across campus",
    category: "IoT/Embedded",
    requiredMembers: 4,
    currentMembers: 1,
    leader: "Chen Liu",
    tags: ["Arduino", "IoT", "Hardware"],
    deadline: "2025-09-05",
  },
  {
    id: "6",
    title: "Campus Security Alert System",
    description: "Real-time alert system for campus security and emergency reporting",
    category: "Web Development",
    requiredMembers: 3,
    currentMembers: 2,
    leader: "Jessica Miller",
    tags: ["WebSocket", "Location Services", "Notification System"],
    deadline: "2025-08-15",
  },
];
