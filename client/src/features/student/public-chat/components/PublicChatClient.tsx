"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

type Message = {
  id: number;
  author: string;
  message: string;
  timestamp: string;
  isOwn?: boolean;
};

// Sample messages to start with
const initialMessages: Message[] = [
  {
    id: 1,
    author: "Ananya Kapoor",
    message: "Sure, car is available tomorrow.",
    timestamp: "10:01",
  },
  {
    id: 2,
    author: "Priya Nair",
    message: "Pickup point is near metro gate.",
    timestamp: "10:02",
  },
  {
    id: 3,
    author: "You",
    message: "Great, can I book for Saturday morning?",
    timestamp: "10:02",
    isOwn: true,
  },
  {
    id: 4,
    author: "Nishant Rao",
    message: "Can we discuss project roles?",
    timestamp: "10:03",
  },
];

export default function AIMentorClient() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [username] = useState("You");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 100,
        author: username,
        message: input,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      },
    ]);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-[#1A2234] ">
      {/* Main Chat Area */}
      <div className="lg:ml-64 h-full flex flex-col pt-14 lg:pt-16">
        {/* Chat Header */}
        <div className="bg-white dark:bg-[#1A2234] border-b dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-shrink-0 shadow-sm">
          <div>
            <h1 className="text-lg font-semibold dark:text-white">💬 Public Chat</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online • 1 user</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-green-500 font-medium">Active</span>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          ref={containerRef} 
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3 bg-gray-50 dark:bg-[#0A0F1C]"
        >
          {messages.map((message, index) => {
            const showAuthor = index === 0 || messages[index - 1]?.author !== message.author;
            
            return (
              <div key={message.id}>
                {showAuthor && !message.isOwn && (
                  <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-11">
                    {message.author}
                  </p>
                )}
                <div className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}>
                  {!message.isOwn && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-300 font-semibold text-sm">
                        {message.author.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                  <div className={`flex flex-col max-w-[75%] ${message.isOwn ? 'items-end' : 'items-start'}`}>
                    <div className={`rounded-2xl px-4 py-2.5 ${
                      message.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-[#1A2234] dark:text-white shadow-sm border border-gray-100 dark:border-gray-700'
                    }`}>
                      <p className="text-sm leading-relaxed break-words">{message.message}</p>
                    </div>
                    <p className={`text-[10px] text-gray-400 dark:text-gray-500 mt-1 px-1 ${
                      message.isOwn ? 'text-right' : ''
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-[#1A2234] border-t dark:border-gray-700 px-4 sm:px-6 py-4 flex-shrink-0">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-full dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim()}
              className={`px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 transition ${
                input.trim() 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500'
              }`}
            >
              <Send size={16} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}