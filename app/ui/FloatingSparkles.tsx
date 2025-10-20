"use client";

import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
}

export default function FloatingSparkles() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    // Generate 35 sparkles with random properties
    const generatedSparkles: Sparkle[] = Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // Random horizontal position (0-100%)
      delay: Math.random() * 30, // Stagger the start times (0-30s)
      duration: 20 + Math.random() * 6, // Random duration between 45-70s (very slow)
      size: 1.5 + Math.random() * 2.5, // Random size between 1.5-4px (smaller, subtle)
    }));

    setSparkles(generatedSparkles);
  }, []);

  if (sparkles.length === 0) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[600px] pointer-events-none overflow-hidden z-[8]">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${sparkle.left}%`,
            bottom: '0px',
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animation: `float-up ${sparkle.duration}s infinite linear`,
            animationDelay: `${sparkle.delay}s`,
            background: `radial-gradient(circle at center, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.2) 60%, transparent 100%)`,
            boxShadow: `0 0 ${sparkle.size * 3}px rgba(255, 255, 255, 0.6), 0 0 ${sparkle.size * 6}px rgba(255, 255, 255, 0.3)`,
          }}
        />
      ))}
    </div>
  );
}
