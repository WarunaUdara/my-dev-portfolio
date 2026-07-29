import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';
type MarkerPosition = 'left' | 'right';

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
  activeItemIndex?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase'
];

export const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#38bdf8',
  textColor = '#a3a3a3',
  markerColor = '#525252',
  showIndex = true,
  showMarker = true,
  markerPosition = 'right', // Swapped to right side as requested
  proximityRadius = 100,
  maxShift = 20,
  falloff = 'smooth',
  markerLength = 36,
  markerGap = 12,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 14,
  fontSize = 0.85,
  smoothing = 100,
  defaultActive = null,
  activeItemIndex = null,
  onItemClick,
  className = ''
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(activeItemIndex ?? defaultActive);
  const activeRef = useRef<number | null>(activeIndex);
  const smoothingRef = useRef(smoothing);

  useEffect(() => {
    if (activeItemIndex !== null && activeItemIndex !== undefined) {
      setActiveIndex(activeItemIndex);
    }
  }, [activeItemIndex]);

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
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
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
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const itemEls = itemRefs.current;
      for (let i = 0; i < itemEls.length; i++) {
        const el = itemEls[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
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

  const isRight = markerPosition === 'right';

  const tickClass = showMarker
    ? `after:absolute ${
        isRight
          ? 'after:right-[calc(-1*var(--marker-length)-var(--marker-gap))] after:origin-right'
          : 'after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:origin-left'
      } after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] ${
        scaleTick
          ? 'after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]'
          : 'after:-translate-y-1/2'
      }`
    : '';

  return (
    <nav
      className={`relative flex ${isRight ? 'justify-end [padding-right:calc(var(--marker-length)+var(--marker-gap))]' : 'justify-start [padding-left:calc(var(--marker-length)+var(--marker-gap))]'}${className ? ` ${className}` : ''}`}
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
        className={`m-0 flex list-none flex-col py-4 [gap:var(--item-gap)] ${isRight ? 'items-end text-right' : 'items-start text-left'}`}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
            className={`relative cursor-pointer select-none before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] ${tickClass}`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className={`absolute ${
                  isRight
                    ? 'right-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-right'
                    : 'left-[calc(-1*var(--marker-length)-var(--marker-gap))] origin-left'
                } top-1/2 h-px w-[length:var(--marker-length)] [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]`}
              />
            )}
            <span
              className={`relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] ${
                isRight
                  ? '[transform:translateX(calc(-1*var(--effect,0)*var(--max-shift)))]'
                  : '[transform:translateX(calc(var(--effect,0)*var(--max-shift)))]'
              }`}
            >
              {showIndex && (
                <span className={`${isRight ? 'ml-[0.6rem] order-last' : 'mr-[0.6rem]'} font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]`}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span className="line-clamp-1 font-sans font-medium">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
