"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedLogoProps {
  className?: string;
  size?: number; // Size in pixels
  animateOnHover?: boolean;
}

export default function AnimatedLogo({
  className,
  size = 96,
  animateOnHover = true,
}: AnimatedLogoProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center select-none cursor-pointer group",
        className
      )}
      style={{ width: size, height: (size * 716) / 667 }}
    >
      <svg
        width={size}
        height={(size * 716) / 667}
        viewBox="0 0 667 716"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]"
      >
        {/* Left Split Half of 'W' Logo - Comes from Left */}
        <motion.path
          d="M128.65 91.6168L16 185.011V685.678H128.65L332.769 526.813V99.3194L275.962 151.312V427.642L128.65 539.329V91.6168Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1"
          initial={{ x: -70, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-20px" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            duration: 0.8,
          }}
          whileHover={animateOnHover ? { x: -6 } : undefined}
        />

        {/* Right Split Half of 'W' Logo - Comes from Right & Locks with Left */}
        <motion.path
          d="M537.85 4L650.5 97.3938V598.061H537.85L333.731 439.196V11.7026L390.538 63.695V340.025L537.85 451.712V4Z"
          fill="#ffffff"
          stroke="#ffffff"
          strokeWidth="1"
          strokeOpacity="0.3"
          initial={{ x: 70, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, margin: "-20px" }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 24,
            duration: 0.8,
            delay: 0.1,
          }}
          whileHover={animateOnHover ? { x: 6 } : undefined}
        />
      </svg>
    </div>
  );
}
