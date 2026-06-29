"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import AppNavbar from "@/shared/components/navigation/AppNavbar";

type Conversation = {
  id: number;
  name: string;
  online: boolean;
  lastMessage: string;
  updatedAt: string;
};

type Message = {
  id: number;
  from: "me" | "them";
  text: string;
  time: string;
};

const inbox: Conversation[] = [
  { id: 1, name: "Owner: Ananya Kapoor", online: true, lastMessage: "Sure, car is available tomorrow.", updatedAt: "2m" },
  { id: 2, name: "Driver: Priya Nair", online: false, lastMessage: "Pickup point is near metro gate.", updatedAt: "15m" },
  { id: 3, name: "Owner: Nishant Rao", online: true, lastMessage: "Can we discuss project roles?", updatedAt: "1h" },
];

const seededMessages: Record<string, Message[]> = {
  "Owner: Ananya Kapoor": [
    { id: 1, from: "them", text: "Hi, the car is available this weekend.", time: "10:01" },
    { id: 2, from: "me", text: "Great, can I book for Saturday morning?", time: "10:02" },
  ],
  "Driver: Priya Nair": [
    { id: 3, from: "them", text: "Ride starts at 8:30 AM, is that okay?", time: "09:30" },
  ],
  "Owner: Nishant Rao": [
    { id: 4, from: "them", text: "We need one more frontend developer.", time: "12:10" },
  ],
};

export default function MessagesPage() {
  const query = useSearchParams();
  const user = query.get("user") || inbox[0].name;
  const [active, setActive] = useState(user);
  const [messages, setMessages] = useState<Message[]>(seededMessages[user] || []);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMessages(seededMessages[active] || []);
  }, [active]);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const activeConversation = useMemo(
    () => inbox.find((item) => item.name === active) || { id: 999, name: active, online: true, lastMessage: "", updatedAt: "now" },
    [active]
  );

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: prev.length + 1000, from: "me", text: input, time: "Now" }]);
    setInput("");
  };

  return (
    <main className="min-h-screen dark:bg-[#0A0F1C]">
      <AppNavbar />
      <section className="mt-24 lg:ml-64 p-6">
        <div className="bg-white dark:bg-[#1A2234] rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden h-[75vh] grid grid-cols-1 lg:grid-cols-3">
          <aside className="border-r dark:border-gray-700 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold dark:text-white mb-3">Direct Messages</h2>
            <div className="space-y-2">
              {inbox.map((conversation) => (
                <button
                  key={conversation.id}
                  type="button"
                  onClick={() => setActive(conversation.name)}
                  className={`w-full text-left p-3 rounded-lg transition ${
                    active === conversation.name
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-50 dark:bg-[#0A0F1C] dark:text-gray-200"
                  }`}
                >
                  <p className="font-semibold">{conversation.name}</p>
                  <p className="text-xs opacity-75 truncate">{conversation.lastMessage}</p>
                </button>
              ))}
            </div>
          </aside>

          <div className="lg:col-span-2 flex flex-col">
            <header className="border-b dark:border-gray-700 p-4 flex items-center gap-3">
              <div className="relative">
                <Image src="/profile.jpg" alt="avatar" width={40} height={40} className="rounded-full" />
                <span className={`absolute -bottom-0 -right-0 h-3 w-3 rounded-full border border-white ${activeConversation.online ? "bg-green-500" : "bg-gray-400"}`} />
              </div>
              <div>
                <p className="font-semibold dark:text-white">{activeConversation.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{activeConversation.online ? "Online" : "Offline"}</p>
              </div>
            </header>

            <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}>
                  <div className={`${message.from === "me" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-[#0A0F1C] dark:text-gray-200"} rounded-xl px-4 py-2 max-w-[70%]`}>
                    <p className="text-sm">{message.text}</p>
                    <p className="text-[11px] opacity-70 mt-1">{message.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t dark:border-gray-700 p-4 flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
              />
              <button type="button" onClick={sendMessage} className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">Send</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
