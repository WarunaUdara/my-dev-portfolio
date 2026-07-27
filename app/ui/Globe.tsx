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
  { id: "colombo", label: "SRI LANKA", location: [7.8731, 80.7718], size: 0.05 },
  { id: "london", label: "LONDON", location: [51.5074, -0.1278], size: 0.035 },
  { id: "dubai", label: "DUBAI", location: [25.2048, 55.2708], size: 0.035 },
  { id: "tokyo", label: "TOKYO", location: [35.6762, 139.6503], size: 0.035 },
  { id: "sf", label: "SAN FRANCISCO", location: [37.78, -122.44], size: 0.035 },
];

const DEFAULT_ARCS: GlobeArc[] = [
  { from: [7.8731, 80.7718], to: [51.5074, -0.1278] },
  { from: [7.8731, 80.7718], to: [25.2048, 55.2708] },
  { from: [7.8731, 80.7718], to: [35.6762, 139.6503] },
  { from: [7.8731, 80.7718], to: [37.78, -122.44] },
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
  const thetaVal = 0.2;

  const [labelPositions, setLabelPositions] = useState<
    Array<{ id: string; label: string; px: number; py: number; opacity: number }>
  >([]);

  // Cobe projects the globe with a visual radius of ~43.5% of canvas size.
  // Longitude is applied as -(lon + phi) internally.
  const projectMarkers = useCallback(
    (phi: number, theta: number, containerWidth: number) => {
      const R = containerWidth * 0.435;
      const cx = containerWidth / 2;
      const cy = containerWidth / 2;

      const positions = markers.map((m) => {
        const [lat, lon] = m.location;
        const latRad = (lat * Math.PI) / 180;
        const lonRad = (lon * Math.PI) / 180;

        // Cobe internal: longitude offset is -(lon + phi)
        const adjustedLon = lonRad + phi;

        // Spherical to Cartesian
        const sx = Math.cos(latRad) * Math.sin(adjustedLon);
        const sy = Math.sin(latRad);
        const sz = Math.cos(latRad) * Math.cos(adjustedLon);

        // Theta rotation around X-axis (tilt)
        const rx = sx;
        const ry = sy * Math.cos(theta) - sz * Math.sin(theta);
        const rz = sy * Math.sin(theta) + sz * Math.cos(theta);

        // Orthographic projection
        const px = cx + rx * R;
        const py = cy - ry * R;

        // Visibility: front face only, with smooth fade
        const opacity = rz > 0.1 ? Math.min(1, (rz - 0.1) * 5) : 0;

        return { id: m.id, label: m.label, px, py, opacity };
      });

      setLabelPositions(positions);
    },
    [markers]
  );

  useEffect(() => {
    let width = 0;

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
      phi: phiRef.current,
      theta: thetaVal,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [1, 1, 1],
      markerColor: [0.4, 0.6, 1.0],
      glowColor: [1, 1, 1],
      markers: markers.map((m) => ({
        location: m.location,
        size: m.size || 0.035,
        id: m.id,
      })),
      arcs: arcs.map((a) => ({
        from: a.from,
        to: a.to,
        color: a.color || [0.4, 0.6, 1.0],
      })),
      arcColor: [0.4, 0.6, 1.0],
      arcWidth: 0.5,
      arcHeight: 0.35,
      onRender: (state) => {
        if (!pointerInteracting.current) {
          phiRef.current += speed;
        }
        const currentPhi = phiRef.current + pointerInteractionMovement.current;
        state.phi = currentPhi;
        state.theta = thetaVal;
        state.width = width * 2;
        state.height = width * 2;

        projectMarkers(currentPhi, thetaVal, width);
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
  }, [markers, arcs, speed, projectMarkers]);

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-square w-full max-w-[600px]", className)}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full transition-opacity duration-700 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
        }}
        onPointerUp={() => {
          if (pointerInteracting.current !== null) {
            phiRef.current += pointerInteractionMovement.current;
            pointerInteracting.current = null;
            pointerInteractionMovement.current = 0;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }
        }}
        onPointerOut={() => {
          if (pointerInteracting.current !== null) {
            phiRef.current += pointerInteractionMovement.current;
            pointerInteracting.current = null;
            pointerInteractionMovement.current = 0;
            if (canvasRef.current) canvasRef.current.style.cursor = "grab";
          }
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = (e.clientX - pointerInteracting.current) / 200;
            pointerInteractionMovement.current = delta;
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = (e.touches[0].clientX - pointerInteracting.current) / 200;
            pointerInteractionMovement.current = delta;
          }
        }}
      />

      {/* Anchored marker labels — small, sharp-edged boxes */}
      {labelPositions.map((pos) => (
        <div
          key={pos.id}
          className="absolute pointer-events-none flex flex-col items-center"
          style={{
            left: `${pos.px}px`,
            top: `${pos.py}px`,
            transform: "translate(-50%, -100%)",
            opacity: pos.opacity,
            transition: "opacity 0.25s ease",
            zIndex: pos.opacity > 0.5 ? 25 : 10,
          }}
        >
          {/* Sharp-edge label box */}
          <div
            className="bg-white/95 text-[#0a0a0a] font-mono leading-none tracking-wider px-1.5 py-[3px] shadow-md border border-white/80 flex items-center gap-1"
            style={{ fontSize: "9px", fontWeight: 700 }}
          >
            <span className="inline-block w-[5px] h-[5px] bg-blue-500 flex-shrink-0"></span>
            {pos.label}
          </div>

          {/* Thin connector line */}
          <div className="w-[1px] h-[6px] bg-white/70"></div>
        </div>
      ))}
    </div>
  );
}