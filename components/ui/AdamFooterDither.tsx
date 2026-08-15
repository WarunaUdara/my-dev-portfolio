"use client";

import React, { useEffect, useRef, useState } from "react";

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

interface SingleHandCanvasProps {
  imgSrc: string;
  isLeft: boolean;
}

function SingleHandCanvas({ imgSrc, isLeft }: SingleHandCanvasProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const targetRef = useRef({ x: 0, y: 0 });
  const curRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });

  // Independent Hover Listener for this hand only
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    targetRef.current = { x: nx, y: ny };
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  // Independent Parallax Smooth Spring Animation
  useEffect(() => {
    let animId: number;
    const tick = () => {
      curRef.current.x += (targetRef.current.x - curRef.current.x) * 0.08;
      curRef.current.y += (targetRef.current.y - curRef.current.y) * 0.08;

      setPos({ x: curRef.current.x, y: curRef.current.y });
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ASCII Dither Engine preserving natural image aspect ratio (no squashing)
  useEffect(() => {
    let isActive = true;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;

    img.onload = () => {
      if (!isActive || !canvasRef.current || !wrapRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;

      const rect = wrapRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Preserve natural image aspect ratio
      const imgAspect = img.width / img.height;
      const displayH = rect.height;
      const displayW = Math.min(rect.width, displayH * imgAspect);

      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cellSize = 11;
      const cols = Math.floor(displayW / cellSize);
      const rows = Math.floor(displayH / cellSize);

      // Offscreen sampling grid
      const tmp = document.createElement("canvas");
      tmp.width = cols;
      tmp.height = rows;
      const tmpCtx = tmp.getContext("2d", { willReadFrequently: true });
      if (!tmpCtx) return;

      tmpCtx.drawImage(img, 0, 0, cols, rows);
      const data = tmpCtx.getImageData(0, 0, cols, rows).data;

      // Per-image brightness range normalization
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

      ctx.clearRect(0, 0, displayW, displayH);
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "10px ui-monospace, SFMono-Regular, monospace";

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const norm = (raw[i] - min) / range;
          if (norm < 0.22) continue; // Cut background gray space

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

    return () => {
      isActive = false;
    };
  }, [imgSrc]);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`w-full sm:w-1/2 h-[280px] sm:h-[380px] md:h-[480px] relative pointer-events-auto flex items-end ${
        isLeft ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className="w-full h-full relative transition-transform duration-100 ease-out flex items-end"
        style={{
          transform: `translate3d(${pos.x * 22}px, ${pos.y * 16}px, 0)`,
          justifyContent: isLeft ? "flex-start" : "flex-end",
        }}
      >
        <canvas ref={canvasRef} className="block max-h-full max-w-full" />
      </div>
    </div>
  );
}

interface AdamFooterDitherProps {
  children?: React.ReactNode;
}

export default function AdamFooterDither({ children }: AdamFooterDitherProps) {
  return (
    <div className="relative w-full overflow-hidden bg-[#060608] select-none min-h-[460px] sm:min-h-[560px] flex flex-col justify-between">
      {/* -------------------------------------------------------------
          PURE ASCII DITHER CANVAS LAYER (Independent Left & Right Hands)
          ------------------------------------------------------------- */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col sm:flex-row justify-between items-end opacity-90 pb-2 sm:pb-6">
        <SingleHandCanvas imgSrc="/adam-hands/left-bw-hand.jpg" isLeft={true} />
        <SingleHandCanvas imgSrc="/adam-hands/right-bw-hand.jpg" isLeft={false} />
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