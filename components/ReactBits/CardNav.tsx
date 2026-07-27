"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "@/components/ui/Link";
import { IconArrowUpRight, IconMenu2, IconX } from "@tabler/icons-react";

export type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
  isExternal?: boolean;
};

export type CardNavItem = {
  label: string;
  bgColor: string;
  textColor: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  items?: CardNavItem[];
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

const DEFAULT_ITEMS: CardNavItem[] = [
  {
    label: "Navigation",
    bgColor: "#121215",
    textColor: "#ffffff",
    links: [
      { label: "Home", href: "/", ariaLabel: "Home Page" },
      { label: "About Me", href: "/about", ariaLabel: "About Me Page" },
      { label: "Projects", href: "/#projects", ariaLabel: "Featured Projects" },
    ],
  },
  {
    label: "Explore",
    bgColor: "#18181c",
    textColor: "#ffffff",
    links: [
      { label: "Guestbook", href: "/guestbook", ariaLabel: "Guestbook Page" },
      { label: "Bucket List", href: "/bucket-list", ariaLabel: "Bucket List Page" },
      { label: "Uses / Tools", href: "/uses", ariaLabel: "Uses Page" },
    ],
  },
  {
    label: "Connect",
    bgColor: "#202026",
    textColor: "#ffffff",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/waruna-udara/", ariaLabel: "LinkedIn Profile", isExternal: true },
      { label: "GitHub", href: "https://github.com/WarunaUdara", ariaLabel: "GitHub Profile", isExternal: true },
      { label: "Links", href: "/links", ariaLabel: "All Links" },
    ],
  },
];

export const CardNav: React.FC<CardNavProps> = ({
  logo = "/logo.svg",
  logoAlt = "Waruna Udara",
  items = DEFAULT_ITEMS,
  className = "",
  ease = "power3.out",
  baseColor = "#09090b",
  menuColor = "#ffffff",
  buttonBgColor = "#ffffff",
  buttonTextColor = "#000000",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 260;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease, stagger: 0.08 },
      "-=0.1"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isExpanded]);

  const openMenu = () => {
    const tl = tlRef.current;
    if (!tl || isExpanded) return;
    setIsHamburgerOpen(true);
    setIsExpanded(true);
    tl.play(0);
  };

  const closeMenu = () => {
    const tl = tlRef.current;
    if (!tl || !isExpanded) return;
    setIsHamburgerOpen(false);
    tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
    tl.reverse();
  };

  const toggleMenu = () => {
    if (!isExpanded) openMenu();
    else closeMenu();
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[840px] z-[999] top-[1.2em] md:top-[1.8em] ${className}`}
      onMouseEnter={openMenu}
      onMouseLeave={closeMenu}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""} block h-[60px] p-0 rounded-2xl border border-neutral-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden will-change-[height] backdrop-blur-xl`}
        style={{ backgroundColor: baseColor }}
      >
        <div className="card-nav-top absolute inset-x-0 top-0 h-[60px] flex items-center justify-between p-2 px-5 z-[2]">
          {/* Hamburger / Hover Trigger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""} group h-full flex items-center justify-center cursor-pointer gap-2 order-2 md:order-none`}
            onClick={toggleMenu}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleMenu();
              }
            }}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            aria-expanded={isExpanded}
            tabIndex={0}
            style={{ color: menuColor || "#fff" }}
          >
            <div className="flex flex-col gap-[5px]">
              <div
                className={`w-[24px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${
                  isHamburgerOpen ? "translate-y-[7px] rotate-45" : ""
                } group-hover:opacity-80`}
              />
              <div
                className={`w-[24px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${
                  isHamburgerOpen ? "-translate-y-[0px] -rotate-45" : ""
                } group-hover:opacity-80`}
              />
            </div>
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-300 font-semibold ml-1">
              {isExpanded ? "Close" : "Menu"}
            </span>
          </div>

          {/* Logo */}
          <Link href="/" className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <img src={logo} alt={logoAlt} className="logo h-[26px] object-contain" />
          </Link>

          {/* CTA Button */}
          <a
            href="https://www.linkedin.com/in/waruna-udara/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-nav-cta-button hidden md:inline-flex rounded-xl px-4 items-center justify-center h-[42px] font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Connect
          </a>
        </div>

        {/* Expanded Cards Content */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-2 flex flex-col items-stretch gap-2 justify-start z-[1] ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[10px]`}
          aria-hidden={!isExpanded}
        >
          {(items || []).slice(0, 3).map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="nav-card select-none relative flex flex-col gap-2 p-[16px_20px] rounded-xl border border-neutral-800/60 min-w-0 flex-[1_1_auto] h-auto min-h-[60px] md:h-full md:min-h-0 md:flex-[1_1_0%]"
              ref={setCardRef(idx)}
              style={{ backgroundColor: item.bgColor, color: item.textColor }}
            >
              <div className="nav-card-label font-serif italic text-lg sm:text-xl font-bold tracking-wide border-b border-neutral-800/80 pb-1">
                {item.label}
              </div>
              <div className="nav-card-links mt-auto flex flex-col gap-1.5 pt-2">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={`${lnk.label}-${i}`}
                    className="nav-card-link inline-flex items-center justify-between no-underline cursor-pointer transition-colors duration-200 hover:text-blue-400 text-xs sm:text-sm font-sans"
                    href={lnk.href}
                    aria-label={lnk.ariaLabel}
                    onClick={closeMenu}
                  >
                    <span>{lnk.label}</span>
                    <IconArrowUpRight className="w-3.5 h-3.5 shrink-0 opacity-70" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
