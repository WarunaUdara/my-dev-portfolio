/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import createGlobe, { COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const MOVEMENT_DAMPING = 1000; // Adjusted for more responsive rotation

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 1.5, // Reduced for better mobile performance
  phi: 0,
  theta: 0.3,
  dark: 1.0,
  diffuse: 1.2,
  mapSamples: 12000, // Reduced for better mobile performance
  mapBrightness: 6,
  baseColor: [0.1, 0.15, 0.8],
  markerColor: [0.3, 0.8, 1],
  glowColor: [0.2, 0.4, 0.8],
  markers: [
    // Sri Lanka highlighted
    { location: [7.8731, 80.7718], size: 0.05 },
    // Other locations
    // { location: [14.5995, 120.9842], size: 0.03 },
    // { location: [19.076, 72.8777], size: 0.05 },
    // { location: [23.8103, 90.4125], size: 0.05 },
    // { location: [30.0444, 31.2357], size: 0.05 },
    // { location: [39.9042, 116.4074], size: 0.06 },
    // { location: [-23.5505, -46.6333], size: 0.05 },
    // { location: [19.4326, -99.1332], size: 0.05 },
    // { location: [40.7128, -74.006], size: 0.06 },
    // { location: [34.6937, 135.5022], size: 0.05 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const phiRef = useRef(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(false);
  const globeInstanceRef = useRef<any>(null);
  const frameId = useRef<number | null>(null);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  // Ensure we only render on client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Detect device type and viewport size
  const getDeviceConfig = () => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    
    return {
      devicePixelRatio: isMobile ? 0.8 : isTablet ? 1.2 : config.devicePixelRatio,
      mapSamples: isMobile ? 8000 : isTablet ? 10000 : config.mapSamples,
      scale: isMobile ? 0.9 : isTablet ? 0.95 : 1,
    };
  };

  // Initialize and cleanup the globe instance
  useEffect(() => {
    if (!isClient || dimensions.width === 0) return;
    
    // Avoid running the effect if no canvas ref
    if (!canvasRef.current) return;

    // Adjust config for device
    const deviceSettings = getDeviceConfig();
    const adjustedConfig = {
      ...config,
      devicePixelRatio: deviceSettings.devicePixelRatio,
      mapSamples: deviceSettings.mapSamples,
    };

    try {
      // Create the globe instance
      globeInstanceRef.current = createGlobe(canvasRef.current, {
        ...adjustedConfig,
        width: dimensions.width * 2,
        height: dimensions.height * 2,
        onRender: (state) => {
          // Removed auto-rotation: if (!pointerInteracting.current) phiRef.current += 0.005;
          state.phi = phiRef.current + rs.get();
          state.width = dimensions.width * 2;
          state.height = dimensions.height * 2;
        },
      });

      // Make the globe visible with a fade-in effect
      setTimeout(() => {
        if (canvasRef.current) {
          canvasRef.current.style.opacity = "1";
        }
      }, 200);
    } catch (err) {
      console.error("Error creating globe:", err);
      setError(true);
    }

    // Cleanup function
    return () => {
      if (globeInstanceRef.current && typeof globeInstanceRef.current.destroy === 'function') {
        globeInstanceRef.current.destroy();
      }
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
        frameId.current = null;
      }
    };
  }, [rs, config, dimensions.width, dimensions.height, isClient]);

  // Handle resize and initial size calculation
  useEffect(() => {
    if (!isClient) return;

    const resizeCanvas = () => {
      if (containerRef.current) {
        // Get the current dimensions
        const rect = containerRef.current.getBoundingClientRect();
        const newWidth = Math.floor(rect.width);
        const newHeight = Math.floor(rect.height);
        
        // Only update if there's a meaningful change to avoid unnecessary re-renders
        if (
          Math.abs(newWidth - dimensions.width) > 5 || 
          Math.abs(newHeight - dimensions.height) > 5
        ) {
          setDimensions({ width: newWidth, height: newHeight });
        }
        
        // Make sure the canvas is properly sized for the container
        if (canvasRef.current) {
          canvasRef.current.style.width = `${newWidth}px`;
          canvasRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    // Set initial size immediately
    resizeCanvas();
    
    // Then set up a resize observer for dynamic adjustments
    const observer = new ResizeObserver(() => {
      // Use requestAnimationFrame to debounce and avoid too many updates
      if (frameId.current === null) {
        frameId.current = requestAnimationFrame(() => {
          resizeCanvas();
          frameId.current = null;
        });
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Also handle window resize events for good measure
    window.addEventListener('resize', resizeCanvas);
    
    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [isClient, dimensions.width, dimensions.height]);

  // Display fallback for non-client rendering or errors
  if (!isClient || error) {
    return (
      <div className={cn(
        "absolute inset-0 flex items-center justify-center bg-blue-900/20 rounded-lg",
        className
      )}>
        <div className="text-white text-sm sm:text-base text-center p-4">
          {error ? "Unable to load 3D globe" : "Loading interactive globe..."}
        </div>
      </div>
    );
  }

  // Determine scale based on device
  const scale = isClient ? getDeviceConfig().scale : 1;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        className,
      )}
    >
      <canvas
        className={cn(
          "w-full h-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
          // Use pointer capture for better touch interaction
          canvasRef.current?.setPointerCapture(e.pointerId);
        }}
        onPointerUp={(e) => {
          updatePointerInteraction(null);
          canvasRef.current?.releasePointerCapture(e.pointerId);
        }}
        onPointerOut={() => updatePointerInteraction(null)}
        onPointerCancel={() => updatePointerInteraction(null)}
        onPointerMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        style={{ 
          touchAction: 'none',  // Prevents browser default touch actions
          transform: `scale(${scale})` // Apply proper scaling based on device
        }}
      />
    </div>
  );
}