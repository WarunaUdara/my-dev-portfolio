"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Link from "@/components/ui/Link";
import Image from "@/components/ui/Image";
import { IconArrowUpRight, IconLink, IconPhoto, IconMapPin } from "@tabler/icons-react";

export interface CardNavProps {
  logo?: string;
  logoAlt?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  menuColor?: string;
  buttonBgColor?: string;
  buttonTextColor?: string;
}

export const CardNav: React.FC<CardNavProps> = ({
  logo = "/logo.svg",
  logoAlt = "Waruna Udara",
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
    if (!navEl) return 300;

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
    return 300;
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
  }, [ease]);

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
      className={`card-nav-container fixed left-1/2 -translate-x-1/2 w-[92%] max-w-[840px] z-[9999] top-[1.2em] md:top-[1.8em] ${className}`}
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
                className={`w-[22px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${
                  isHamburgerOpen ? "translate-y-[7px] rotate-45" : ""
                } group-hover:opacity-80`}
              />
              <div
                className={`w-[22px] h-[2px] bg-current transition-all duration-300 ease-out origin-center ${
                  isHamburgerOpen ? "-translate-y-[0px] -rotate-45" : ""
                } group-hover:opacity-80`}
              />
            </div>
            <span className="text-xs font-mono tracking-wider uppercase text-neutral-300 font-semibold ml-1">
              {isExpanded ? "Close" : "Menu"}
            </span>
          </div>

          {/* Logo Brand Title */}
          <Link href="/" className="logo-container flex items-center gap-2 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 order-1 md:order-none">
            <span className="font-serif font-bold text-lg sm:text-xl text-white tracking-wide">
              Waruna Udara
            </span>
          </Link>

          {/* CTA Button */}
          <a
            href="https://www.linkedin.com/in/waruna-udara/"
            target="_blank"
            rel="noopener noreferrer"
            className="card-nav-cta-button hidden md:inline-flex rounded-xl px-4 items-center justify-center h-[40px] font-sans text-xs uppercase tracking-wider font-semibold cursor-pointer transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: buttonBgColor, color: buttonTextColor }}
          >
            Connect
          </a>
        </div>

        {/* Expanded Cards Content with Exact Original Images & Links */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-[60px] bottom-0 p-3 flex flex-col items-stretch gap-3 justify-start z-[1] ${
            isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
          } md:flex-row md:items-end md:gap-[12px]`}
          aria-hidden={!isExpanded}
        >
          {/* Card 1: Guestbook Image Card */}
          <div
            ref={setCardRef(0)}
            className="nav-card relative overflow-hidden rounded-xl border border-neutral-800 flex-[1_1_auto] md:flex-[1_1_0%] h-52 md:h-full group cursor-pointer"
          >
            <Link href="/guestbook" onClick={closeMenu} className="absolute inset-0 block">
              <Image
                src="/guestbook.webp"
                alt="Guestbook"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-serif text-xl font-bold mb-1 flex items-center justify-between">
                  <span>Guestbook</span>
                  <IconArrowUpRight className="w-4 h-4 opacity-80" />
                </h3>
                <p className="text-neutral-300 text-xs font-sans">Let me know you were here</p>
              </div>
            </Link>
          </div>

          {/* Card 2: Bucket List Image Card */}
          <div
            ref={setCardRef(1)}
            className="nav-card relative overflow-hidden rounded-xl border border-neutral-800 flex-[1_1_auto] md:flex-[1_1_0%] h-52 md:h-full group cursor-pointer"
          >
            <Link href="/bucket-list" onClick={closeMenu} className="absolute inset-0 block">
              <Image
                src="/bucket-list.webp"
                alt="Bucket List"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-serif text-xl font-bold mb-1 flex items-center justify-between">
                  <span>Bucket List</span>
                  <IconArrowUpRight className="w-4 h-4 opacity-80" />
                </h3>
                <p className="text-neutral-300 text-xs font-sans">Things to do at least once</p>
              </div>
            </Link>
          </div>

          {/* Card 3: Quick Navigation Links Card */}
          <div
            ref={setCardRef(2)}
            className="nav-card relative flex flex-col justify-between p-4 rounded-xl bg-neutral-900/90 border border-neutral-800/80 flex-[1_1_auto] md:flex-[1_1_0%] h-auto md:h-full text-white"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-neutral-400 font-mono mb-2">
                Quick Navigation
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-between text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  <span>Home</span>
                  <IconArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-between text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  <span>About Me</span>
                  <IconArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
                <Link
                  href="/#projects"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-between text-sm font-medium hover:text-blue-400 transition-colors"
                >
                  <span>Projects</span>
                  <IconArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 mt-2 flex flex-col gap-1.5">
              <Link
                href="/uses"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                <IconPhoto className="w-3.5 h-3.5 text-neutral-400" />
                <span>Uses &amp; Setup</span>
              </Link>
              <Link
                href="/links"
                onClick={closeMenu}
                className="inline-flex items-center gap-2 text-xs text-neutral-300 hover:text-white transition-colors"
              >
                <IconLink className="w-3.5 h-3.5 text-neutral-400" />
                <span>All Links</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CardNav;
