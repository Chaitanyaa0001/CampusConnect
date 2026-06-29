"use client";
import { useState } from "react";
import InternshipCardProps from "@/types/InternshipCardProps";
import Card from "@/features/student/internships/components/InternshipCard";

interface Props {
  internships: InternshipCardProps[];
}

export default function BrowseInternshipsClient({ internships }: Props) {
  const [listings, setListings] = useState(internships);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [duration, setDuration] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    vehicleName: "",
    vehicleType: "Sedan",
    rentPerDay: "",
    pickupLocation: "",
    availableDates: "",
    description: "",
    ownerName: "",
    photo: "/I3.jpg",
  });

  const filtered = listings.filter((internship) => {
    return (
      internship.position.toLowerCase().includes(search.toLowerCase()) &&
      (location ? internship.location === location : true) &&
      (position ? internship.position === position : true) &&
      (duration ? internship.duration === duration : true)
    );
  });

  const uniqueLocations = [...new Set(listings.map((i) => i.location))];
  const uniquePositions = [...new Set(listings.map((i) => i.position))];
  const uniqueDurations = [...new Set(listings.map((i) => i.duration))];

  const createListing = () => {
    if (!draft.vehicleName.trim() || !draft.ownerName.trim()) return;

    setListings((prev) => [
      {
        id: prev.length + 1,
        imageUrl: draft.photo,
        position: draft.vehicleName,
        company: `Owner: ${draft.ownerName}`,
        location: `Pickup: ${draft.pickupLocation}`,
        duration: `INR ${draft.rentPerDay}/day`,
        skills: [draft.vehicleType, draft.availableDates, "Available"],
        description: draft.description,
        status: "Available",
      },
      ...prev,
    ]);
    setDraft({
      vehicleName: "",
      vehicleType: "Sedan",
      rentPerDay: "",
      pickupLocation: "",
      availableDates: "",
      description: "",
      ownerName: "",
      photo: "/I3.jpg",
    });
    setShowForm(false);
  };

  return (
    <div className="mt-24 lg:ml-64 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Car Rental</h1>
        <button
          type="button"
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-700 px-4 py-2 rounded-[7px] text-white font-semibold hover:bg-blue-800"
        >
          {showForm ? "Close" : "Post Rental"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-6 grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Vehicle Name"
            value={draft.vehicleName}
            onChange={(e) => setDraft((prev) => ({ ...prev, vehicleName: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Owner Name"
            value={draft.ownerName}
            onChange={(e) => setDraft((prev) => ({ ...prev, ownerName: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <select
            aria-label="vehicle type"
            value={draft.vehicleType}
            onChange={(e) => setDraft((prev) => ({ ...prev, vehicleType: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          >
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="SUV">SUV</option>
            <option value="Bike">Bike</option>
          </select>
          <input
            type="text"
            placeholder="Rent Per Day"
            value={draft.rentPerDay}
            onChange={(e) => setDraft((prev) => ({ ...prev, rentPerDay: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Pickup Location"
            value={draft.pickupLocation}
            onChange={(e) => setDraft((prev) => ({ ...prev, pickupLocation: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Available Dates"
            value={draft.availableDates}
            onChange={(e) => setDraft((prev) => ({ ...prev, availableDates: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <input
            type="text"
            placeholder="Vehicle Photo URL (optional)"
            value={draft.photo}
            onChange={(e) => setDraft((prev) => ({ ...prev, photo: e.target.value }))}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <textarea
            placeholder="Description"
            value={draft.description}
            onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
          <button
            type="button"
            onClick={createListing}
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700"
          >
            Create Listing
          </button>
        </div>
      )}

      {/* Filters Section */}
      <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search vehicle or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full lg:w-1/3 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />

          {/* Location Filter */}
          <select
          aria-label="state"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full lg:w-1/4 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          >
            <option value="">All Pickup Locations</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          {/* Position Filter */}
          <select
          aria-label="state"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full lg:w-1/4 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          >
            <option value="">All Vehicle Names</option>
            {uniquePositions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>

          {/* Duration Filter */}
          <select
          aria-label="state "
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full lg:w-1/4 px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          >
            <option value="">All Rent Slabs</option>
            {uniqueDurations.map((dur) => (
              <option key={dur} value={dur}>
                {dur}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards Section */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.length > 0 ? (
          filtered.map((i) => (
            <Card
              key={i.id}
              {...i}
              showApplyButton
              actionLabel="View Details"
              linkTo={`/student/internships/${i.id}`}
              secondaryActionLabel="Contact Owner"
              secondaryLinkTo={`/student/messages?user=${encodeURIComponent(i.company)}`}
            />
          ))
        ) : (
          <p className="text-gray-600 dark:text-gray-300 col-span-2">
            No vehicles found.
          </p>
        )}
      </div>
    </div>
  );
}
