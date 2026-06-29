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
  actionLabel = "Apply Now",
  secondaryActionLabel,
  secondaryLinkTo,
  onApply,
}) => {
  const CardContent = (
    <div className="p-5 rounded-lg border dark:border-gray-700 bg-gray-50 dark:bg-[#0A0F1C] shadow flex flex-col justify-between hover:shadow-lg transition">
      {imageUrl && (
        <div className="relative w-full h-44 mb-4 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={position} fill className="object-cover" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-blue-600">{position}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {company} • {location} • {duration}
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-5 line-clamp-2">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-5">
        {skills.map((skill, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium"
          >
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

          {showApplyButton && !onApply && linkTo && (
            <Link
              href={linkTo}
              className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700"
            >
              {actionLabel}
            </Link>
          )}

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
