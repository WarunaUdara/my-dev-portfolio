"use client";

import React, { useEffect, useRef, useState } from "react";

// Exact 7 Tonal Level Colors from the Dithering Tool
const LEVEL_COLORS = [
  "#1a0a06",
  "#3a1408",
  "#6b220c",
  "#a8330f",
  "#d9531c",
  "#f2823c",
  "#ffd39b",
];

// Exact Character Ramp from the Dithering Tool
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

interface SingleHandProps {
  imgSrc: string;
  isLeft: boolean;
}

function SingleHandDither({ imgSrc, isLeft }: SingleHandProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax spring state (very subtle and smooth)
  const mouseParallaxTarget = useRef({ x: 0, y: 0 });
  const mouseParallaxCur = useRef({ x: 0, y: 0 });
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });

  // Hover color tracking (in canvas pixel space)
  const hoverMousePos = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !canvasRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const canvasRect = canvasRef.current.getBoundingClientRect();

    // Parallax relative to hand container (-1 to 1)
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    mouseParallaxTarget.current = { x: nx, y: ny };

    // Canvas internal pixel coordinates for hover color highlight
    const scaleX = canvasRef.current.width / (canvasRect.width || 1);
    const scaleY = canvasRef.current.height / (canvasRect.height || 1);
    hoverMousePos.current = {
      x: (e.clientX - canvasRect.left) * scaleX,
      y: (e.clientY - canvasRect.top) * scaleY,
    };
  };

  const handleMouseLeave = () => {
    mouseParallaxTarget.current = { x: 0, y: 0 };
    hoverMousePos.current = null;
  };

  // Parallax Spring Animation Loop
  useEffect(() => {
    let animId: number;
    const tick = () => {
      mouseParallaxCur.current.x += (mouseParallaxTarget.current.x - mouseParallaxCur.current.x) * 0.08;
      mouseParallaxCur.current.y += (mouseParallaxTarget.current.y - mouseParallaxCur.current.y) * 0.08;
      setParallaxOffset({ ...mouseParallaxCur.current });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Exact Dither Filter Tool Engine
  useEffect(() => {
    let isActive = true;
    let rafId: number;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;

    img.onload = () => {
      if (!isActive || !canvasRef.current || !containerRef.current) return;

      const outputCanvas = canvasRef.current;
      const outputCtx = outputCanvas.getContext("2d");
      if (!outputCtx) return;

      const aspect = img.width / img.height;
      const targetW = 900;
      const targetH = Math.round(targetW / aspect);

      outputCanvas.width = targetW;
      outputCanvas.height = targetH;

      const cols = 75; // Resolution matching Dithering Tool
      const rows = Math.max(1, Math.round(cols / aspect));
      const cellW = targetW / cols;
      const cellH = targetH / rows;

      // Offscreen thumbnail canvas to sample brightness
      const thumb = document.createElement("canvas");
      thumb.width = cols;
      thumb.height = rows;
      const thumbCtx = thumb.getContext("2d", { willReadFrequently: true });
      if (!thumbCtx) return;

      thumbCtx.drawImage(img, 0, 0, cols, rows);
      const imgData = thumbCtx.getImageData(0, 0, cols, rows).data;

      const brightness = new Float32Array(cols * rows);
      const level = new Uint8Array(cols * rows);
      const influence = new Float32Array(cols * rows);

      // Exact Dithering Tool Brightness & Quantization formula
      for (let i = 0, p = 0; i < brightness.length; i++, p += 4) {
        const a = imgData[p + 3] / 255;
        const b = ((imgData[p] * 0.299 + imgData[p + 1] * 0.587 + imgData[p + 2] * 0.114) / 255) * a;
        brightness[i] = b;
        level[i] = Math.min(6, Math.floor(b * 7));
      }

      const levelRgb = LEVEL_COLORS.map(hexToRgb);
      const hoverRgb = hexToRgb("#ffffff");
      const radiusPx = (20 / 100) * targetW;
      const intensity = 1.0;
      const speed = 0.18;

      const fontSize = Math.max(6, Math.min(cellW, cellH) * 1.05);

      // Continuous render & hover animation loop
      const renderLoop = () => {
        if (!isActive) return;

        // 1. Update Hover Influence
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            let target = 0;
            if (hoverMousePos.current) {
              const cx = c * cellW + cellW / 2;
              const cy = r * cellH + cellH / 2;
              const dist = Math.hypot(cx - hoverMousePos.current.x, cy - hoverMousePos.current.y);
              const t = 1 - Math.min(1, dist / radiusPx);
              target = Math.max(0, t) * intensity;
            }
            influence[idx] += (target - influence[idx]) * speed;
            if (Math.abs(influence[idx]) < 0.001) influence[idx] = 0;
          }
        }

        // 2. Exact Dithering Tool Draw Routine
        outputCtx.clearRect(0, 0, targetW, targetH);
        outputCtx.textAlign = "center";
        outputCtx.textBaseline = "middle";
        outputCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const lvl = level[idx];
            if (lvl === 0) continue; // Skip empty background

            const inf = influence[idx];
            const base = levelRgb[lvl];
            const rgb = inf > 0.001 ? lerpColor(base, hoverRgb, inf) : base;
            const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

            const cx = c * cellW + cellW / 2;
            const cy = r * cellH + cellH / 2;

            const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
            const ch = ASCII_RAMP[rampIdx];
            if (ch && ch !== " ") {
              outputCtx.fillStyle = color;
              outputCtx.fillText(ch, cx, cy);
            }
          }
        }

        rafId = requestAnimationFrame(renderLoop);
      };

      rafId = requestAnimationFrame(renderLoop);
    };

    return () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [imgSrc]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full sm:w-[50%] h-[280px] sm:h-[380px] md:h-[460px] relative pointer-events-auto flex items-end ${
        isLeft ? "justify-start" : "justify-end"
      }`}
    >
      {/* Subtle Deep Layer Beneath (Slower Parallax + Muted Filter) */}
      <div
        className="absolute inset-0 transition-transform duration-100 ease-out flex items-end opacity-40 mix-blend-screen pointer-events-none filter blur-[1.5px]"
        style={{
          transform: `translate3d(${parallaxOffset.x * 5}px, ${parallaxOffset.y * 4}px, 0) scale(1.02)`,
          justifyContent: isLeft ? "flex-start" : "flex-end",
        }}
      >
        <canvas
          ref={(node) => {
            if (node && canvasRef.current && node !== canvasRef.current) {
              node.width = canvasRef.current.width;
              node.height = canvasRef.current.height;
              const nCtx = node.getContext("2d");
              if (nCtx) nCtx.drawImage(canvasRef.current, 0, 0);
            }
          }}
          className="block max-h-full max-w-full object-contain"
        />
      </div>

      {/* Top Crisp ASCII Dither Layer (Subtle Parallax Movement) */}
      <div
        className="w-full h-full relative transition-transform duration-100 ease-out flex items-end"
        style={{
          transform: `translate3d(${parallaxOffset.x * 12}px, ${parallaxOffset.y * 9}px, 0)`,
          justifyContent: isLeft ? "flex-start" : "flex-end",
        }}
      >
        <canvas
          ref={canvasRef}
          className="block max-h-full max-w-full object-contain filter drop-shadow-[0_0_24px_rgba(217,83,28,0.25)]"
        />
      </div>
    </div>
  );
}

interface AdamFooterDitherProps {
  children?: React.ReactNode;
}

export default function AdamFooterDither({ children }: AdamFooterDitherProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#060608] select-none min-h-[500px] sm:min-h-[600px] flex flex-col justify-between">
      {/* -------------------------------------------------------------
          EXACT DITHER FILTER TOOL CANVASES (Creation of Adam Hands)
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col sm:flex-row justify-between items-end pb-0">
        <SingleHandDither imgSrc="/adam-hands/left-hand.png" isLeft={true} />
        <SingleHandDither imgSrc="/adam-hands/right-hand.png" isLeft={false} />
      </div>

      {/* -------------------------------------------------------------
          FOOTER CONTENT & LINKS OVERLAY (Front Interactive Layer)
          ------------------------------------------------------------- */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}