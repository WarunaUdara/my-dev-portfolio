"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "@/components/ui/Image";

// Exact 7 Tonal Level Colors from the Dithering Tool
const LEVEL_COLORS = [
  "#1a0a06", // 0: Shadow
  "#3a1408", // 1: Low
  "#6b220c", // 2: Mid-low
  "#a8330f", // 3: Mid
  "#d9531c", // 4: Mid-high
  "#f2823c", // 5: High
  "#f2823c", // 6: Highlight
];

const ASCII_RAMP = " .:-=+*#%@";

function hexToRgb(hex: string): [number, number, number] {
  const v = parseInt(hex.slice(1), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function lerpColor(
  rgbA: [number, number, number],
  rgbB: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(rgbA[0] + (rgbB[0] - rgbA[0]) * t),
    Math.round(rgbA[1] + (rgbB[1] - rgbA[1]) * t),
    Math.round(rgbA[2] + (rgbB[2] - rgbA[2]) * t),
  ];
}

interface AboutImageDitherProps {
  src: string;
  alt: string;
  className?: string;
}

interface AboutDitherState {
  target: { x: number; y: number };
  cur: { x: number; y: number };
  hoverCanvasPos: { x: number; y: number } | null;
  needsHighlightRedraw: boolean;
}

export default function AboutImageDither({ src, alt, className }: AboutImageDitherProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shadowCanvasRef = useRef<HTMLCanvasElement>(null);
  const midCanvasRef = useRef<HTMLCanvasElement>(null);
  const highlightCanvasRef = useRef<HTMLCanvasElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const stateRef = useRef<AboutDitherState>({
    target: { x: 0, y: 0 },
    cur: { x: 0, y: 0 },
    hoverCanvasPos: null,
    needsHighlightRedraw: false,
  });

  const redrawHighlight = useRef<(() => void) | null>(null);

  // Mouse Tracking & Parallax Dispatcher
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !highlightCanvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

    stateRef.current.target = { x: nx, y: ny };

    const canvas = highlightCanvasRef.current;
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    stateRef.current.hoverCanvasPos = {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
    stateRef.current.needsHighlightRedraw = true;
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stateRef.current.target = { x: 0, y: 0 };
    stateRef.current.hoverCanvasPos = null;
    stateRef.current.needsHighlightRedraw = true;
  }, []);

  // Spring Parallax Loop
  useEffect(() => {
    let animId: number;
    const tick = () => {
      const dx = stateRef.current.target.x - stateRef.current.cur.x;
      const dy = stateRef.current.target.y - stateRef.current.cur.y;

      if (Math.abs(dx) > 0.0005 || Math.abs(dy) > 0.0005) {
        stateRef.current.cur.x += dx * 0.12;
        stateRef.current.cur.y += dy * 0.12;
        setOffset({ ...stateRef.current.cur });
      }

      if (stateRef.current.needsHighlightRedraw && redrawHighlight.current) {
        redrawHighlight.current();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // 1-Time High-Performance ASCII Canvas Pre-Renderer
  useEffect(() => {
    let isActive = true;

    const shadowCanvas = shadowCanvasRef.current;
    const midCanvas = midCanvasRef.current;
    const highlightCanvas = highlightCanvasRef.current;
    if (!shadowCanvas || !midCanvas || !highlightCanvas) return;

    const shadowCtx = shadowCanvas.getContext("2d");
    const midCtx = midCanvas.getContext("2d");
    const highlightCtx = highlightCanvas.getContext("2d");
    if (!shadowCtx || !midCtx || !highlightCtx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    let updateHighlight: (() => void) | null = null;

    img.onload = () => {
      if (!isActive) return;

      const aspect = img.width / img.height;
      const targetW = 600;
      const targetH = Math.round(targetW / aspect);

      shadowCanvas.width = targetW;
      shadowCanvas.height = targetH;
      midCanvas.width = targetW;
      midCanvas.height = targetH;
      highlightCanvas.width = targetW;
      highlightCanvas.height = targetH;

      const cols = 70;
      const rows = Math.max(1, Math.round(cols / aspect));
      const cellW = targetW / cols;
      const cellH = targetH / rows;

      const thumb = document.createElement("canvas");
      thumb.width = cols;
      thumb.height = rows;
      const thumbCtx = thumb.getContext("2d", { willReadFrequently: true });
      if (!thumbCtx) return;

      thumbCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = thumbCtx.getImageData(0, 0, cols, rows).data;

      const level = new Uint8Array(cols * rows);
      const influence = new Float32Array(cols * rows);

      for (let i = 0, p = 0; i < level.length; i++, p += 4) {
        const a = imgData[p + 3] / 255;
        if (a < 0.08) {
          level[i] = 255; // Transparent / skip
          continue;
        }
        const b = ((imgData[p] * 0.299 + imgData[p + 1] * 0.587 + imgData[p + 2] * 0.114) / 255) * a;
        level[i] = Math.min(6, Math.floor(b * 7));
      }

      const levelRgb = LEVEL_COLORS.map(hexToRgb);
      const hoverRgb = hexToRgb("#ffffff");
      const radiusPx = (24 / 100) * targetW;
      const intensity = 1.0;
      const speed = 0.2;
      const fontSize = Math.max(6, Math.min(cellW, cellH) * 1.05);

      // 1. Pre-Render Shadows (Levels 0, 1, 2)
      shadowCtx.clearRect(0, 0, targetW, targetH);
      shadowCtx.textAlign = "center";
      shadowCtx.textBaseline = "middle";
      shadowCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const lvl = level[idx];
          if (lvl > 2) continue;

          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;
          const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
          const ch = ASCII_RAMP[rampIdx];
          if (ch && ch !== " ") {
            const rgb = levelRgb[lvl];
            shadowCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
            shadowCtx.fillText(ch, cx, cy);
          }
        }
      }

      // 2. Pre-Render Midtones (Levels 3, 4)
      midCtx.clearRect(0, 0, targetW, targetH);
      midCtx.textAlign = "center";
      midCtx.textBaseline = "middle";
      midCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          const lvl = level[idx];
          if (lvl < 3 || lvl > 4) continue;

          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;
          const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
          const ch = ASCII_RAMP[rampIdx];
          if (ch && ch !== " ") {
            const rgb = levelRgb[lvl];
            midCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
            midCtx.fillText(ch, cx, cy);
          }
        }
      }

      // 3. Highlight Layer with Live Cursor Glow
      const drawHighlight = () => {
        highlightCtx.clearRect(0, 0, targetW, targetH);
        highlightCtx.textAlign = "center";
        highlightCtx.textBaseline = "middle";
        highlightCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

        let anyActiveInfluence = false;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const lvl = level[idx];
            if (lvl < 5 || lvl === 255) continue;

            let target = 0;
            if (stateRef.current.hoverCanvasPos) {
              const cx = c * cellW + cellW / 2;
              const cy = r * cellH + cellH / 2;
              const dist = Math.hypot(cx - stateRef.current.hoverCanvasPos.x, cy - stateRef.current.hoverCanvasPos.y);
              const t = 1 - Math.min(1, dist / radiusPx);
              target = Math.max(0, t) * intensity;
            }

            influence[idx] += (target - influence[idx]) * speed;
            if (Math.abs(influence[idx]) < 0.002) {
              influence[idx] = 0;
            } else {
              anyActiveInfluence = true;
            }

            const inf = influence[idx];
            const base = levelRgb[lvl];
            const rgb = inf > 0.001 ? lerpColor(base, hoverRgb, inf) : base;
            const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

            const cx = c * cellW + cellW / 2;
            const cy = r * cellH + cellH / 2;
            const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
            const ch = ASCII_RAMP[rampIdx];
            if (ch && ch !== " ") {
              highlightCtx.fillStyle = color;
              highlightCtx.fillText(ch, cx, cy);
            }
          }
        }

        stateRef.current.needsHighlightRedraw = anyActiveInfluence || stateRef.current.hoverCanvasPos !== null;
      };

      drawHighlight();
      updateHighlight = drawHighlight;
    };

    redrawHighlight.current = () => {
      if (updateHighlight) updateHighlight();
    };

    return () => {
      isActive = false;
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-sm lg:max-w-md mx-auto aspect-[3/4] group overflow-hidden flex items-start justify-center cursor-pointer select-none ${
        className || ""
      }`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 98%)",
      }}
    >
      {/* -------------------------------------------------------------
          UNDERLYING ASCII FILTER IMAGE (Revealed on Hover with Parallax)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${offset.x * 4}px, ${offset.y * 3}px, 0)`,
        }}
      >
        {/* Layer 1: Shadow Plane */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out opacity-90"
          style={{
            transform: `translate3d(${offset.x * 1.5}px, ${offset.y * 1}px, 0) scale(0.995)`,
          }}
        >
          <canvas ref={shadowCanvasRef} className="block max-h-full max-w-full object-contain" />
        </div>

        {/* Layer 2: Midtone Plane */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out opacity-95"
          style={{
            transform: `translate3d(${offset.x * 3}px, ${offset.y * 2.2}px, 0)`,
          }}
        >
          <canvas ref={midCanvasRef} className="block max-h-full max-w-full object-contain" />
        </div>

        {/* Layer 3: Highlight Plane with Hover Glow */}
        <div
          className="w-full h-full relative flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${offset.x * 5}px, ${offset.y * 3.8}px, 0)`,
          }}
        >
          <canvas
            ref={highlightCanvasRef}
            className="block max-h-full max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(217,83,28,0.35)]"
          />
        </div>
      </div>

      {/* -------------------------------------------------------------
          TOP ORIGINAL CRISP PHOTO (Dissolves on Hover to reveal ASCII)
          ------------------------------------------------------------- */}
      <div
        className={`absolute inset-0 transition-all duration-700 ease-out pointer-events-none ${
          isHovered ? "opacity-0 scale-[1.03]" : "opacity-100 scale-100"
        }`}
        style={{
          transform: `translate3d(${offset.x * 2}px, ${offset.y * 1.5}px, 0)`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain object-top"
          priority
        />
      </div>
    </div>
  );
}
