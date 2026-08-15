"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Image";

// 7 Tonal level colors mapping from dark crimson to warm highlight
const LEVEL_COLORS = [
  "#1c0502",
  "#420b04",
  "#751406",
  "#a8240a",
  "#d63f15",
  "#f56b27",
  "#ffc285",
];

const ASCII_RAMP = [" ", ".", "'", "`", "^", '"', ",", ":", ";", "I", "l", "!", "i", ">", "<", "~", "+", "_", "-", "?", "]", "[", "}", "{", "1", ")", "(", "|", "\\", "/", "t", "f", "j", "r", "n", "x", "v", "c", "z", "X", "Y", "U", "J", "C", "L", "Q", "0", "O", "Z", "m", "w", "q", "p", "d", "b", "k", "h", "a", "o", "*", "#", "M", "W", "&", "8", "%", "B", "@", "$"];

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

interface AdamFooterDitherProps {
  children?: React.ReactNode;
}

export default function AdamFooterDither({ children }: AdamFooterDitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);

  // Parallax Spring State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const mouseTargetRef = useRef({ x: 0, y: 0 });
  const mouseCurRef = useRef({ x: 0, y: 0 });

  // Handle Mouse Move & Leave
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    mouseTargetRef.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    mouseTargetRef.current = { x: 0, y: 0 };
  };

  // Parallax Animation Loop
  useEffect(() => {
    let animId: number;

    const updateParallax = () => {
      const target = mouseTargetRef.current;
      const cur = mouseCurRef.current;

      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;

      setMousePos({ x: cur.x, y: cur.y });
      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ASCII Dither Rendering Loop with Per-Image Brightness Range Normalization
  useEffect(() => {
    let isActive = true;

    const renderDitherCanvas = (
      canvas: HTMLCanvasElement,
      imgSrc: string
    ) => {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imgSrc;

      img.onload = () => {
        if (!isActive || !canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        const parent = canvas.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const width = rect.width;
        const height = rect.height;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cellSize = 12;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        // Offscreen sampling
        const tmp = document.createElement("canvas");
        tmp.width = cols;
        tmp.height = rows;
        const tmpCtx = tmp.getContext("2d", { willReadFrequently: true });
        if (!tmpCtx) return;

        tmpCtx.drawImage(img, 0, 0, cols, rows);
        const data = tmpCtx.getImageData(0, 0, cols, rows).data;

        // Fix 1: Find this image's own min and max brightness range
        let min = 1, max = 0;
        const raw = new Float32Array(cols * rows);
        for (let i = 0, p = 0; i < raw.length; i++, p += 4) {
          const b = (data[p] * 0.299 + data[p + 1] * 0.587 + data[p + 2] * 0.114) / 255;
          raw[i] = b;
          if (b < min) min = b;
          if (b > max) max = b;
        }
        const range = Math.max(0.0001, max - min);

        const levelRgb = LEVEL_COLORS.map(hexToRgb);

        ctx.clearRect(0, 0, width, height);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "10px ui-monospace, SFMono-Regular, monospace";

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = r * cols + c;
            const norm = (raw[i] - min) / range;
            if (norm < 0.22) continue; // Cuts the gray background, keeps only hand silhouette!

            const noise = (Math.sin(c * 12.9898 + r * 78.233) * 43758.5453) % 1;
            const ditherB = Math.min(1, Math.max(0, norm + (noise - 0.5) * 0.12));
            const lvl = Math.min(6, Math.floor(ditherB * 7));

            const char = ASCII_RAMP[Math.floor(ditherB * (ASCII_RAMP.length - 1))];
            if (!char || char === " ") continue;

            const rgb = levelRgb[lvl];
            ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.min(1, norm * 1.2)})`;
            ctx.fillText(char, c * cellSize + cellSize / 2, r * cellSize + cellSize / 2);
          }
        }
      };
    };

    if (canvasLeftRef.current) {
      renderDitherCanvas(canvasLeftRef.current, "/adam-hands/left-bw-hand.jpg");
    }
    if (canvasRightRef.current) {
      renderDitherCanvas(canvasRightRef.current, "/adam-hands/right-bw-hand.jpg");
    }

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#060608] select-none"
    >
      {/* -------------------------------------------------------------
          LAYER 1 (BOTTOM): ASCII Dither Canvas Layer (Slower Parallax)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex opacity-75 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 8}px, ${mousePos.y * 6}px, 0)`,
        }}
      >
        <div className="w-1/2 h-full relative">
          <canvas ref={canvasLeftRef} className="w-full h-full block" />
        </div>
        <div className="w-1/2 h-full relative">
          <canvas ref={canvasRightRef} className="w-full h-full block" />
        </div>
      </div>

      {/* -------------------------------------------------------------
          LAYER 2 (MIDDLE): Muted Duplicate Copy Layer (Medium Parallax)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none z-20 flex justify-between items-center px-0 sm:px-4 opacity-15 mix-blend-screen transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 15}px, 0) scale(1.02)`,
        }}
      >
        {/* Left Hand Copy */}
        <div className="relative w-[200px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[807/1117] -ml-6 sm:-ml-10">
          <Image
            src="/adam-hands/left-hand.png"
            alt="Creation of Adam Left Hand Duplicate"
            fill
            className="object-contain filter sepia saturate-150 hue-rotate-[-10deg] brightness-75 contrast-125"
          />
        </div>

        {/* Right Hand Copy */}
        <div className="relative w-[200px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[829/1117] -mr-6 sm:-mr-10">
          <Image
            src="/adam-hands/right-hand.png"
            alt="Creation of Adam Right Hand Duplicate"
            fill
            className="object-contain filter sepia saturate-150 hue-rotate-[-10deg] brightness-75 contrast-125"
          />
        </div>
      </div>

      {/* -------------------------------------------------------------
          LAYER 3 (TOP): Shrunken & Muted Hand Cutouts (Fast 3D Parallax Tilt)
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-30 flex justify-between items-center px-0 sm:px-4">
        {/* Top Left Hand */}
        <div
          className="relative w-[200px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[807/1117] -ml-6 sm:-ml-10 opacity-50 mix-blend-luminosity transition-transform duration-100 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -14}deg) rotateY(${mousePos.x * 16}deg) translate3d(${mousePos.x * 38}px, ${mousePos.y * 28}px, 0)`,
          }}
        >
          <Image
            src="/adam-hands/left-hand.png"
            alt="Creation of Adam Left Hand"
            fill
            className="object-contain filter sepia saturate-150 hue-rotate-[-10deg] brightness-75 contrast-125 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Top Right Hand */}
        <div
          className="relative w-[200px] sm:w-[280px] md:w-[340px] lg:w-[380px] aspect-[829/1117] -mr-6 sm:-mr-10 opacity-50 mix-blend-luminosity transition-transform duration-100 ease-out"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * -14}deg) rotateY(${mousePos.x * 16}deg) translate3d(${mousePos.x * 38}px, ${mousePos.y * 28}px, 0)`,
          }}
        >
          <Image
            src="/adam-hands/right-hand.png"
            alt="Creation of Adam Right Hand"
            fill
            className="object-contain filter sepia saturate-150 hue-rotate-[-10deg] brightness-75 contrast-125 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
          />
        </div>
      </div>

      {/* -------------------------------------------------------------
          LAYER 4: Footer Content & Links Overlay (Front Interactive Layer)
          ------------------------------------------------------------- */}
      <div className="relative z-40">
        {children}
      </div>
    </div>
  );
}
