"use client";

import AppNavbar from "@/shared/components/navigation/AppNavbar";
import Card from "@/features/student/internships/components/InternshipCard";
import InternshipCardProps from "@/types/InternshipCardProps";
import { useState } from "react";

export default function RecommendationRoute() {
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState<InternshipCardProps[]>([
    {
      id: 1,
      position: "Smart Campus Navigation App",
      company: "Owner: Nishant Rao",
      location: "Status: Building MVP",
      duration: "Team Size: 5",
      skills: ["React Native", "Maps API", "UI/UX", "2 Members Needed"],
      description: "Cross-platform app to navigate classrooms, labs, and events with indoor routing.",
      status: "Open",
    },
    {
      id: 2,
      position: "AI Notes Summarizer",
      company: "Owner: Kavya Iyer",
      location: "Status: Idea Validation",
      duration: "Team Size: 4",
      skills: ["Next.js", "NLP", "Python", "1 Member Needed"],
      description: "Tool for converting lecture notes into concise summaries and quiz cards.",
      status: "Open",
    },
  ]);

  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    stack: "",
    skills: "",
    teamSize: "",
    membersNeeded: "",
    expectedDuration: "",
    owner: "",
  });

  const filtered = projects.filter((project) =>
    [project.position, project.description, project.company, project.skills.join(" ")]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const postProject = () => {
    if (!draft.title.trim() || !draft.owner.trim()) return;

    setProjects((prev) => [
      {
        id: prev.length + 1,
        position: draft.title,
        company: `Owner: ${draft.owner}`,
        location: "Status: Open",
        duration: `Team Size: ${draft.teamSize || "NA"}`,
        skills: [draft.stack, draft.skills, `${draft.membersNeeded} Members Needed`],
        description: `${draft.description} Duration: ${draft.expectedDuration}`,
        status: "Open",
      },
      ...prev,
    ]);

    setDraft({
      title: "",
      description: "",
      stack: "",
      skills: "",
      teamSize: "",
      membersNeeded: "",
      expectedDuration: "",
      owner: "",
    });
    setShowForm(false);
  };

  return (
    <div className="min-h-screen dark:bg-[#314DA2] dark:bg-gradient-to-b from-[#0A0F1C] via-[#101828] to-[#1A2234]">
      <AppNavbar />
      <div className="mt-24 lg:ml-64 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold dark:text-white">Project Collaboration</h1>
          <button
            type="button"
            onClick={() => setShowForm((prev) => !prev)}
            className="bg-blue-700 px-4 py-2 rounded-[7px] text-white font-semibold hover:bg-blue-800"
          >
            {showForm ? "Close" : "Post Project"}
          </button>
        </div>

        <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4">
          <input
            type="text"
            placeholder="Search project title, stack, required skills, or owner..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none"
          />
        </div>

        {showForm && (
          <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-4 grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <input type="text" placeholder="Project Title" value={draft.title} onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Owner" value={draft.owner} onChange={(e) => setDraft((prev) => ({ ...prev, owner: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Tech Stack" value={draft.stack} onChange={(e) => setDraft((prev) => ({ ...prev, stack: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Skills Required" value={draft.skills} onChange={(e) => setDraft((prev) => ({ ...prev, skills: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="number" placeholder="Team Size" value={draft.teamSize} onChange={(e) => setDraft((prev) => ({ ...prev, teamSize: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="number" placeholder="Members Needed" value={draft.membersNeeded} onChange={(e) => setDraft((prev) => ({ ...prev, membersNeeded: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <input type="text" placeholder="Expected Duration" value={draft.expectedDuration} onChange={(e) => setDraft((prev) => ({ ...prev, expectedDuration: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <textarea placeholder="Description" rows={3} value={draft.description} onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))} className="px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none" />
            <button type="button" onClick={postProject} className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700">Post Project</button>
          </div>
        )}

        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((project) => (
            <Card
              key={project.id}
              {...project}
              showApplyButton
              actionLabel="Request to Join"
              linkTo={`/student/recommendation/${project.id}`}
              secondaryActionLabel="Contact Owner"
              secondaryLinkTo={`/student/messages?user=${encodeURIComponent(project.company)}`}
            />
          ))}
        </div>

        {filtered.length === 0 && <p className="text-gray-400">No projects found.</p>}
      </div>
    </div>
  );
}
