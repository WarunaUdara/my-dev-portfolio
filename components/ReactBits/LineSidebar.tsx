"use client";

import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
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
  activeItemIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
  maxHeight?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

// Pure JS RGB color interpolation — 100% cross-browser safe
function interpolateColor(color1: string, color2: string, factor: number): string {
  const parseHex = (hex: string): [number, number, number] => {
    let c = hex.replace('#', '').trim();
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    if (isNaN(num)) return [163, 163, 163];
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const c1 = parseHex(color1);
  const c2 = parseHex(color2);
  const f = Math.max(0, Math.min(1, factor));

  const r = Math.round(c1[0] + f * (c2[0] - c1[0]));
  const g = Math.round(c1[1] + f * (c2[1] - c1[1]));
  const b = Math.round(c1[2] + f * (c2[2] - c1[2]));

  return `rgb(${r}, ${g}, ${b})`;
}

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
  'Documentation',
  'Support'
];

export const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#38bdf8',
  textColor = '#a3a3a3',
  markerColor = '#525252',
  showIndex = true,
  showMarker = true,
  proximityRadius = 140,
  maxShift = 32,
  falloff = 'smooth',
  markerLength = 64,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 16,
  fontSize = 0.92,
  smoothing = 70,
  defaultActive = 0,
  activeItemIndex = null,
  onItemClick,
  className = '',
  maxHeight = '52vh'
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const markerRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(activeItemIndex ?? defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(activeItemIndex ?? defaultActive);

  // Controlled active index sync
  useEffect(() => {
    if (activeItemIndex !== null && activeItemIndex !== undefined) {
      setActiveIndex(activeItemIndex);
      activeRef.current = activeItemIndex;
      startLoop();
    }
  }, [activeItemIndex]);

  // Auto-scroll list internal scrollbox to keep active item in view as reader scrolls article
  useEffect(() => {
    if (activeIndex === null) return;
    const list = listRef.current;
    const el = itemRefs.current[activeIndex];
    if (!list || !el) return;

    const elTop = el.offsetTop;
    const elBottom = elTop + el.offsetHeight;
    const viewTop = list.scrollTop;
    const viewBottom = viewTop + list.clientHeight;

    if (elTop < viewTop) {
      list.scrollTo({ top: elTop - 12, behavior: "smooth" });
    } else if (elBottom > viewBottom) {
      list.scrollTo({ top: elBottom - list.clientHeight + 12, behavior: "smooth" });
    }
  }, [activeIndex]);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop — frame-rate independent exponential smoothing
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
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;

      // 1. Line marker dramatic stretch (0.5x -> 1.8x) & color transition
      const markerEl = markerRefs.current[i];
      if (markerEl) {
        const scale = (0.5 + value * 1.3).toFixed(4);
        markerEl.style.transform = `translateY(-50%) scaleX(${scale})`;
        markerEl.style.backgroundColor = interpolateColor(markerColor, accentColor, value);
      }

      // 2. Text move (0px -> maxShift px) & color transition
      const textEl = textRefs.current[i];
      if (textEl) {
        const shift = (value * maxShift).toFixed(2);
        textEl.style.transform = `translateX(${shift}px)`;
        textEl.style.color = interpolateColor(textColor, accentColor, value);
        textEl.style.fontWeight = value > 0.3 ? '600' : '400';
      }

      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, [accentColor, textColor, markerColor, maxShift]);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  // Viewport-relative direct mouse distance calculation — 100% exact
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
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
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
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

  const tickClass = showMarker
    ? `after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.5+var(--effect,0)*0.8))]"
          : 'after:-translate-y-1/2'
      }`
    : '';

  return (
    <nav
      className={`relative flex justify-start${showMarker ? ' [padding-left:calc(var(--marker-length)+var(--marker-gap))]' : ''}${className ? ` ${className}` : ''}`}
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': `${markerLength}px`,
          '--marker-gap': `${markerGap}px`,
          '--tick-scale': tickScale,
          '--max-shift': `${maxShift}px`,
          '--item-gap': `${itemGap}px`,
          '--font-size': `${fontSize}rem`,
          '--smoothing': `${smoothing}ms`
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ maxHeight }}
      >
        {items.map((label, index) => {
          const isActive = activeIndex === index;
          return (
            <li
              key={`${label}-${index}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              aria-current={isActive ? 'true' : undefined}
              onClick={() => handleClick(index, label)}
              className={`relative cursor-pointer select-none before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] ${tickClass}`}
            >
              {showMarker && (
                <span
                  ref={el => {
                    markerRefs.current[index] = el;
                  }}
                  aria-hidden="true"
                  className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left pointer-events-none"
                  style={{
                    backgroundColor: isActive ? accentColor : markerColor,
                    transform: isActive ? 'translateY(-50%) scaleX(1.8)' : 'translateY(-50%) scaleX(0.5)'
                  }}
                />
              )}
              <span
                ref={el => {
                  textRefs.current[index] = el;
                }}
                className="relative inline-flex items-baseline leading-[1.2] [font-size:var(--font-size)] font-sans"
                style={{
                  color: isActive ? accentColor : textColor,
                  fontWeight: isActive ? 600 : 400,
                  transform: isActive ? `translateX(${maxShift}px)` : 'translateX(0px)'
                }}
              >
                {showIndex && (
                  <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <span className="truncate max-w-[480px] block">{label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LineSidebar;