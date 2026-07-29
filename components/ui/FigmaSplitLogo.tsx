"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FigmaSplitLogoProps {
  className?: string;
  size?: number; // width in pixels
}

export default function FigmaSplitLogo({
  className,
  size = 80,
}: FigmaSplitLogoProps) {
  const height = (size * 716) / 667;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none cursor-pointer group",
        className
      )}
      style={{ width: size, height }}
    >
      <svg
        width={size}
        height={height}
        viewBox="0 0 667 716"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]"
      >
        {/* Left Split Half of 'W' Logo - Animated from Left */}
        <motion.path
          d="M128.65 91.6168L16 185.011V685.678H128.65L332.769 526.813V99.3194L275.962 151.312V427.642L128.65 539.329V91.6168Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          initial={{ x: -100, opacity: 0, scale: 0.9 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
            duration: 0.9,
          }}
        />

        {/* Right Split Half of 'W' Logo - Animated from Right */}
        <motion.path
          d="M537.85 4L650.5 97.3938V598.061H537.85L333.731 439.196V11.7026L390.538 63.695V340.025L537.85 451.712V4Z"
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeOpacity="0.8"
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          whileInView={{ x: 0, opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 22,
            duration: 0.9,
            delay: 0.1,
          }}
        />
      </svg>
    </div>
  );
}
