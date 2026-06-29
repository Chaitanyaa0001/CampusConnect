"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import InternshipCardProps, {  } from "@/types/InternshipCardProps";

interface CardProps extends InternshipCardProps {
  onApply?: () => void;
}

const Card: React.FC<CardProps> = ({
  position,
  company,
  location,
  duration,
  skills,
  description,
  imageUrl,
  status,
  showApplyButton = true,
  clickable = false,
  linkTo,
  actionLabel = "",
  secondaryActionLabel,
  secondaryLinkTo,
  onApply,
}) => {
  const CardContent = (
<div className="p-6 flex flex-col gap-4group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#0A0F1C] shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">      {imageUrl && (
        <div className="relative w-full h-56 bg-gray-100 dark:bg-[#111827] rounded-xl overflow-hidden flex items-center justify-center">
  <Image
    src={imageUrl}
    alt={position}
    fill
    className="object-contain p-2"
  />
</div>
      )}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{position}</h3>
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">

    <div className="flex items-center gap-2">
        👤
        <span>{company}</span>
    </div>

    <div className="flex items-center gap-2">
        📍
        <span>{location}</span>
    </div>

    <div className="flex items-center gap-2">
        📅
        <span>{duration}</span>
    </div>

</div>
      <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 line-clamp-3">
    {description}
</p>
      <div className="flex flex-wrap gap-2 mt-5">
        {skills.map((skill, i) => (
          <span
            key={i}
className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-300 text-xs font-medium border border-blue-500/20"          >
            {skill}
          </span>
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        {status && (
          <div
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              status === "Applied"
                ? "bg-yellow-100 text-yellow-700"
                : status === "Accepted"
                ? "bg-green-100 text-green-700"
                : status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {status}
          </div>
        )}

        <div className="flex items-center gap-2 ml-auto">
          {showApplyButton && onApply && (
            <button
              onClick={onApply}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              {actionLabel}
            </button>
          )}

          {/* {showApplyButton && !onApply && linkTo && (
            <Link
              href={linkTo}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              {actionLabel}
            </Link>
          )} */}

          {secondaryActionLabel && secondaryLinkTo && (
            <Link
              href={secondaryLinkTo}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
            >
              {secondaryActionLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return clickable && linkTo ? <Link href={linkTo}>{CardContent}</Link> : CardContent;
};

export default Card;
