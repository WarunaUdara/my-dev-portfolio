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
        {/* ── Hand-Drawn Sketchy Box (Primary Outer Path) ── */}
        <path
          d="M 3,4 C 8,2.8 20,3.2 24.5,3.8 C 26,4 25.8,14 25.5,23.5 C 25.2,25.5 12,25.8 4,25 C 2.5,24.5 2.8,12 3,4 Z"
          stroke={checked ? "#ffffff" : "#e5e5e5"}
          strokeWidth={checked ? "2.2" : "2.0"}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={checked ? "#ffffff" : "rgba(255, 255, 255, 0.05)"}
          className="transition-colors duration-300"
        />

        {/* Secondary Metallic Silver Organic Sketch Overlap */}
        <path
          d="M 2.2,5.2 C 9,3.5 19,3.8 24.8,4.2 C 25.2,10 24.9,19 24.5,24.2 C 18,24.8 8,24.5 3.5,24 C 2.8,18 2.5,9 2.2,5.2 Z"
          stroke={checked ? "#d4d4d4" : "#a3a3a3"}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className="transition-colors duration-300"
        />

        {/* ── Hand-Drawn Animated Checkmark (Pure Black on White background for contrast) ── */}
        <path
          d="M 6.5,14.5 C 9.2,17.2 11,19.8 12.2,21.5 C 15.5,15.5 19.8,9.5 23.5,5.5"
          stroke={checked ? "#050505" : "transparent"}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          className={cn(
            "transition-all duration-300 ease-out origin-center",
            checked
              ? "opacity-100 scale-100 drop-shadow-[0_0_2px_rgba(0,0,0,0.5)]"
              : "opacity-0 scale-75"
          )}
        />
      </svg>
    </div>
  );
}
