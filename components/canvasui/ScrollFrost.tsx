"use client";

import React, { useState, useEffect, useRef } from "react";
import Frost, { FrostOptions } from "./Frost";

interface ScrollFrostProps extends FrostOptions {
  className?: string;
  height?: string;
}

export function ScrollFrost({
  className = "",
  height = "h-[600px]",
  ...props
}: ScrollFrostProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "150px 0px" } // Triggers on scroll approach
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 inset-x-0 ${height} overflow-hidden pointer-events-none opacity-40 z-0 ${className}`}
    >
      {isVisible && (
        <Frost
          frost={0.05}
          strength={0.7}
          contrast={3}
          crispness={1}
          highlight={0.3}
          haze={0.5}
          tintStrength={0.3}
          refraction={1}
          detail={2}
          textureScale={2}
          meltRadius={0.25}
          meltNoise={0.25}
          meltStrength={0.75}
          refreeze={2}
          opacity={0.6}
          shimmer={0}
          meltEdges
          tintThin={[0.8196, 0.8588, 1]}
          tintThick={[0.9176, 0.9608, 1]}
          {...props}
        />
      )}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-t from-black via-black/90 to-transparent" />
    </div>
  );
}

export default ScrollFrost;
