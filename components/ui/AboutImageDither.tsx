"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "@/components/ui/Image";

// Exact 7 Tonal Level Colors with visible warm bronze/charcoal for shadows & hair
const LEVEL_COLORS = [
  "#4a2014", // 0: Visible warm charcoal-bronze for hair/beard/shadow contours
  "#6e2d19", // 1: Low warm bronze
  "#963914", // 2: Mid-low copper
  "#c44e18", // 3: Mid amber-orange
  "#e86b24", // 4: Mid-high bright orange
  "#fa8f3e", // 5: High radiant orange
  "#ffd5a6", // 6: Highlight gold-white
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
  const [mousePos, setMousePos] = useState({ x: 200, y: 250 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const stateRef = useRef<AboutDitherState>({
    target: { x: 0, y: 0 },
    cur: { x: 0, y: 0 },
    hoverCanvasPos: null,
    needsHighlightRedraw: false,
  });

  const redrawHighlight = useRef<(() => void) | null>(null);

  // Mouse Tracking: Updates radial lens position & synchronized parallax target
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !highlightCanvasRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    setMousePos({ x: localX, y: localY });

    const nx = Math.max(-1, Math.min(1, (localX / rect.width) * 2 - 1));
    const ny = Math.max(-1, Math.min(1, (localY / rect.height) * 2 - 1));

    stateRef.current.target = { x: nx, y: ny };

    const canvas = highlightCanvasRef.current;
    const scaleX = canvas.width / (rect.width || 1);
    const scaleY = canvas.height / (rect.height || 1);
    stateRef.current.hoverCanvasPos = {
      x: localX * scaleX,
      y: localY * scaleY,
    };
    stateRef.current.needsHighlightRedraw = true;
  }, []);

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    stateRef.current.target = { x: 0, y: 0 };
    stateRef.current.hoverCanvasPos = null;
    stateRef.current.needsHighlightRedraw = true;
  }, []);

  // Spring Parallax Loop: Subtle, synchronized micro-movement
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

  // 1-Time High-Performance ASCII Canvas Pre-Renderer: 1:1 Pixel Accuracy
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

      // 1732x1732 image: render on crisp square resolution
      const targetW = 900;
      const targetH = 900;

      shadowCanvas.width = targetW;
      shadowCanvas.height = targetH;
      midCanvas.width = targetW;
      midCanvas.height = targetH;
      highlightCanvas.width = targetW;
      highlightCanvas.height = targetH;

      const cols = 80;
      const rows = 80;
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
      const isSubject = new Uint8Array(cols * rows);
      const influence = new Float32Array(cols * rows);

      for (let i = 0, p = 0; i < level.length; i++, p += 4) {
        const a = imgData[p + 3] / 255;
        if (a < 0.08) {
          level[i] = 255; // Transparent background
          isSubject[i] = 0;
          continue;
        }
        isSubject[i] = 1;
        const b = (imgData[p] * 0.299 + imgData[p + 1] * 0.587 + imgData[p + 2] * 0.114) / 255;
        level[i] = Math.min(6, Math.floor(b * 7));
      }

      const levelRgb = LEVEL_COLORS.map(hexToRgb);
      const hoverRgb = hexToRgb("#ffffff");
      const radiusPx = (24 / 100) * targetW;
      const intensity = 1.0;
      const speed = 0.2;
      const fontSize = Math.max(6, Math.min(cellW, cellH) * 1.05);

      // -------------------------------------------------------------
      // 1. Pre-Render Shadows & Dark Contours (Levels 0, 1, 2)
      // -------------------------------------------------------------
      shadowCtx.clearRect(0, 0, targetW, targetH);
      shadowCtx.textAlign = "center";
      shadowCtx.textBaseline = "middle";
      shadowCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (!isSubject[idx]) continue;

          const lvl = level[idx];
          if (lvl > 2) continue; // Shadows only

          const cx = c * cellW + cellW / 2;
          const cy = r * cellH + cellH / 2;

          // For darkest level 0 (hair/beard/deep shadows), use visible subtle glyphs
          const ch = lvl === 0 ? "." : lvl === 1 ? ":" : "-";
          const rgb = levelRgb[lvl];
          shadowCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
          shadowCtx.fillText(ch, cx, cy);
        }
      }

      // -------------------------------------------------------------
      // 2. Pre-Render Midtones (Levels 3, 4)
      // -------------------------------------------------------------
      midCtx.clearRect(0, 0, targetW, targetH);
      midCtx.textAlign = "center";
      midCtx.textBaseline = "middle";
      midCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c;
          if (!isSubject[idx]) continue;

          const lvl = level[idx];
          if (lvl < 3 || lvl > 4) continue; // Midtones only

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

      // -------------------------------------------------------------
      // 3. Highlight Layer with Live Cursor Glow
      // -------------------------------------------------------------
      const drawHighlight = () => {
        highlightCtx.clearRect(0, 0, targetW, targetH);
        highlightCtx.textAlign = "center";
        highlightCtx.textBaseline = "middle";
        highlightCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

        let anyActiveInfluence = false;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            if (!isSubject[idx]) continue;

            const lvl = level[idx];
            if (lvl < 5) continue; // Highlights only

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

  // Ultra-Soft Feathered Radius Lens Cutout Mask on Top Image
  const lensRadius = 185; // Soft aperture radius in pixels

  const topImageMask = isHovered
    ? `radial-gradient(circle ${lensRadius}px at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.6) 72%, rgba(0,0,0,0.92) 88%, rgba(0,0,0,1) 100%)`
    : "none";

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[460px] sm:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] mx-auto aspect-square overflow-hidden flex items-start justify-center cursor-pointer select-none ${
        className || ""
      }`}
      style={{
        WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 98%)",
        maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 98%)",
      }}
    >
      {/* -------------------------------------------------------------
          UNDERLYING ASCII FILTER IMAGE (100% 1:1 Pixel-Matched Position)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${offset.x * 2}px, ${offset.y * 1.5}px, 0)`,
        }}
      >
        {/* Layer 1: Shadow Plane (Visible dark contours) */}
        <div className="absolute inset-0 w-full h-full opacity-90">
          <canvas ref={shadowCanvasRef} className="block w-full h-full object-contain object-top" />
        </div>

        {/* Layer 2: Midtone Plane */}
        <div className="absolute inset-0 w-full h-full opacity-95">
          <canvas ref={midCanvasRef} className="block w-full h-full object-contain object-top" />
        </div>

        {/* Layer 3: Highlight Plane with Live Cursor Glow */}
        <div className="absolute inset-0 w-full h-full">
          <canvas
            ref={highlightCanvasRef}
            className="block w-full h-full object-contain object-top filter drop-shadow-[0_0_20px_rgba(217,83,28,0.35)]"
          />
        </div>
      </div>

      {/* -------------------------------------------------------------
          TOP ORIGINAL CRISP PHOTO (With Ultra-Soft Feathered Radial Cutout)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-100 ease-out"
        style={{
          maskImage: topImageMask,
          WebkitMaskImage: topImageMask,
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
