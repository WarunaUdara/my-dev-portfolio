"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import Link from "@/components/ui/Link";
import Image from "@/components/ui/Image";
import {
  IconChevronDown,
  IconLink,
  IconPhoto,
  IconArticle,
  IconCreditCard,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
}

export function NavBar({ items, className }: NavBarProps) {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  useEffect(() => {
    const updatePathname = () => {
      if (typeof window !== "undefined") {
        setPathname(window.location.pathname);
      }
    };
    updatePathname();
    window.addEventListener("popstate", updatePathname);
    return () => window.removeEventListener("popstate", updatePathname);
  }, []);

  const [activeTab, setActiveTab] = useState(items[0]?.name || "Home");
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Check if we're on a "More" menu page
  const moreMenuPages = ["/uses", "/bucket-list", "/links", "/guestbook", "/blog"];
  const isOnMorePage = moreMenuPages.some((page) => pathname.startsWith(page));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Set active tab based on current route
  useEffect(() => {
    if (pathname.startsWith("/work")) {
      setActiveTab("Work");
    } else if (pathname.startsWith("/about")) {
      setActiveTab("About");
    } else if (pathname.startsWith("/blog")) {
      setActiveTab("Blog");
    } else if (pathname.startsWith("/contact")) {
      setActiveTab("Book a Call");
    } else if (isOnMorePage) {
      setActiveTab("More");
    } else if (pathname === "/" || pathname.startsWith("/#")) {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash) {
        const item = items.find((i) => i.url === hash);
        if (item) setActiveTab(item.name);
        else setActiveTab(items[0]?.name || "Home");
      } else {
        setActiveTab(items[0]?.name || "Home");
      }
    } else {
      const matchedItem = items.find((i) => i.url === pathname);
      if (matchedItem) {
        setActiveTab(matchedItem.name);
      }
    }
  }, [pathname, items, isOnMorePage]);

  // GSAP Container Expansion Timeline Logic
  const animateNavExpansion = useCallback(
    (expanding: boolean) => {
      const navEl = navRef.current;
      if (!navEl) return;

      gsap.killTweensOf(navEl);
      if (cardsRef.current.length > 0) {
        gsap.killTweensOf(cardsRef.current);
      }

      const targetHeight = expanding ? (isMobile ? 540 : 320) : 52;

      if (expanding) {
        // Expand container height
        gsap.to(navEl, {
          height: targetHeight,
          duration: 0.4,
          ease: "power3.out",
        });

        // Stagger inner cards entrance
        gsap.fromTo(
          cardsRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
            stagger: 0.06,
            delay: 0.08,
          }
        );
      } else {
        // Stagger cards exit
        gsap.to(cardsRef.current, {
          y: 20,
          opacity: 0,
          duration: 0.2,
          ease: "power3.in",
          stagger: 0.03,
        });

        // Collapse container height
        gsap.to(navEl, {
          height: 52,
          duration: 0.35,
          ease: "power3.inOut",
          delay: 0.05,
        });
      }
    },
    [isMobile]
  );

  // Trigger GSAP animation whenever isExpanded changes
  useEffect(() => {
    animateNavExpansion(isExpanded);
  }, [isExpanded, animateNavExpansion]);

  // Hover Handlers
  const handleMouseEnter = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
    setActiveTab(item.name);

    if (item.name === "More") {
      e.preventDefault();
      setIsExpanded((prev) => !prev);
      return;
    }

    // Collapse expansion on nav item click
    setIsExpanded(false);

    if (item.url.startsWith("#") && item.url.length > 1) {
      e.preventDefault();
      const targetId = item.url.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  const handleMenuItemClick = () => {
    setIsExpanded(false);
  };

  return (
    <div
      className={cn(
        "fixed bottom-6 sm:top-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto w-[92%] max-w-[820px]",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={navRef}
        className={cn(
          "w-full h-[52px] overflow-hidden will-change-[height] transition-all duration-300 shadow-2xl relative border",
          isExpanded
            ? "bg-neutral-950/95 backdrop-blur-2xl border-neutral-800/90 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.85)]"
            : "bg-black/90 backdrop-blur-xl border-neutral-800/80 rounded-full shadow-[0_0_25px_rgba(0,0,0,0.6)]"
        )}
      >
        {/* Top Navigation Bar Header Row (Fixed 52px) */}
        <div className="h-[52px] flex items-center justify-between px-3 sm:px-4 w-full">
          <div className="flex items-center gap-1 sm:gap-1.5 w-full justify-between sm:justify-center">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              const isMoreMenu = item.name === "More";
              const isBookCall = item.name === "Book a Call";

              return (
                <Link
                  key={item.name}
                  href={item.url}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    "relative cursor-pointer text-xs sm:text-sm font-semibold px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all flex items-center gap-1.5 select-none",
                    isBookCall
                      ? isActive
                        ? "bg-white text-black font-bold shadow-[0_0_22px_rgba(255,255,255,0.5)] border border-white"
                        : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.12)]"
                      : "text-neutral-300 hover:text-white",
                    !isBookCall && isActive && "bg-neutral-800/80 text-white font-bold"
                  )}
                >
                  <span className="hidden md:inline relative z-10">{item.name}</span>
                  <span className="md:hidden relative z-10">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>

                  {isMoreMenu && (
                    <IconChevronDown
                      size={15}
                      className={cn(
                        "hidden md:inline transition-transform duration-300",
                        isExpanded ? "rotate-180 text-white" : "rotate-0 text-neutral-400"
                      )}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Expanded Navigation Content Cards (GSAP Staggered Entrance) */}
        <div
          className={cn(
            "w-full p-3 sm:p-4 border-t border-neutral-800/80 transition-opacity duration-300",
            isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 w-full h-[450px] md:h-[240px]">
            {/* Card 1: Guestbook */}
            <div ref={(el) => { cardsRef.current[0] = el; }} className="h-full">
              <Link
                href="/guestbook"
                onClick={handleMenuItemClick}
                className="group relative block rounded-2xl overflow-hidden h-full border border-neutral-800/80 hover:border-neutral-600 transition-all shadow-xl bg-neutral-900/80"
              >
                <Image
                  src="/guestbook.webp"
                  alt="Guestbook"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-serif text-xl sm:text-2xl font-bold mb-1 tracking-wide">
                    Guestbook
                  </h3>
                  <p className="text-neutral-300/90 text-xs font-sans leading-relaxed">
                    Let me know you were here
                  </p>
                </div>
              </Link>
            </div>

            {/* Card 2: Bucket List */}
            <div ref={(el) => { cardsRef.current[1] = el; }} className="h-full">
              <Link
                href="/bucket-list"
                onClick={handleMenuItemClick}
                className="group relative block rounded-2xl overflow-hidden h-full border border-neutral-800/80 hover:border-neutral-600 transition-all shadow-xl bg-neutral-900/80"
              >
                <Image
                  src="/bucket-list.webp"
                  alt="Bucket List"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-white font-serif text-xl sm:text-2xl font-bold mb-1 tracking-wide">
                    Bucket List
                  </h3>
                  <p className="text-neutral-300/90 text-xs font-sans leading-relaxed">
                    Dreams with a deadline
                  </p>
                </div>
              </Link>
            </div>

            {/* Card 3 Stack: Links, Uses, Attribution */}
            <div ref={(el) => { cardsRef.current[2] = el; }} className="h-full flex flex-col gap-2.5 justify-between">
              {/* Links Card */}
              <Link
                href="/links"
                onClick={handleMenuItemClick}
                className="group relative flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800/80 hover:border-neutral-700 transition-all shadow-md flex-1"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:bg-neutral-700 transition-colors">
                  <IconLink size={16} className="text-neutral-300 group-hover:text-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 tracking-wide">
                    Links
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-tight truncate">
                    All my links are here
                  </p>
                </div>
              </Link>

              {/* Uses Card */}
              <Link
                href="/uses"
                onClick={handleMenuItemClick}
                className="group relative flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800/80 hover:border-neutral-700 transition-all shadow-md flex-1"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:bg-neutral-700 transition-colors">
                  <IconPhoto size={16} className="text-neutral-300 group-hover:text-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 tracking-wide">
                    Uses
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-tight truncate">
                    A peek into my digital workspace
                  </p>
                </div>
              </Link>

              {/* Attribution Card */}
              <Link
                href="/links"
                onClick={handleMenuItemClick}
                className="group relative flex items-center gap-3 p-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-800/80 hover:border-neutral-700 transition-all shadow-md flex-1"
              >
                <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/80 flex items-center justify-center shrink-0 group-hover:bg-neutral-700 transition-colors">
                  <IconCreditCard size={16} className="text-neutral-300 group-hover:text-white" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-white font-semibold text-xs sm:text-sm mb-0.5 tracking-wide">
                    Attribution
                  </h4>
                  <p className="text-neutral-400 text-[11px] leading-tight truncate">
                    Journey to create this site
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
