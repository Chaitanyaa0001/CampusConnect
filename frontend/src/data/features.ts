export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const featuresData: Feature[] = [
  {
    id: "1",
    title: "Carpool",
    description:
      "Share rides with fellow students and save on transportation costs while reducing carbon footprint.",
    icon: "🚗",
  },
  {
    id: "2",
    title: "Car Rental",
    description:
      "Rent vehicles on-demand for campus trips and adventures with flexible terms.",
    icon: "🔑",
  },
  {
    id: "3",
    title: "Chat & Connect",
    description:
      "Real-time messaging to coordinate with riders, renters, and fellow students.",
    icon: "💬",
  },
  {
    id: "4",
    title: "Lost & Found",
    description:
      "Report and locate lost items on campus with our community-driven platform.",
    icon: "🔍",
  },
  {
    id: "5",
    title: "Project Collaboration",
    description:
      "Team up with classmates on projects with integrated communication tools.",
    icon: "👥",
  },
];
