"use client";
import { useState } from "react";
import Card from "@/features/student/car-rental/components/InternshipCard";
import InternshipCardProps from "@/types/InternshipCardProps";

export default function ResumeUpload() {
  const initialRides: InternshipCardProps[] = [
    {
      id: 1,
      position: "North Campus to Gurgaon Cyber City",
      company: "Driver: Priya Nair",
      location: "Starts 8:30 AM",
      duration: "INR 180",
      skills: ["Sedan", "3 Seats Left", "Mon-Fri"],
      description: "Daily office commute with fixed pickup at Vishwavidyalaya Metro.",
      status: "Open",
    },
    {
      id: 2,
      position: "Kamla Nagar to Noida Sector 62",
      company: "Driver: Arjun Das",
      location: "Starts 9:00 AM",
      duration: "INR 220",
      skills: ["SUV", "2 Seats Left", "Tue-Thu"],
      description: "Comfortable morning ride with music and verified rider profile.",
      status: "Open",
    },
  ];

  const [rides, setRides] = useState(initialRides);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    vehicle: "",
    seats: "",
    fare: "",
    description: "",
    driver: "",
  });

  const filtered = rides.filter((ride) =>
    [ride.position, ride.company, ride.location, ride.description]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const postRide = () => {
    if (!draft.from || !draft.to || !draft.driver) return;

    setRides((prev) => [
      {
        id: prev.length + 1,
        position: `${draft.from} to ${draft.to}`,
        company: `Driver: ${draft.driver}`,
        location: `${draft.date} ${draft.time}`,
        duration: `INR ${draft.fare}`,
        skills: [draft.vehicle || "Vehicle NA", `${draft.seats || "0"} Seats`, "New Ride"],
        description: draft.description,
        status: "Open",
      },
      ...prev,
    ]);

    setDraft({
      from: "",
      to: "",
      date: "",
      time: "",
      vehicle: "",
      seats: "",
      fare: "",
      description: "",
      driver: "",
    });
    setShowForm(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="w-full">
        <div className="flex justify-between items-center mt-22 sm:mt-25 lg:mt-1 mb-4">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-600">Carpool</h1>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-700 px-4 py-2 rounded-[7px] text-white font-semibold hover:bg-blue-800"
          >
            {showForm ? "Close" : "Post Ride"}
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Find campus rides, post your route, and connect with verified student drivers.
        </p>

        <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-6">
          <input
            type="text"
            placeholder="Search rides by route, driver, date, or vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
        </div>

        {showForm && (
          <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 mb-6 grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <input type="text" placeholder="From" value={draft.from} onChange={(e) => setDraft((prev) => ({ ...prev, from: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="To" value={draft.to} onChange={(e) => setDraft((prev) => ({ ...prev, to: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="date" value={draft.date} onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="time" value={draft.time} onChange={(e) => setDraft((prev) => ({ ...prev, time: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Vehicle" value={draft.vehicle} onChange={(e) => setDraft((prev) => ({ ...prev, vehicle: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="number" placeholder="Seats" value={draft.seats} onChange={(e) => setDraft((prev) => ({ ...prev, seats: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Fare" value={draft.fare} onChange={(e) => setDraft((prev) => ({ ...prev, fare: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Driver Name" value={draft.driver} onChange={(e) => setDraft((prev) => ({ ...prev, driver: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <textarea placeholder="Description" value={draft.description} onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))} rows={3} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <button type="button" onClick={postRide} className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700">Post Ride</button>
          </div>
        )}

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((ride) => (
            <Card
              key={ride.id}
              {...ride}
              showApplyButton
              actionLabel="View Ride"
              linkTo={`/student/uploadresume/${ride.id}`}
              secondaryActionLabel="Contact Driver"
              secondaryLinkTo={`/student/messages?user=${encodeURIComponent(ride.company)}`}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-gray-600 dark:text-gray-300 mt-3">No rides found.</p>
        )}
      </div>
    </main>
  );
}
