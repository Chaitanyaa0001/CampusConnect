"use client";

import { useState, useRef } from "react";
import { UploadCloud, ImageIcon, X } from "lucide-react";
import InternshipCardProps from "@/types/InternshipCardProps";

interface LostAndFoundFormProps {
  onSubmit: (item: Omit<InternshipCardProps, 'id'>) => void;
  onCancel: () => void;
}

export default function LostAndFoundForm({ onSubmit, onCancel }: LostAndFoundFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [draft, setDraft] = useState({
    image: null as File | null,
    imagePreview: "",
    itemName: "",
    itemType: "Lost" as "Lost" | "Found",
    date: "",
    location: "",
    description: "",
    owner: "",
  });

  const handleImageChange = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDraft((prev) => ({
          ...prev,
          image: file,
          imagePreview: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setDraft((prev) => ({ ...prev, image: null, imagePreview: "" }));
    }
  };

  const handleSubmit = () => {
    if (!draft.itemName.trim() || !draft.owner.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    onSubmit({
      imageUrl: draft.imagePreview || "/placeholder.png",
      position: draft.itemName,
      company: `Owner: ${draft.owner}`,
      location: draft.location || "Not specified",
      duration: `Date: ${draft.date || "Not specified"}`,
      skills: [draft.itemType],
      description: draft.description || "No description provided",
      status: draft.itemType,
    });

    // Reset form
    setDraft({
      image: null,
      imagePreview: "",
      itemName: "",
      itemType: "Lost",
      date: "",
      location: "",
      description: "",
      owner: "",
    });
  };

  return (
    <div className="bg-white dark:bg-[#1A2234] rounded-lg shadow-md p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Column - Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-semibold dark:text-white">
            Upload Item Image
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleImageChange(file);
            }}
            className="
              border-2
              border-dashed
              border-blue-500
              rounded-2xl
              p-8
              flex
              flex-col
              items-center
              justify-center
              text-center
              cursor-pointer
              hover:border-blue-400
              hover:bg-blue-500/5
              transition-all
              duration-300
              min-h-[200px]
            "
          >
            <UploadCloud
              size={55}
              className="text-blue-500 mb-4"
            />

            <h3 className="text-lg font-semibold dark:text-white">
              Drag & Drop Image
            </h3>

            <p className="text-gray-400 mt-2">
              or click to browse
            </p>

            <p className="text-xs text-gray-500 mt-2">
              JPG • PNG • JPEG
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageChange(file);
              }}
            />
          </div>

          {draft.image && (
            <div className="flex items-center justify-between rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <ImageIcon className="text-green-500" />
                <div>
                  <p className="font-medium dark:text-white truncate max-w-[200px]">
                    {draft.image.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {(draft.image.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => handleImageChange(null)}
                className="hover:bg-red-500/10 rounded-full p-1 transition-colors"
              >
                <X className="text-red-500 hover:text-red-600" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Form Fields */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-sm font-medium dark:text-white">Item Name *</label>
              <input
                type="text"
                placeholder="Enter item name"
                value={draft.itemName}
                onChange={(e) => setDraft((prev) => ({ ...prev, itemName: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium dark:text-white">Type *</label>
              <select
                aria-label="lost or found"
                value={draft.itemType}
                onChange={(e) => setDraft((prev) => ({ ...prev, itemType: e.target.value as "Lost" | "Found" }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium dark:text-white">Date</label>
              <input
                type="date"
                value={draft.date}
                onChange={(e) => setDraft((prev) => ({ ...prev, date: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium dark:text-white">Location</label>
              <input
                type="text"
                placeholder="Where was it found/lost?"
                value={draft.location}
                onChange={(e) => setDraft((prev) => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium dark:text-white">Owner Name *</label>
              <input
                type="text"
                placeholder="Your name"
                value={draft.owner}
                onChange={(e) => setDraft((prev) => ({ ...prev, owner: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm font-medium dark:text-white">Description</label>
              <textarea
                placeholder="Describe the item (color, brand, distinguishing features...)"
                rows={3}
                value={draft.description}
                onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-2 border rounded-lg dark:bg-[#101828] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t dark:border-gray-700">
        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 transition-colors font-semibold"
        >
          Publish Item
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-600 text-white rounded-lg px-4 py-2 hover:bg-gray-700 transition-colors font-semibold"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}