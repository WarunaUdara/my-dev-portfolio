"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import createGlobe from "cobe";
import { cn } from "@/lib/utils";

export interface GlobeMarker {
  id: string;
  label: string;
  location: [number, number]; // [lat, lon]
  size?: number;
}

export interface GlobeArc {
  from: [number, number];
  to: [number, number];
  color?: [number, number, number];
}

const DEFAULT_MARKERS: GlobeMarker[] = [
  { id: "colombo", label: "SRI LANKA", location: [6.9271, 79.8612], size: 0.04 },
  { id: "london", label: "LONDON", location: [51.5074, -0.1278], size: 0.03 },
  { id: "dubai", label: "DUBAI", location: [25.2048, 55.2708], size: 0.03 },
  { id: "tokyo", label: "TOKYO", location: [35.6762, 139.6503], size: 0.03 },
];

const DEFAULT_ARCS: GlobeArc[] = [
  { from: [6.9271, 79.8612], to: [51.5074, -0.1278] }, // Colombo -> London
  { from: [6.9271, 79.8612], to: [25.2048, 55.2708] },  // Colombo -> Dubai
  { from: [6.9271, 79.8612], to: [35.6762, 139.6503] }, // Colombo -> Tokyo
];

interface GlobeProps {
  className?: string;
  markers?: GlobeMarker[];
  arcs?: GlobeArc[];
  speed?: number;
}

export function Globe({
  className,
  markers = DEFAULT_MARKERS,
  arcs = DEFAULT_ARCS,
  speed = 0.003,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0.8);
  const thetaRef = useRef(0.25);

  const [labelPositions, setLabelPositions] = useState<
    Array<{ id: string; label: string; percentX: number; percentY: number; opacity: number }>
  >([]);

  // Project 3D lat/lon to 2D percentage coordinates on canvas
  const calculatePositions = useCallback(
    (phi: number, theta: number) => {
      // COBE sphere radius factor is ~0.385 of total canvas width
      const r = 0.385;

      const positions = markers.map((m) => {
        const [lat, lon] = m.location;
        const latRad = (lat * Math.PI) / 180;
        const lonRad = (lon * Math.PI) / 180;

        // 1. 3D coordinates on unit sphere
        const x0 = Math.cos(latRad) * Math.sin(lonRad + phi);
        const y0 = Math.sin(latRad);
        const z0 = Math.cos(latRad) * Math.cos(lonRad + phi);

        // 2. Rotate by theta tilt around X-axis
        const x = x0;
        const y = y0 * Math.cos(theta) - z0 * Math.sin(theta);
        const z = y0 * Math.sin(theta) + z0 * Math.cos(theta);

        // 3. Screen percentage relative to center (50%, 50%)
        const percentX = 50 + x * r * 100;
        const percentY = 50 - y * r * 100;

        // 4. Front hemisphere visibility & smooth fade
        const opacity = z > 0.15 ? Math.min(1, (z - 0.15) * 4) : 0;

        return {
          id: m.id,
          label: m.label,
          percentX,
          percentY,
          opacity,
        };
      });

      setLabelPositions(positions);
    },
    [markers]
  );

  useEffect(() => {
    let width = 0;
    let currentPhi = phiRef.current;

    const onResize = () => {
      if (containerRef.current) {
        width = containerRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current || width === 0) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: currentPhi,
      theta: thetaRef.current,
      dark: 1,
      diffuse: 1.3,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.1, 0.12, 0.25],
      markerColor: [0.35, 0.65, 1.0],
      glowColor: [0.15, 0.25, 0.5],
      markers: markers.map((m) => ({
        location: m.location,
        size: m.size || 0.035,
        id: m.id,
      })),
      arcs: arcs.map((a) => ({
        from: a.from,
        to: a.to,
        color: a.color || [0.35, 0.65, 1.0],
      })),
      arcColor: [0.35, 0.65, 1.0],
      arcWidth: 0.45,
      arcHeight: 0.35,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          currentPhi += speed;
          phiRef.current = currentPhi;
        } else {
          currentPhi = phiRef.current + pointerInteractionMovement.current;
        }
        state.phi = currentPhi;
        state.theta = thetaRef.current;
        state.width = width * 2;
        state.height = width * 2;

        calculatePositions(currentPhi, thetaRef.current);
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers, arcs, speed, calculatePositions]);

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-square w-full max-w-[600px]", className)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-0 transition-opacity duration-700 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          pointerInteractionMovement.current = 0;
        }}
        onPointerUp={() => {
          if (pointerInteracting.current !== null) {
            phiRef.current += pointerInteractionMovement.current;
            pointerInteracting.current = null;
            pointerInteractionMovement.current = 0;
          }
        }}
        onPointerOut={() => {
          if (pointerInteracting.current !== null) {
            phiRef.current += pointerInteractionMovement.current;
            pointerInteracting.current = null;
            pointerInteractionMovement.current = 0;
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = (e.clientX - pointerInteracting.current) / 300;
            pointerInteractionMovement.current = delta;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = (e.touches[0].clientX - pointerInteracting.current) / 300;
            pointerInteractionMovement.current = delta;
          }
        }}
      />

      {/* Dynamic Anchored Marker Labels (Percent-based coordinates matching WebGL canvas) */}
      {labelPositions.map((pos) => (
        <div
          key={pos.id}
          className="absolute pointer-events-none transition-opacity duration-300 transform -translate-x-1/2 -translate-y-full mb-1 flex flex-col items-center"
          style={{
            left: `${pos.percentX}%`,
            top: `${pos.percentY}%`,
            opacity: pos.opacity,
            zIndex: pos.opacity > 0.5 ? 25 : 10,
          }}
        >
          {/* Label Badge matching reference image */}
          <div className="bg-white text-gray-950 font-mono text-[10px] sm:text-xs font-bold tracking-wide px-2 py-0.5 rounded shadow-lg flex items-center gap-1.5 border border-white/90">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            <span>{pos.label}</span>
          </div>

          {/* Pointer line to marker dot */}
          <div className="w-0.5 h-2 bg-white/80"></div>
        </div>
      ))}
    </div>
  );
}