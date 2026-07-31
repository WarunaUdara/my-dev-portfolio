"use client";

import React, { useEffect, useRef, useId } from "react";
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
  { id: "dubai", label: "DUBAI", location: [25.2048, 55.2708], size: 0.035 },
  { id: "paris", label: "PARIS", location: [48.8566, 2.3522], size: 0.035 }
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

  // Unique, CSS-safe prefix so multiple <Globe /> instances on the same
  // page never collide on COBE's anchor names (--cobe-<id> must be unique
  // document-wide, since anchor positioning works across the whole DOM).
  const rawId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const uid = `g${rawId}`;

  // Markers with instance-prefixed ids. These ids are what COBE turns into
  // --cobe-{id} (anchor point) and --cobe-visible-{id} (0/1 visibility),
  // computed internally by COBE from its real projection — not by us.
  const prefixedMarkers = markers.map((m) => ({ ...m, id: `${uid}-${m.id}` }));

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

    const localPrefixedMarkers = markers.map((m) => ({ ...m, id: `${uid}-${m.id}` }));

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
      baseColor: [0.15, 0.15, 0.2],
      markerColor: [0.35, 0.65, 1.0],
      glowColor: [0.95, 0.95, 1.0],
      markers: localPrefixedMarkers.map((m) => ({
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
      arcWidth: 0.5,
      arcHeight: 0.35,
    });

    let animationFrameId: number;

    const animate = () => {
      if (!pointerInteracting.current) {
        phiRef.current += speed;
      }
      const currentPhi = phiRef.current + pointerInteractionMovement.current;

      globe.update({
        phi: currentPhi,
        theta: thetaVal,
        width: width * 2,
        height: width * 2,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    if (canvasRef.current) {
      canvasRef.current.style.opacity = "1";
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [markers, arcs, speed, uid]);

  // Per-marker CSS: bind each label to the exact anchor COBE exposes for
  // it, and mirror COBE's own visibility variable so a label only shows
  // when its dot is actually facing the camera.
  const anchorCss = prefixedMarkers
    .map(
      (m) => `
        [data-cobe-label="${m.id}"] {
          position-anchor: --cobe-${m.id};
          --cobe-opacity: var(--cobe-visible-${m.id}, 0);
        }
      `
    )
    .join("\n");

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto aspect-square w-full max-w-[600px]", className)}
    >
      <style>{`
        ${anchorCss}

        @supports (anchor-name: --test) {
          .cobe-marker-label {
            position: absolute;
            bottom: anchor(top);
            left: anchor(center);
            transform: translateX(-50%);
            display: flex;
            opacity: var(--cobe-opacity, 0);
            transition: opacity 0.25s ease;
          }
        }

        @supports not (anchor-name: --test) {
          .cobe-marker-label {
            display: none;
          }
        }
      `}</style>

      <canvas
        ref={canvasRef}
        className="h-full w-full opacity-100 transition-opacity duration-500 [contain:layout_paint_size] cursor-grab active:cursor-grabbing"
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

      {/* Labels bind to COBE's own --cobe-{id} anchor + --cobe-visible-{id}
          visibility var via CSS Anchor Positioning — no manual projection
          math, so they can't drift from the actual marker dot. */}
      {prefixedMarkers.map((m) => (
        <div
          key={m.id}
          data-cobe-label={m.id}
          className="cobe-marker-label pointer-events-none flex-col items-center z-20"
        >
          <div
            className="bg-white/95 text-[#0a0a0a] font-mono leading-none tracking-wider px-1.5 py-[3px] shadow-md border border-white/80 flex items-center gap-1"
            style={{ fontSize: "9px", fontWeight: 700 }}
          >
            <span className="inline-block w-[5px] h-[5px] bg-blue-500 flex-shrink-0"></span>
            {m.label}
          </div>
          <div className="w-[1px] h-[6px] bg-white/70"></div>
        </div>
      ))}
    </div>
  );
}

export default Globe;