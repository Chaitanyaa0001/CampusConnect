export interface Message {
  id: string;
  sender: string;
  senderAvatar: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  isGroup: boolean;
  messages: Message[];
}

export const chatsData: Chat[] = [
  {
    id: "1",
    name: "John Doe",
    avatar: "https://via.placeholder.com/40x40?text=JD",
    lastMessage: "Sounds good! See you at 9 AM",
    timestamp: "2 mins ago",
    unreadCount: 0,
    isGroup: false,
    messages: [
      {
        id: "m1",
        sender: "John Doe",
        senderAvatar: "https://via.placeholder.com/40x40?text=JD",
        content: "Hi! Are you available for carpool tomorrow?",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: "m2",
        sender: "You",
        senderAvatar: "https://via.placeholder.com/40x40?text=AJ",
        content: "Yes, I'm available. What time?",
        timestamp: "10:32 AM",
        isOwn: true,
      },
      {
        id: "m3",
        sender: "John Doe",
        senderAvatar: "https://via.placeholder.com/40x40?text=JD",
        content: "Sounds good! See you at 9 AM",
        timestamp: "10:35 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "2",
    name: "Project Group",
    avatar: "https://via.placeholder.com/40x40?text=PG",
    lastMessage: "Great! Let's finalize the design",
    timestamp: "1 hour ago",
    unreadCount: 2,
    isGroup: true,
    messages: [
      {
        id: "m4",
        sender: "Sarah",
        senderAvatar: "https://via.placeholder.com/40x40?text=S",
        content: "I completed the backend API",
        timestamp: "11:00 AM",
        isOwn: false,
      },
      {
        id: "m5",
        sender: "You",
        senderAvatar: "https://via.placeholder.com/40x40?text=AJ",
        content: "Excellent! I'll integrate it with the frontend",
        timestamp: "11:05 AM",
        isOwn: true,
      },
      {
        id: "m6",
        sender: "Mike",
        senderAvatar: "https://via.placeholder.com/40x40?text=M",
        content: "Great! Let's finalize the design",
        timestamp: "11:10 AM",
        isOwn: false,
      },
    ],
  },
  {
    id: "3",
    name: "Emily Chen",
    avatar: "https://via.placeholder.com/40x40?text=EC",
    lastMessage: "Thanks for the ride yesterday!",
    timestamp: "Yesterday",
    unreadCount: 0,
    isGroup: false,
    messages: [
      {
        id: "m7",
        sender: "Emily Chen",
        senderAvatar: "https://via.placeholder.com/40x40?text=EC",
        content: "Thanks for the ride yesterday!",
        timestamp: "5:30 PM",
        isOwn: false,
      },
    ],
  },
];
