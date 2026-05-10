export interface NavItem {
  label: string;
  href: string;
  icon: string;
}

export const sidebarNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: "🏠",
  },
  {
    label: "Chat",
    href: "/chat",
    icon: "💬",
  },
  {
    label: "Carpool",
    href: "/carpool",
    icon: "🚗",
  },
  {
    label: "Car Rental",
    href: "/car-rental",
    icon: "🔑",
  },
  {
    label: "Lost & Found",
    href: "/lost-n-found",
    icon: "🔍",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "👥",
  },
];
