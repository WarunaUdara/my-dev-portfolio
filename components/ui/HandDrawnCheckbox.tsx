"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface HandDrawnCheckboxProps {
  checked: boolean;
  className?: string;
  size?: number;
}

export default function HandDrawnCheckbox({
  checked,
  className,
  size = 24,
}: HandDrawnCheckboxProps) {
  return (
    <div
      className={cn(
        "relative flex-shrink-0 flex items-center justify-center transition-all duration-300 select-none",
        className
      )}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-md"
      >
        {/* ── Hand-Drawn Sketchy Box (Double-pass organic stroke for handwritten feel) ── */}
        <path
          d="M 3,4 C 8,2.8 20,3.2 24.5,3.8 C 26,4 25.8,14 25.5,23.5 C 25.2,25.5 12,25.8 4,25 C 2.5,24.5 2.8,12 3,4 Z"
          stroke={checked ? "#38bdf8" : "#ffffff"}
          strokeWidth={checked ? "2.2" : "2"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={checked ? "rgba(56, 189, 248, 0.15)" : "rgba(255, 255, 255, 0.05)"}
          className="transition-colors duration-300"
        />

        {/* Secondary organic sketch overlap path for authentic hand-drawn look */}
        <path
          d="M 2.2,5.2 C 9,3.5 19,3.8 24.8,4.2 C 25.2,10 24.9,19 24.5,24.2 C 18,24.8 8,24.5 3.5,24 C 2.8,18 2.5,9 2.2,5.2 Z"
          stroke={checked ? "#0284c7" : "rgba(255, 255, 255, 0.5)"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="transition-colors duration-300"
        />

        {/* ── Hand-Drawn Animated Checkmark ── */}
        <path
          d="M 6.5,14.5 C 9.2,17.2 11,19.8 12.2,21.5 C 15.5,15.5 19.8,9.5 23.5,5.5"
          stroke={checked ? "#ffffff" : "transparent"}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={cn(
            "transition-all duration-300 ease-out origin-center",
            checked
              ? "opacity-100 scale-100 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              : "opacity-0 scale-75"
          )}
        />
      </svg>
    </div>
  );
}
