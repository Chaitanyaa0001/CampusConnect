"use client";

import { useState } from "react";
import AppNavbar from "@/shared/components/navigation/AppNavbar";
import Card from "@/features/student/car-rental/components/InternshipCard";
import InternshipCardProps from "@/types/InternshipCardProps";
import LostAndFoundForm from "@/features/student/lost-found/components/lostandfoundform";
import { Search } from "lucide-react";

export default function LostAndFound() {
  const [items, setItems] = useState<InternshipCardProps[]>([
    {
      id: 1,
      imageUrl: "/I3.jpg",
      position: "Blue Water Bottle",
      company: "Owner: Mehul Arora",
      location: "Library Block B",
      duration: "Date: 2026-06-26",
      skills: ["Lost", "Blue", "Steel Bottle"],
      description: "Lost near reading section on second floor, has a sticker of a mountain.",
      status: "Lost",
    },
    {
      id: 2,
      imageUrl: "/I4.jpg",
      position: "Wireless Earbuds Case",
      company: "Owner: Sana Khan",
      location: "Cafeteria Counter",
      duration: "Date: 2026-06-27",
      skills: ["Found", "Black", "Charging Case"],
      description: "Found near juice counter at 1 PM. Contact with proof to claim.",
      status: "Found",
    },
  ]);

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filtered = items.filter((item) => {
    const textMatch =
      item.position.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter ? item.status === typeFilter : true;
    return textMatch && typeMatch;
  });

  const handleAddItem = (newItem: Omit<InternshipCardProps, 'id'>) => {
    setItems((prev) => [
      {
        id: prev.length + 1,
        ...newItem,
      },
      ...prev,
    ]);
    setShowForm(false);
  };

  return (
    <main className="min-h-screen flex flex-col dark:bg-[#314DA2] dark:bg-gradient-to-b from-[#0A0F1C] via-[#101828] to-[#1A2234]">
      <AppNavbar />
      <div className="p-6 mt-24 lg:ml-64 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Lost & Found</h1>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-700 px-4 py-2 rounded-[7px] text-white font-semibold hover:bg-blue-800 transition-colors"
          >
            {showForm ? "Close" : "Post Item"}
          </button>
        </div>

        <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative w-full lg:w-2/3 group">

  <Search
    size={20}
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-gray-400
      group-focus-within:text-blue-500
      transition-colors
    "
  />

  <input
    type="text"
    placeholder="Search by item name, owner, location..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      w-full
      h-12
      pl-12
      pr-4
      rounded-xl
      border
      border-gray-300
      dark:border-gray-700
      bg-white
      dark:bg-[#101828]
      dark:text-white
      placeholder:text-gray-400
      outline-none
      transition-all
      duration-300
      focus:border-blue-500
      focus:ring-2
      focus:ring-blue-500/30
    "
  />

</div>
            <select
              aria-label="item type"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full lg:w-1/3 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="Lost">Lost</option>
              <option value="Found">Found</option>
            </select>
          </div>
        </div>

        {showForm && (
          <LostAndFoundForm 
            onSubmit={handleAddItem}
            onCancel={() => setShowForm(false)}
          />
        )}

        <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Card
              key={item.id}
              {...item}
              showApplyButton
              linkTo={`/student/dashboard/${item.id}`}
              secondaryActionLabel="Contact Owner"
              secondaryLinkTo={`/student/messages?user=${encodeURIComponent(item.company)}`}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-400 text-center py-8">No items found.</p>
        )}
      </div>
    </main>
  );
}