"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Discussion = {
  id: number;
  title: string;
  description: string;
  author: string;
  category: string;
  replies: number;
  timestamp: string;
  lastActivity: string;
};

const discussionsSeed: Discussion[] = [
  {
    id: 1,
    title: "Best laptop-friendly cafes near North Campus?",
    description: "Looking for quiet places with charging sockets and stable Wi-Fi for project work.",
    author: "Aarav Mehta",
    category: "Campus Life",
    replies: 12,
    timestamp: "2h ago",
    lastActivity: "15m ago",
  },
  {
    id: 2,
    title: "Need teammates for Smart Attendance System",
    description: "Building a face-recognition attendance app. Need frontend + ML contributors.",
    author: "Riya Sharma",
    category: "Projects",
    replies: 8,
    timestamp: "5h ago",
    lastActivity: "1h ago",
  },
  {
    id: 3,
    title: "How to prepare for technical club interviews?",
    description: "Can seniors share prep strategy and common questions asked by coding clubs?",
    author: "Kabir Jain",
    category: "Academics",
    replies: 16,
    timestamp: "1d ago",
    lastActivity: "3h ago",
  },
];

export default function AIMentorClient() {
  const [discussions, setDiscussions] = useState<Discussion[]>(discussionsSeed);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [showComposer, setShowComposer] = useState(false);
  const [draft, setDraft] = useState({ title: "", description: "", category: "General" });

  const categories = useMemo(
    () => [...new Set(discussionsSeed.map((discussion) => discussion.category))],
    []
  );

  const filtered = discussions.filter((discussion) => {
    const textMatch =
      discussion.title.toLowerCase().includes(search.toLowerCase()) ||
      discussion.description.toLowerCase().includes(search.toLowerCase()) ||
      discussion.author.toLowerCase().includes(search.toLowerCase());
    const categoryMatch = category ? discussion.category === category : true;
    return textMatch && categoryMatch;
  });

  const postDiscussion = () => {
    if (!draft.title.trim() || !draft.description.trim()) return;

    setDiscussions((prev) => [
      {
        id: prev.length + 1,
        title: draft.title,
        description: draft.description,
        author: "You",
        category: draft.category,
        replies: 0,
        timestamp: "Just now",
        lastActivity: "Just now",
      },
      ...prev,
    ]);
    setDraft({ title: "", description: "", category: "General" });
    setShowComposer(false);
  };

  return (
    <section className="w-full lg:ml-64 mt-24 p-6">
      <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <input
            type="text"
            placeholder="Search discussions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-2/3 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <select
            aria-label="discussion category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold dark:text-white">Public Chat</h1>
        <button
          type="button"
          onClick={() => setShowComposer((prev) => !prev)}
          className="bg-blue-700 px-4 py-2 rounded-[7px] text-white font-semibold hover:bg-blue-800"
        >
          {showComposer ? "Close" : "Post Discussion"}
        </button>
      </div>

      {showComposer && (
        <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-6 space-y-3">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Discussion title"
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <textarea
            value={draft.description}
            onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Write your discussion..."
            rows={4}
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <div className="flex gap-3">
            <select
              aria-label="new discussion category"
              value={draft.category}
              onChange={(e) => setDraft((prev) => ({ ...prev, category: e.target.value }))}
              className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
            >
              <option value="General">General</option>
              <option value="Academics">Academics</option>
              <option value="Projects">Projects</option>
              <option value="Campus Life">Campus Life</option>
            </select>
            <button
              type="button"
              onClick={postDiscussion}
              className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Publish
            </button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((discussion) => (
          <Link
            key={discussion.id}
            href={`/student/aimentor/${discussion.id}`}
            className="p-5 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-[#0A0F1C] shadow hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-blue-600">{discussion.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {discussion.author} • {discussion.category}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 line-clamp-2">
              {discussion.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                {discussion.replies} replies
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {discussion.timestamp} • Last active {discussion.lastActivity}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
