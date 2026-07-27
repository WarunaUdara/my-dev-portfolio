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
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "300px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`absolute top-0 inset-x-0 ${height} overflow-hidden pointer-events-auto z-0 ${className}`}
    >
      {isVisible && (
        <Frost
          frost={0.06}
          strength={0.65}
          contrast={2.8}
          crispness={1.2}
          highlight={0.4}
          haze={0.4}
          tintStrength={0.25}
          refraction={1}
          detail={2}
          textureScale={2}
          meltRadius={0.25}
          meltNoise={0.25}
          meltStrength={0.75}
          refreeze={2}
          opacity={0.5}
          shimmer={0.15}
          meltEdges
          tintThin={[0.75, 0.8, 0.9]}
          tintThick={[0.9, 0.93, 1.0]}
          className="w-full h-full"
          {...props}
        >
          <div className="w-full h-full bg-gradient-to-b from-black/80 via-neutral-900/50 to-black/90" />
        </Frost>
      )}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-72 bg-gradient-to-b from-transparent via-black/20 via-black/60 via-black/90 to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/70 pointer-events-none z-10" />
    </div>
  );
}

export default ScrollFrost;
