"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#ffffff", "#e2e8f0", "#94a3b8", "#cbd5e1"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${colors[0]})`,
      backgroundSize: "400% 400%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${12 / speed}s`,
    };

    return (
      <span
        className={`animate-aurora relative inline-block bg-clip-text text-transparent ${className}`}
        style={gradientStyle}
      >
        {children}
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
export default AuroraText;
