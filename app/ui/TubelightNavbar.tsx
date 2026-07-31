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

  // GSAP Dual Width & Height Expansion (Desktop Only)
  const animateNavExpansion = useCallback(
    (expanding: boolean) => {
      if (isMobile) return;
      const navEl = navRef.current;
      if (!navEl) return;

      gsap.killTweensOf(navEl);
      if (cardsRef.current.length > 0) {
        gsap.killTweensOf(cardsRef.current);
      }

      const collapsedWidth = "660px";
      const expandedWidth = "820px";
      const targetHeight = expanding ? 295 : 52;

      if (expanding) {
        // Expand width AND height simultaneously
        gsap.to(navEl, {
          width: expandedWidth,
          height: targetHeight,
          borderRadius: "28px",
          duration: 0.4,
          ease: "power3.out",
        });

        // Stagger inner cards entrance
        gsap.fromTo(
          cardsRef.current,
          { y: 25, opacity: 0 },
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
          y: 15,
          opacity: 0,
          duration: 0.2,
          ease: "power3.in",
          stagger: 0.03,
        });

        // Collapse width AND height back to compact glassmorphic pill
        gsap.to(navEl, {
          width: collapsedWidth,
          height: 52,
          borderRadius: "9999px",
          duration: 0.35,
          ease: "power3.inOut",
          delay: 0.04,
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
              className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[92vw] max-w-[400px] z-[9998] max-h-[75vh] overflow-y-auto"
            >
              <div className="bg-neutral-950/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
                  <span className="text-white font-serif text-lg font-bold tracking-wide">
                    Explore More
                  </span>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/20 transition-colors"
                  >
                    <IconX size={16} />
                  </button>
                </div>

                {/* Mobile Cards Stack */}
                <div className="space-y-3 pt-1">
                  {/* Card 1: Guestbook */}
                  <Link
                    href="/guestbook"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-2xl overflow-hidden h-28 border border-white/10"
                  >
                    <Image
                      src="/guestbook.webp"
                      alt="Guestbook"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h4 className="text-white font-serif text-lg font-bold">Guestbook</h4>
                      <p className="text-neutral-300 text-xs">Let me know you were here</p>
                    </div>
                  </Link>

                  {/* Card 2: Bucket List */}
                  <Link
                    href="/bucket-list"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-2xl overflow-hidden h-28 border border-white/10"
                  >
                    <Image
                      src="/bucket-list.png"
                      alt="Bucket List"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h4 className="text-white font-serif text-lg font-bold">Bucket List</h4>
                      <p className="text-neutral-300 text-xs">Dreams with a deadline</p>
                    </div>
                  </Link>

                  {/* Card 3: Links */}
                  <Link
                    href="/links"
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <IconLink size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Links</h4>
                      <p className="text-neutral-400 text-xs">All my links are here</p>
                    </div>
                  </Link>

                  {/* Card 4: Uses */}
                  <Link
                    href="/uses"
                    onClick={handleMenuItemClick}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-neutral-900/90 border border-white/10 hover:border-white/25 transition-all"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white shrink-0">
                      <IconPhoto size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Uses</h4>
                      <p className="text-neutral-400 text-xs">A peek into my digital workspace</p>
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
          isMobile ? "bottom-6" : "top-6",
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
              ? "bg-neutral-950/75 backdrop-blur-3xl border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              : "bg-neutral-950/40 border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
          )}
          style={{
            width: isMobile ? "92vw" : "660px",
            height: "52px",
            borderRadius: isMobile ? "9999px" : "9999px",
          }}
        >
          {/* Top Navigation Bar Header Row (Fixed 52px) */}
          <div className="h-[52px] flex items-center justify-between px-3 sm:px-4 w-full">
            <div className="flex items-center gap-1 sm:gap-2 w-full justify-between sm:justify-center">
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
                        "relative cursor-pointer text-xs sm:text-sm font-semibold px-3.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full transition-all flex items-center gap-1.5 select-none whitespace-nowrap",
                        isBookCall
                          ? isActive
                            ? "bg-white text-black font-bold shadow-[0_0_22px_rgba(255,255,255,0.6)] border border-white"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md shadow-[0_0_12px_rgba(255,255,255,0.12)]"
                          : "text-foreground/80 hover:text-white",
                        !isBookCall && isActive && "bg-white/10 text-white font-bold"
                      )}
                    >
                      <span className="hidden md:inline relative z-10 whitespace-nowrap">{item.name}</span>
                      <span className="md:hidden relative z-10">
                        <Icon size={18} strokeWidth={2.2} />
                      </span>

                      {isMoreMenu && (
                        <IconChevronDown
                          size={15}
                          className={cn(
                            "hidden md:inline transition-transform duration-300",
                            isExpanded ? "rotate-180 text-white" : "rotate-0 text-foreground/70"
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
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full shadow-[0_0_12px_rgba(255,255,255,0.9)]">
                            <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                            <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                          </div>
                        </motion.div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Desktop Expanded Navigation Cards (2-Card Stack in Col 3, Attribution Removed) */}
          {!isMobile && (
            <div
              className={cn(
                "w-full p-3 sm:p-4 border-t border-white/10 transition-opacity duration-300",
                isExpanded ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-3 gap-3 md:gap-4 w-full h-[220px]">
                {/* Card 1: Guestbook */}
                <div ref={(el) => { cardsRef.current[0] = el; }} className="h-full">
                  <Link
                    href="/guestbook"
                    onClick={handleMenuItemClick}
                    className="group relative block rounded-2xl overflow-hidden h-full border border-white/15 hover:border-white/40 transition-all shadow-xl bg-neutral-900/60"
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
                    className="group relative block rounded-2xl overflow-hidden h-full border border-white/15 hover:border-white/40 transition-all shadow-xl bg-neutral-900/60"
                  >
                    <Image
                      src="/bucket-list.png"
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

                {/* Card 3 Stack: Links & Uses (Attribution Removed) */}
                <div ref={(el) => { cardsRef.current[2] = el; }} className="h-full flex flex-col gap-3 justify-between">
                  {/* Links Card */}
                  <Link
                    href="/links"
                    onClick={handleMenuItemClick}
                    className="group relative flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/15 hover:border-white/40 transition-all shadow-md flex-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <IconLink size={18} className="text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-semibold text-sm mb-0.5 tracking-wide whitespace-nowrap">
                        Links
                      </h4>
                      <p className="text-neutral-300 text-xs leading-tight truncate">
                        All my links are here
                      </p>
                    </div>
                  </Link>

                  {/* Uses Card */}
                  <Link
                    href="/uses"
                    onClick={handleMenuItemClick}
                    className="group relative flex items-center gap-3 p-4 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800/80 border border-white/15 hover:border-white/40 transition-all shadow-md flex-1"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 group-hover:bg-white/20 transition-colors">
                      <IconPhoto size={18} className="text-white" />
                    </div>
                    <div className="overflow-hidden">
                      <h4 className="text-white font-semibold text-sm mb-0.5 tracking-wide whitespace-nowrap">
                        Uses
                      </h4>
                      <p className="text-neutral-300 text-xs leading-tight truncate">
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
