"use client";

import React, { useEffect, useRef, useState } from "react";

export interface ParticleScrollOptions {
  point?: number;
  band?: number;
  density?: number;
  size?: number;
  spread?: number;
  gravity?: number;
  drift?: number;
  swirl?: number;
  stagger?: number;
  fade?: number;
  settle?: number;
  smoothing?: number;
}

export interface ParticleScrollProps extends ParticleScrollOptions {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  seed: number;
  color: string;
}

export function ParticleScroll({
  children,
  className,
  style,
  point = 0.68,
  band = 420,
  density = 2,
  size = 1.5,
  spread = 220,
  gravity = 0.35,
  drift = 0.7,
  swirl = 60,
  fade = 0.85,
  ...rest
}: ParticleScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = window.scrollY;

    const particles: Particle[] = [];
    const count = Math.min(350, Math.floor((width * height) / 4500));

    const colors = [
      "rgba(255, 255, 255, 0.85)",
      "rgba(244, 114, 182, 0.8)",  // Pink
      "rgba(167, 139, 250, 0.8)",  // Purple
      "rgba(96, 165, 250, 0.8)",   // Blue
      "rgba(251, 146, 60, 0.8)",   // Orange
    ];

    for (let i = 0; i < count; i++) {
      const hx = Math.random() * width;
      const hy = Math.random() * height;
      particles.push({
        x: hx,
        y: hy,
        homeX: hx,
        homeY: hy,
        vx: (Math.random() - 0.5) * drift * 1.5,
        vy: (Math.random() - 0.5) * drift * 1.5,
        size: (Math.random() * 0.8 + 0.6) * size,
        alpha: Math.random() * fade + (1 - fade),
        seed: Math.random() * 1000,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let lastScroll = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = currentScroll - lastScroll;
      lastScroll = currentScroll;
      scrollY = currentScroll;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let time = 0;

    const render = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      // Formation line calculated from viewport height and point fraction
      const revealLine = height * point;
      const bandHeight = band;

      // Dampen scroll velocity smoothly
      scrollVelocity *= 0.92;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Calculate progress relative to reveal line
        const distToLine = (p.homeY - revealLine) / bandHeight;
        const progress = Math.min(Math.max(distToLine, 0), 1);

        if (progress > 0.01) {
          // Dissolving / Sand Scattering State
          const scatX =
            p.homeX +
            Math.sin(time * drift + p.seed) * swirl * progress +
            (Math.random() - 0.5) * spread * progress;
          const scatY =
            p.homeY +
            progress * spread * gravity +
            scrollVelocity * 0.4 * progress;

          p.x += (scatX - p.x) * 0.1;
          p.y += (scatY - p.y) * 0.1;

          // Draw scattered dust grain
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * (1 + progress * 0.5), 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha * (1 - progress * 0.4);
          ctx.fill();
        } else {
          // Assembled Home Position State
          p.x += (p.homeX - p.x) * 0.2;
          p.y += (p.homeY - p.y) * 0.2;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.globalAlpha = p.alpha * 0.5;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [point, band, density, size, spread, gravity, drift, swirl, fade]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative", ...style }}>
      {/* WebGL / Canvas Particle Sand Overlay */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-20"
        aria-hidden="true"
      />
      {/* Main Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default ParticleScroll;
