"use client";

import React, { useEffect, useRef, useState } from "react";

// 7 Tonal level colors mapping from dark crimson to warm coral highlight
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

  // Pure ASCII Dither Canvas Renderer
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

        const cellSize = 11;
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

        // Per-image brightness normalization
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
            ctx.fillStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.min(1, norm * 1.3)})`;
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
          PURE ASCII DITHER CANVAS LAYER (Anchored at Bottom with Parallax)
          ------------------------------------------------------------- */}
      <div
        className="absolute inset-0 pointer-events-none z-10 flex items-end opacity-90 transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${mousePos.x * 18}px, ${mousePos.y * 14 + 10}px, 0)`,
        }}
      >
        <div className="w-1/2 h-[75%] relative">
          <canvas ref={canvasLeftRef} className="w-full h-full block" />
        </div>
        <div className="w-1/2 h-[75%] relative">
          <canvas ref={canvasRightRef} className="w-full h-full block" />
        </div>
      </div>

      {/* -------------------------------------------------------------
          FOOTER CONTENT & LINKS OVERLAY (Front Interactive Layer)
          ------------------------------------------------------------- */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}
