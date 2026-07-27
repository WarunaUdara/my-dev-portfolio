"use client";

import React from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  variant?: "primary" | "aurora";
}

export function InteractiveHoverButton({
  children,
  className,
  icon,
  variant = "aurora",
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm sm:text-base font-semibold font-sans transition-all duration-500 ease-out cursor-pointer",
        "bg-neutral-950/80 backdrop-blur-xl text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.06)] hover:shadow-[0_0_35px_rgba(255,255,255,0.22)] hover:border-white/50 active:scale-95",
        className
      )}
      {...props}
    >
      {/* Background Expand Fill Layer */}
      <span
        className={cn(
          "absolute inset-0 w-full h-full rounded-full transition-transform duration-500 ease-out origin-left scale-x-0 group-hover:scale-x-100",
          variant === "aurora"
            ? "bg-gradient-to-r from-[#a717de] via-[#ff0cbd] via-[#3c34f3] to-[#ff6926]"
            : "bg-white"
        )}
      />

      {/* Button Text */}
      <span className="relative z-10 font-medium tracking-wide transition-colors duration-500 group-hover:text-white">
        {children}
      </span>

      {/* Icon Circle Pill */}
      <div className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-500 group-hover:bg-white group-hover:text-black group-hover:rotate-45 group-hover:scale-110">
        {icon || <IconArrowRight className="h-4 w-4 transition-transform duration-300" />}
      </div>
    </button>
  );
}

export default InteractiveHoverButton;
