"use client";

import { useRef, useState, useCallback, useEffect, CSSProperties } from "react";

type Falloff = "linear" | "smooth" | "sharp";
type MarkerPosition = "left" | "right";

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  markerPosition?: MarkerPosition;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  /** Controlled active index (e.g. driven by a scroll-spy in the parent). */
  activeItemIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
  maxHeight?: string | null;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: (p) => p,
  smooth: (p) => p * p * (3 - 2 * p),
  sharp: (p) => p * p * p,
};

export const LineSidebar = ({
  items = [],
  accentColor = "#38bdf8",
  textColor = "#a3a3a3",
  markerColor = "#525252",
  showIndex = true,
  showMarker = true,
  markerPosition = "right",
  proximityRadius = 100,
  maxShift = 24,
  falloff = "smooth",
  markerLength = 48,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.9,
  smoothing = 80,
  defaultActive = 0,
  activeItemIndex = null,
  onItemClick,
  className = "",
  maxHeight = "60vh",
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef(smoothing);
  const skipAutoScrollRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(
    activeItemIndex ?? defaultActive
  );

  useEffect(() => {
    if (activeItemIndex !== null && activeItemIndex !== undefined) {
      setActiveIndex(activeItemIndex);
    }
  }, [activeItemIndex]);

  useEffect(() => {
    targetsRef.current = items.map((_, i) => targetsRef.current[i] ?? 0);
    currentRef.current = items.map((_, i) => currentRef.current[i] ?? 0);
  }, [items.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    if (skipAutoScrollRef.current) {
      skipAutoScrollRef.current = false;
      return;
    }
    const list = listRef.current;
    const el = itemRefs.current[activeIndex];
    if (!list || !el) return;

    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (elTop < viewTop) {
      list.scrollTo({ top: elTop - 8, behavior: "smooth" });
    } else if (elBottom > viewBottom) {
      list.scrollTo({ top: elBottom - list.clientHeight + 8, behavior: "smooth" });
    }
  }, [activeIndex]);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const itemEls = itemRefs.current;
    for (let i = 0; i < itemEls.length; i++) {
      const el = itemEls[i];
      if (!el) continue;
      const target = Math.max(
        targetsRef.current[i] || 0,
        activeRef.current === i ? 1 : 0
      );
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty("--effect", value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      if (e.pointerType === "touch") return;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const itemEls = itemRefs.current;
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i];
        if (!el) continue;
        const elRect = el.getBoundingClientRect();
        const center = elRect.top + elRect.height / 2;
        const distance = Math.abs(e.clientY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      skipAutoScrollRef.current = true;
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLLIElement>, index: number, label: string) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick(index, label);
      }
    },
    [handleClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  if (items.length === 0) return null;

  const isRight = markerPosition === "right";

  const tickClass = showMarker
    ? `after:absolute ${
        isRight
          ? "after:right-[calc(-1*var(--marker-length)-var(--marker-gap))] after:origin-right"
          : "after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:origin-left"
      } after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-40 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? `after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]`
          : "after:-translate-y-1/2"
      }`
    : "";

  return (
    <nav
      aria-label="Table of contents"
      className={`relative flex ${
        isRight
          ? "justify-end [padding-right:calc(var(--marker-length)+var(--marker-gap))]"
          : "justify-start [padding-left:calc(var(--marker-length)+var(--marker-gap))]"
      }${className ? ` ${className}` : ""}`}
      style={
        {
          "--accent-color": accentColor,
          "--text-color": textColor,
          "--marker-color": markerColor,
          "--marker-length": `${markerLength}px`,
          "--marker-gap": `${markerGap}px`,
          "--tick-scale": tickScale,
          "--max-shift": `${maxShift}px`,
          "--item-gap": `${itemGap}px`,
          "--font-size": `${fontSize}rem`,
          "--smoothing": `${smoothing}ms`,
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`m-0 flex list-none flex-col py-3 [gap:var(--item-gap)] overflow-y-auto overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isRight ? "text-right" : "text-left"
        }`}
        style={maxHeight ? { maxHeight } : undefined}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
            onKeyDown={(e) => handleKeyDown(e, index, label)}
            className={`relative cursor-pointer select-none outline-none before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] focus-visible:[text-shadow:0_0_0_1px_var(--accent-color)] ${tickClass}`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute top-1/2 h-px w-[length:var(--marker-length)] ${
                  isRight
                    ? "right-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-right"
                    : "left-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-left"
                } [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]`}
              />
            )}
            <span
              className={`relative inline-flex items-baseline leading-[1.3] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] ${
                isRight
                  ? "[transform:translateX(calc(var(--effect,0)*-1*var(--max-shift)))]"
                  : "[transform:translateX(calc(var(--effect,0)*var(--max-shift)))]"
              } will-change-transform font-sans`}
            >
              {!isRight && showIndex && (
                <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
              <span className="truncate max-w-[320px] block font-medium">{label}</span>
              {isRight && showIndex && (
                <span className="ml-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;