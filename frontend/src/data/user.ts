export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
}

export const currentUser: User = {
  id: "user-001",
  name: "Alex Johnson",
  email: "alex.johnson@campus.edu",
  avatar: "https://via.placeholder.com/40x40?text=AJ",
  role: "Student",
  status: "online",
};
