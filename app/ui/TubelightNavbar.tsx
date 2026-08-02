"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import Link from "@/components/ui/Link";
import Image from "@/components/ui/Image";
import {
  IconChevronDown,
  IconLink,
  IconPhoto,
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

  // GSAP Compact Dual Width & Height Expansion (Desktop Only)
  const animateNavExpansion = useCallback(
    (expanding: boolean) => {
      if (isMobile) return;
      const navEl = navRef.current;
      if (!navEl) return;

      gsap.killTweensOf(navEl);
      if (cardsRef.current.length > 0) {
        gsap.killTweensOf(cardsRef.current);
      }

      const collapsedWidth = "520px";
      const expandedWidth = "680px";
      const targetHeight = expanding ? 230 : 46;

      if (expanding) {
        // Expand width AND height simultaneously
        gsap.to(navEl, {
          width: expandedWidth,
          height: targetHeight,
          borderRadius: "22px",
          duration: 0.38,
          ease: "power3.out",
        });

        // Stagger inner cards entrance
        gsap.fromTo(
          cardsRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.32,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.06,
          }
        );
      } else {
        // Stagger cards exit
        gsap.to(cardsRef.current, {
          y: 12,
          opacity: 0,
          duration: 0.18,
          ease: "power3.in",
          stagger: 0.03,
        });

        // Collapse width AND height back to compact glassmorphic pill
        gsap.to(navEl, {
          width: collapsedWidth,
          height: 46,
          borderRadius: "9999px",
          duration: 0.35,
          ease: "power3.inOut",
          delay: 0.03,
        });
      }
    },
    [isMobile]
  );

  // Trigger GSAP animation whenever isExpanded changes (Desktop)
  useEffect(() => {
    if (!isMobile) {
      animateNavExpansion(isExpanded);
    }
  }, [isExpanded, isMobile, animateNavExpansion]);

  // Hover Handlers with safety delay (Desktop Only)
  const handleMoreMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsExpanded(true);
  }, [isMobile]);

  const handleContainerMouseLeave = useCallback(() => {
    if (isMobile) return;
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 180);
  }, [isMobile]);

  const handleContainerMouseEnter = useCallback(() => {
    if (isMobile) return;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
  }, [isMobile]);

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
    <>
      {/* Mobile Glassmorphic Dropup Drawer Overlay (Bottom Anchored) */}
      <AnimatePresence>
        {isMobile && isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[9997]"
            />

            {/* Dropup Container */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-[380px] z-[9998] max-h-[75vh] overflow-y-auto"
            >
              <div className="bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-2.5">
                {/* Header */}
                <div className="flex items-center justify-between px-1 pb-2 border-b border-white/10">
                  <span className="text-white font-serif text-base font-semibold tracking-wide">
                    Explore More
                  </span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <IconX size={14} />
                  </button>
                </div>

                {/* Mobile Cards Stack */}
                <div className="space-y-2.5 pt-1">
                  {/* Card 1: Guestbook */}
                  <Link
                    href="/guestbook"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-xl overflow-hidden h-24 border border-white/10"
                  >
                    <Image
                      src="/guestbook.webp"
                      alt="Guestbook"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-2.5 left-3">
                      <h4 className="text-white font-serif text-base font-bold">Guestbook</h4>
                      <p className="text-neutral-300 text-[11px] font-light">Let me know you were here</p>
                    </div>
                  </Link>

                  {/* Card 2: Bucket List */}
                  <Link
                    href="/bucket-list"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-xl overflow-hidden h-24 border border-white/10"
                  >
                    <Image
                      src="/bucket-list.webp"
                      alt="Bucket List"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-2.5 left-3">
                      <h4 className="text-white font-serif text-base font-bold">Bucket List</h4>
                      <p className="text-neutral-300 text-[11px] font-light">Dreams with a deadline</p>
                    </div>
                  </Link>

                  {/* Card 3: Links */}
                  <Link
                    href="/links"
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <IconLink size={16} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-xs">Links</h4>
                      <p className="text-neutral-400 text-[11px] font-light">All my links are here</p>
                    </div>
                  </Link>

                  {/* Card 4: Uses */}
                  <Link
                    href="/uses"
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-2.5 p-3 rounded-xl bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white shrink-0">
                      <IconPhoto size={16} />
                    </div>
                    <div>
                      <h4 className="text-white font-medium text-xs">Uses</h4>
                      <p className="text-neutral-400 text-[11px] font-light">A peek into my digital workspace</p>
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Navbar Container */}
      <div
        className={cn(
          "fixed left-1/2 -translate-x-1/2 z-[9999] pointer-events-none w-full flex justify-center",
          isMobile ? "bottom-5" : "top-5",
          className
        )}
      >
        <div
          ref={navRef}
          onMouseEnter={handleContainerMouseEnter}
          onMouseLeave={handleContainerMouseLeave}
          className={cn(
            "pointer-events-auto overflow-hidden will-change-[height,width,border-radius] transition-colors duration-300 relative border shadow-2xl",
            isExpanded && !isMobile
              ? "bg-neutral-950/80 backdrop-blur-3xl border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "bg-neutral-950/40 border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          )}
          style={{
            width: isMobile ? "92vw" : "520px",
            height: "46px",
            borderRadius: "9999px",
          }}
        >
          {/* Top Navigation Bar Header Row (Fixed 46px) */}
          <div className="h-[46px] flex items-center justify-between px-2 sm:px-3 w-full">
            <div className="flex items-center gap-0.5 sm:gap-1 w-full justify-between sm:justify-center">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;
                const isMoreMenu = item.name === "More";
                const isBookCall = item.name === "Book a Call";

                return (
                  <div
                    key={item.name}
                    className="relative shrink-0"
                    onMouseEnter={() => isMoreMenu && handleMoreMouseEnter()}
                  >
                    <Link
                      href={item.url}
                      onClick={(e) => handleNavClick(e, item)}
                      className={cn(
                        "relative cursor-pointer text-[12px] sm:text-[13px] font-light px-3 sm:px-3.5 py-1 rounded-full transition-all flex items-center gap-1 select-none whitespace-nowrap tracking-wide",
                        isBookCall
                          ? isActive
                            ? "bg-white text-black font-semibold shadow-[0_0_18px_rgba(255,255,255,0.6)] border border-white"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-[0_0_10px_rgba(255,255,255,0.1)] font-medium"
                          : "text-neutral-300 hover:text-white",
                        !isBookCall && isActive && "bg-white/10 text-white font-medium"
                      )}
                    >
                      <span className="hidden md:inline relative z-10 whitespace-nowrap">{item.name}</span>
                      <span className="md:hidden relative z-10">
                        <Icon size={16} strokeWidth={2} />
                      </span>

                      {isMoreMenu && (
                        <IconChevronDown
                          size={14}
                          className={cn(
                            "hidden md:inline transition-transform duration-300 opacity-70",
                            isExpanded ? "rotate-180 text-white opacity-100" : "rotate-0 text-neutral-300"
                          )}
                        />
                      )}

                      {isActive && !isBookCall && (
                        <motion.div
                          layoutId="lamp"
                          className="absolute inset-0 w-full bg-white/10 rounded-full -z-10"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        >
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-7 h-0.5 bg-white rounded-t-full shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                            <div className="absolute w-10 h-5 bg-white/20 rounded-full blur-md -top-2 -left-1.5" />
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Compact Expanded Navigation Cards */}
          {!isMobile && (
            <div
              className={cn(
                "w-full p-2.5 border-t border-white/10 transition-opacity duration-300",
                isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-3 gap-2.5 w-full h-[165px]">
                {/* Card 1: Guestbook */}
                <div ref={(el) => { cardsRef.current[0] = el; }} className="h-full">
                  <Link
                    href="/guestbook"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-xl overflow-hidden h-full border border-white/15 hover:border-white/40 transition-all shadow-lg bg-neutral-900/60"
                  >
                    <Image
                      src="/guestbook.webp"
                      alt="Guestbook"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-serif text-base font-semibold mb-0.5 tracking-wide">
                        Guestbook
                      </h3>
                      <p className="text-neutral-300/90 text-[11px] font-light leading-tight">
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
                    className="group relative block rounded-xl overflow-hidden h-full border border-white/15 hover:border-white/40 transition-all shadow-lg bg-neutral-900/60"
                  >
                    <Image
                      src="/bucket-list.webp"
                      alt="Bucket List"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-white font-serif text-base font-semibold mb-0.5 tracking-wide">
                        Bucket List
                      </h3>
                      <p className="text-neutral-300/90 text-[11px] font-light leading-tight">
                        Dreams with a deadline
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Card 3 Stack: Links & Uses */}
                <div ref={(el) => { cardsRef.current[2] = el; }} className="h-full flex flex-col gap-2 justify-between">
                  {/* Links Card */}
                  <Link
                    href="/links"
                    onClick={handleMenuItemClick}
                    className="group relative flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/15 hover:border-white/40 transition-all shadow-sm flex-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <IconLink size={15} className="text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-medium text-xs mb-0.5 tracking-wide whitespace-nowrap">
                        Links
                      </h4>
                      <p className="text-neutral-300 text-[10px] font-light leading-tight truncate">
                        All my links are here
                      </p>
                    </div>
                  </Link>

                  {/* Uses Card */}
                  <Link
                    href="/uses"
                    onClick={handleMenuItemClick}
                    className="group relative flex items-center gap-2.5 p-2.5 rounded-xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/15 hover:border-white/40 transition-all shadow-sm flex-1"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <IconPhoto size={15} className="text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-medium text-xs mb-0.5 tracking-wide whitespace-nowrap">
                        Uses
                      </h4>
                      <p className="text-neutral-300 text-[10px] font-light leading-tight truncate">
                        A peek into my digital workspace
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
