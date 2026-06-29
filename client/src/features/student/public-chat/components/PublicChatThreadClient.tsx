"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Reply = {
  id: number;
  author: string;
  message: string;
  timestamp: string;
};

type ThreadProps = {
  title: string;
  description: string;
  author: string;
  category: string;
  createdAt: string;
  replies: Reply[];
};

export default function PublicChatThreadClient({
  title,
  description,
  author,
  category,
  createdAt,
  replies,
}: ThreadProps) {
  const [messages, setMessages] = useState<Reply[]>(replies);
  const [input, setInput] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const sendReply = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 100,
        author: "You",
        message: input,
        timestamp: "Just now",
      },
    ]);
    setInput("");
  };

  return (
    <div className="mt-24 lg:ml-64 p-6">
      <div className="bg-white dark:bg-[#1A2234] rounded-xl shadow-lg p-6 mb-5">
        <h1 className="text-2xl font-bold text-blue-600">{title}</h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
          {author} • {category} • {createdAt}
        </p>
      </div>

      <div className="bg-white dark:bg-[#1A2234] border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden h-[70vh] flex flex-col">
        <div ref={containerRef} className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <Image src="/profile.jpg" alt="avatar" width={36} height={36} className="rounded-full h-9 w-9" />
              <div className="bg-gray-100 dark:bg-[#0A0F1C] rounded-xl px-4 py-3">
                <p className="text-sm font-semibold text-blue-700">{message.author}</p>
                <p className="text-sm text-gray-700 dark:text-gray-300">{message.message}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendReply();
            }}
            placeholder="Write a reply..."
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <button type="button" onClick={sendReply} className="px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
