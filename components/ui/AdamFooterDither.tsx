"use client";

import React, { useEffect, useRef, useState } from "react";

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

// Exact Character Ramp from the Dithering Tool
const ASCII_RAMP = " .:-=+*#%@";
const CIPHER_CHARS = "*#%@+=-:~!?01X#&$";

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

interface HandData {
  target: { x: number; y: number };
  cur: { x: number; y: number };
  hoverCanvasPos: { x: number; y: number } | null;
}

export default function AdamFooterDither({ children }: { children?: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Left Hand References
  const leftWrapRef = useRef<HTMLDivElement>(null);
  const leftShadowCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftMidCanvasRef = useRef<HTMLCanvasElement>(null);
  const leftHighlightCanvasRef = useRef<HTMLCanvasElement>(null);

  // Right Hand References
  const rightWrapRef = useRef<HTMLDivElement>(null);
  const rightShadowCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightMidCanvasRef = useRef<HTMLCanvasElement>(null);
  const rightHighlightCanvasRef = useRef<HTMLCanvasElement>(null);

  // Independent Parallax States
  const leftState = useRef<HandData>({ target: { x: 0, y: 0 }, cur: { x: 0, y: 0 }, hoverCanvasPos: null });
  const rightState = useRef<HandData>({ target: { x: 0, y: 0 }, cur: { x: 0, y: 0 }, hoverCanvasPos: null });

  const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
  const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });

  // Scroll In-View & Fingertip Reveal State
  const [isInView, setIsInView] = useState(false);
  const revealProgress = useRef(0);
  const revealStartTime = useRef<number | null>(null);

  // Trigger reveal when scrolling into footer section
  useEffect(() => {
    if (!rootRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  // Root Mouse Tracking: Never blocked by any children layers!
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // 1. Check Left Hand Hitbox & Parallax
    if (leftWrapRef.current && leftHighlightCanvasRef.current) {
      const rect = leftWrapRef.current.getBoundingClientRect();
      const isOverLeft =
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60;

      if (isOverLeft) {
        const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
        leftState.current.target = { x: nx, y: ny };

        const canvas = leftHighlightCanvasRef.current;
        const scaleX = canvas.width / (rect.width || 1);
        const scaleY = canvas.height / (rect.height || 1);
        leftState.current.hoverCanvasPos = {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      } else {
        leftState.current.target = { x: 0, y: 0 };
        leftState.current.hoverCanvasPos = null;
      }
    }

    // 2. Check Right Hand Hitbox & Parallax
    if (rightWrapRef.current && rightHighlightCanvasRef.current) {
      const rect = rightWrapRef.current.getBoundingClientRect();
      const isOverRight =
        e.clientX >= rect.left - 40 &&
        e.clientX <= rect.right + 40 &&
        e.clientY >= rect.top - 60 &&
        e.clientY <= rect.bottom + 60;

      if (isOverRight) {
        const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));
        rightState.current.target = { x: nx, y: ny };

        const canvas = rightHighlightCanvasRef.current;
        const scaleX = canvas.width / (rect.width || 1);
        const scaleY = canvas.height / (rect.height || 1);
        rightState.current.hoverCanvasPos = {
          x: (e.clientX - rect.left) * scaleX,
          y: (e.clientY - rect.top) * scaleY,
        };
      } else {
        rightState.current.target = { x: 0, y: 0 };
        rightState.current.hoverCanvasPos = null;
      }
    }
  };

  const handleMouseLeave = () => {
    leftState.current.target = { x: 0, y: 0 };
    leftState.current.hoverCanvasPos = null;
    rightState.current.target = { x: 0, y: 0 };
    rightState.current.hoverCanvasPos = null;
  };

  // Parallax Spring Animation Loop
  useEffect(() => {
    let animId: number;
    const tick = () => {
      // Left Hand spring damping
      leftState.current.cur.x += (leftState.current.target.x - leftState.current.cur.x) * 0.1;
      leftState.current.cur.y += (leftState.current.target.y - leftState.current.cur.y) * 0.1;
      setLeftOffset({ ...leftState.current.cur });

      // Right Hand spring damping
      rightState.current.cur.x += (rightState.current.target.x - rightState.current.cur.x) * 0.1;
      rightState.current.cur.y += (rightState.current.target.y - rightState.current.cur.y) * 0.1;
      setRightOffset({ ...rightState.current.cur });

      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Setup 3-Tier Dither Renderers with Fingertip-First Decrypt Reveal
  useEffect(() => {
    let isActive = true;
    let rafId: number;

    const setupHandRenderer = (
      imgSrc: string,
      isLeft: boolean,
      shadowCanvas: HTMLCanvasElement | null,
      midCanvas: HTMLCanvasElement | null,
      highlightCanvas: HTMLCanvasElement | null,
      stateRef: React.MutableRefObject<HandData>
    ) => {
      if (!shadowCanvas || !midCanvas || !highlightCanvas) return null;

      const shadowCtx = shadowCanvas.getContext("2d");
      const midCtx = midCanvas.getContext("2d");
      const highlightCtx = highlightCanvas.getContext("2d");
      if (!shadowCtx || !midCtx || !highlightCtx) return null;

      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = imgSrc;

      let renderFrame: (() => void) | null = null;

      img.onload = () => {
        if (!isActive) return;

        const aspect = img.width / img.height;
        const targetW = 900;
        const targetH = Math.round(targetW / aspect);

        shadowCanvas.width = targetW;
        shadowCanvas.height = targetH;
        midCanvas.width = targetW;
        midCanvas.height = targetH;
        highlightCanvas.width = targetW;
        highlightCanvas.height = targetH;

        const cols = 75;
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

        const brightness = new Float32Array(cols * rows);
        const level = new Uint8Array(cols * rows);
        const influence = new Float32Array(cols * rows);
        // Precompute normalized distance from the pointing index fingertip:
        // Left hand finger is at column (cols - 1 = 74). Distance from tip: (74 - c) / 74.
        // Right hand finger is at column 0. Distance from tip: c / 74.
        const fingerDist = new Float32Array(cols * rows);

        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const p = idx * 4;
            const a = imgData[p + 3] / 255;
            const b = ((imgData[p] * 0.299 + imgData[p + 1] * 0.587 + imgData[p + 2] * 0.114) / 255) * a;
            brightness[idx] = b;
            level[idx] = Math.min(6, Math.floor(b * 7));

            const dX = isLeft ? (cols - 1 - c) / (cols - 1) : c / (cols - 1);
            fingerDist[idx] = dX;
          }
        }

        const levelRgb = LEVEL_COLORS.map(hexToRgb);
        const hoverRgb = hexToRgb("#ffffff");
        const sparkRgb = hexToRgb("#fed7aa"); // Radiant amber/gold spark for active creation wave
        const radiusPx = (22 / 100) * targetW;
        const intensity = 1.0;
        const speed = 0.18;
        const fontSize = Math.max(6, Math.min(cellW, cellH) * 1.05);

        let lastStaticProgress = -1;

        renderFrame = () => {
          const currentReveal = revealProgress.current;

          // -------------------------------------------------------------
          // 1 & 2. Static Layers (Shadows & Midtones) redraw during reveal
          // -------------------------------------------------------------
          if (currentReveal < 1.0 || lastStaticProgress < 1.0) {
            lastStaticProgress = currentReveal;

            // Render Shadows (Levels 1, 2)
            shadowCtx.clearRect(0, 0, targetW, targetH);
            shadowCtx.textAlign = "center";
            shadowCtx.textBaseline = "middle";
            shadowCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const lvl = level[idx];
                if (lvl === 0 || lvl > 2) continue;

                const d = fingerDist[idx];
                if (d > currentReveal + 0.05) continue; // Not yet revealed

                const isWave = d >= currentReveal - 0.15 && currentReveal < 1.0;
                const cx = c * cellW + cellW / 2;
                const cy = r * cellH + cellH / 2;

                if (isWave) {
                  const randCh = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
                  shadowCtx.fillStyle = `rgba(${sparkRgb[0]},${sparkRgb[1]},${sparkRgb[2]},0.7)`;
                  shadowCtx.fillText(randCh, cx, cy);
                } else {
                  const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
                  const ch = ASCII_RAMP[rampIdx];
                  if (ch && ch !== " ") {
                    const rgb = levelRgb[lvl];
                    shadowCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                    shadowCtx.fillText(ch, cx, cy);
                  }
                }
              }
            }

            // Render Midtones (Levels 3, 4)
            midCtx.clearRect(0, 0, targetW, targetH);
            midCtx.textAlign = "center";
            midCtx.textBaseline = "middle";
            midCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

            for (let r = 0; r < rows; r++) {
              for (let c = 0; c < cols; c++) {
                const idx = r * cols + c;
                const lvl = level[idx];
                if (lvl < 3 || lvl > 4) continue;

                const d = fingerDist[idx];
                if (d > currentReveal + 0.05) continue;

                const isWave = d >= currentReveal - 0.15 && currentReveal < 1.0;
                const cx = c * cellW + cellW / 2;
                const cy = r * cellH + cellH / 2;

                if (isWave) {
                  const randCh = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
                  midCtx.fillStyle = `rgba(${sparkRgb[0]},${sparkRgb[1]},${sparkRgb[2]},0.85)`;
                  midCtx.fillText(randCh, cx, cy);
                } else {
                  const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
                  const ch = ASCII_RAMP[rampIdx];
                  if (ch && ch !== " ") {
                    const rgb = levelRgb[lvl];
                    midCtx.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
                    midCtx.fillText(ch, cx, cy);
                  }
                }
              }
            }
          }

          // -------------------------------------------------------------
          // 3. Dynamic Highlight Layer with Hover Glow & Fingertip Wave
          // -------------------------------------------------------------
          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const idx = r * cols + c;
              let target = 0;
              if (stateRef.current.hoverCanvasPos) {
                const cx = c * cellW + cellW / 2;
                const cy = r * cellH + cellH / 2;
                const dist = Math.hypot(cx - stateRef.current.hoverCanvasPos.x, cy - stateRef.current.hoverCanvasPos.y);
                const t = 1 - Math.min(1, dist / radiusPx);
                target = Math.max(0, t) * intensity;
              }
              influence[idx] += (target - influence[idx]) * speed;
              if (Math.abs(influence[idx]) < 0.001) influence[idx] = 0;
            }
          }

          highlightCtx.clearRect(0, 0, targetW, targetH);
          highlightCtx.textAlign = "center";
          highlightCtx.textBaseline = "middle";
          highlightCtx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`;

          for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              const idx = r * cols + c;
              const lvl = level[idx];
              if (lvl < 5) continue;

              const d = fingerDist[idx];
              if (d > currentReveal + 0.05) continue;

              const isWave = d >= currentReveal - 0.15 && currentReveal < 1.0;
              const cx = c * cellW + cellW / 2;
              const cy = r * cellH + cellH / 2;

              if (isWave) {
                const randCh = CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)];
                highlightCtx.fillStyle = "#ffffff";
                highlightCtx.fillText(randCh, cx, cy);
              } else {
                const inf = influence[idx];
                const base = levelRgb[lvl];
                const rgb = inf > 0.001 ? lerpColor(base, hoverRgb, inf) : base;
                const color = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;

                const rampIdx = Math.min(ASCII_RAMP.length - 1, Math.round((lvl / 6) * (ASCII_RAMP.length - 1)));
                const ch = ASCII_RAMP[rampIdx];
                if (ch && ch !== " ") {
                  highlightCtx.fillStyle = color;
                  highlightCtx.fillText(ch, cx, cy);
                }
              }
            }
          }
        };
      };

      return () => {
        if (renderFrame) renderFrame();
      };
    };

    const leftTick = setupHandRenderer(
      "/adam-hands/left-hand.png",
      true,
      leftShadowCanvasRef.current,
      leftMidCanvasRef.current,
      leftHighlightCanvasRef.current,
      leftState
    );

    const rightTick = setupHandRenderer(
      "/adam-hands/right-hand.png",
      false,
      rightShadowCanvasRef.current,
      rightMidCanvasRef.current,
      rightHighlightCanvasRef.current,
      rightState
    );

    const mainLoop = (timestamp: number) => {
      if (!isActive) return;

      // Advance Fingertip Emergence Animation Clock when in view
      if (isInView) {
        if (revealStartTime.current === null) {
          revealStartTime.current = timestamp;
        }
        const elapsed = timestamp - revealStartTime.current;
        const duration = 1400; // 1.4s smooth fingertip-to-wrist emergence
        const t = Math.min(1, elapsed / duration);
        // Cubic ease-out curve
        const eased = 1 - Math.pow(1 - t, 3);
        revealProgress.current = eased;
      }

      if (leftTick) leftTick();
      if (rightTick) rightTick();
      rafId = requestAnimationFrame(mainLoop);
    };

    rafId = requestAnimationFrame(mainLoop);

    return () => {
      isActive = false;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isInView]);

  return (
    <div
      ref={rootRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden bg-[#060608] select-none min-h-[520px] sm:min-h-[600px] flex flex-col justify-between"
    >
      {/* -------------------------------------------------------------
          BOTTOM-ANCHORED DUAL HANDS CONTAINER (Fingertip Emergence Reveal)
          ------------------------------------------------------------- */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none z-10 flex flex-row justify-between items-end pb-8 sm:pb-4 h-[240px] sm:h-[380px] md:h-[460px] px-0">
        {/* LEFT HAND (Fingertip Origin Emergence + 3-Tier Discrete Tonal Parallax) */}
        <div
          ref={leftWrapRef}
          className={`w-[50%] h-full relative flex items-end justify-start pointer-events-none transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
          }`}
        >
          {/* Layer 1: Shadow Plane (Levels 0, 1, 2) */}
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out flex items-end justify-start opacity-90"
            style={{
              transform: `translate3d(${leftOffset.x * 1}px, ${leftOffset.y * 0.8}px, 0) scale(0.995)`,
            }}
          >
            <canvas ref={leftShadowCanvasRef} className="block max-h-full max-w-full object-contain" />
          </div>

          {/* Layer 2: Midtone Plane (Levels 3, 4) */}
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out flex items-end justify-start opacity-95"
            style={{
              transform: `translate3d(${leftOffset.x * 2.2}px, ${leftOffset.y * 1.8}px, 0)`,
            }}
          >
            <canvas ref={leftMidCanvasRef} className="block max-h-full max-w-full object-contain" />
          </div>

          {/* Layer 3: Highlight Plane (Levels 5, 6 + Glow) */}
          <div
            className="w-full h-full relative transition-transform duration-100 ease-out flex items-end justify-start"
            style={{
              transform: `translate3d(${leftOffset.x * 3.8}px, ${leftOffset.y * 2.8}px, 0)`,
            }}
          >
            <canvas
              ref={leftHighlightCanvasRef}
              className="block max-h-full max-w-full object-contain filter drop-shadow-[0_0_24px_rgba(217,83,28,0.25)]"
            />
          </div>
        </div>

        {/* RIGHT HAND (Fingertip Origin Emergence + 3-Tier Discrete Tonal Parallax) */}
        <div
          ref={rightWrapRef}
          className={`w-[50%] h-full relative flex items-end justify-end pointer-events-none transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
          }`}
        >
          {/* Layer 1: Shadow Plane (Levels 0, 1, 2) */}
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out flex items-end justify-end opacity-90"
            style={{
              transform: `translate3d(${rightOffset.x * 1}px, ${rightOffset.y * 0.8}px, 0) scale(0.995)`,
            }}
          >
            <canvas ref={rightShadowCanvasRef} className="block max-h-full max-w-full object-contain" />
          </div>

          {/* Layer 2: Midtone Plane (Levels 3, 4) */}
          <div
            className="absolute inset-0 transition-transform duration-100 ease-out flex items-end justify-end opacity-95"
            style={{
              transform: `translate3d(${rightOffset.x * 2.2}px, ${rightOffset.y * 1.8}px, 0)`,
            }}
          >
            <canvas ref={rightMidCanvasRef} className="block max-h-full max-w-full object-contain" />
          </div>

          {/* Layer 3: Highlight Plane (Levels 5, 6 + Glow) */}
          <div
            className="w-full h-full relative transition-transform duration-100 ease-out flex items-end justify-end"
            style={{
              transform: `translate3d(${rightOffset.x * 3.8}px, ${rightOffset.y * 2.8}px, 0)`,
            }}
          >
            <canvas
              ref={rightHighlightCanvasRef}
              className="block max-h-full max-w-full object-contain filter drop-shadow-[0_0_24px_rgba(217,83,28,0.25)]"
            />
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          FOOTER CONTENT & LINKS OVERLAY (Pass-Through Pointer Events)
          ------------------------------------------------------------- */}
      <div className="relative z-20 w-full flex-1 flex flex-col justify-between pointer-events-none [&_a]:pointer-events-auto [&_button]:pointer-events-auto [&_input]:pointer-events-auto">
        {children}
      </div>
    </div>
  );
}