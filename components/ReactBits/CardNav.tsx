"use client";

import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import Link from "@/components/ui/Link";
import Image from "@/components/ui/Image";
import { motion, AnimatePresence } from "framer-motion";
import {
  IconHome,
  IconUser,
  IconBriefcase,
  IconChevronDown,
  IconLink,
  IconPhoto,
  IconArrowUpRight,
  IconGridDots,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface CardNavProps {
  className?: string;
  ease?: string;
}

export const CardNav: React.FC<CardNavProps> = ({
  className = "",
  ease = "power3.out",
}) => {
  const [pathname, setPathname] = useState(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );
  const [activeTab, setActiveTab] = useState("Home");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMobileModal, setShowMobileModal] = useState(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathname(window.location.pathname);
    }
  }, []);

  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Projects", url: "/#projects", icon: IconBriefcase },
    { name: "More", url: "#more", icon: IconGridDots },
  ];

  // Update active tab based on current pathname
  useEffect(() => {
    if (pathname === "/about") {
      setActiveTab("About");
    } else if (pathname === "/") {
      setActiveTab("Home");
    } else if (
      ["/uses", "/bucket-list", "/links", "/guestbook"].some((p) =>
        pathname.startsWith(p)
      )
    ) {
      setActiveTab("More");
    }
  }, [pathname]);

  const calculateHeight = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) return 56; // Mobile uses modal popup
    return 290;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 56, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 35, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.35,
      ease,
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.07 },
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

  const openMenu = useCallback(() => {
    if (window.innerWidth < 768) return; // Desktop only hover expansion
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    const tl = tlRef.current;
    if (!tl || isExpanded) return;
    setIsExpanded(true);
    tl.play(0);
  }, [isExpanded]);

  const closeMenu = useCallback(() => {
    if (window.innerWidth < 768) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      const tl = tlRef.current;
      if (!tl) return;
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }, 120);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: (typeof navItems)[0]
  ) => {
    setActiveTab(item.name);

    if (item.name === "More") {
      e.preventDefault();
      if (window.innerWidth < 768) {
        setShowMobileModal((v) => !v);
      } else {
        if (!isExpanded) openMenu();
        else closeMenu();
      }
      return;
    }

    if (item.url.startsWith("/#") || item.url.startsWith("#")) {
      const targetId = item.url.replace(/^.*#/, "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }

    closeMenu();
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <>
      {/* Mobile Drawer Backdrop & Modal */}
      <AnimatePresence>
        {showMobileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] md:hidden"
            onClick={() => setShowMobileModal(false)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-x-4 bottom-24 bg-neutral-950 border border-neutral-800 rounded-3xl p-5 shadow-2xl z-[9999] space-y-4 max-h-[75vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-white font-serif font-bold text-lg">More Navigation</h3>
                <button
                  onClick={() => setShowMobileModal(false)}
                  className="p-1 rounded-full bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  <IconX size={18} />
                </button>
              </div>

              {/* Guestbook Mobile */}
              <Link
                href="/guestbook"
                onClick={() => setShowMobileModal(false)}
                className="relative block h-36 rounded-2xl overflow-hidden border border-neutral-800"
              >
                <Image src="/guestbook.webp" alt="Guestbook" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h4 className="text-white font-serif font-bold text-lg">Guestbook</h4>
                  <p className="text-neutral-300 text-xs">Let me know you were here</p>
                </div>
              </Link>

              {/* Bucket List Mobile */}
              <Link
                href="/bucket-list"
                onClick={() => setShowMobileModal(false)}
                className="relative block h-36 rounded-2xl overflow-hidden border border-neutral-800"
              >
                <Image src="/bucket-list.webp" alt="Bucket List" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <h4 className="text-white font-serif font-bold text-lg">Bucket List</h4>
                  <p className="text-neutral-300 text-xs">Things to do at least once</p>
                </div>
              </Link>

              {/* Links & Uses Mobile */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  href="/links"
                  onClick={() => setShowMobileModal(false)}
                  className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col gap-2"
                >
                  <IconLink className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold text-sm">All Links</span>
                </Link>
                <Link
                  href="/uses"
                  onClick={() => setShowMobileModal(false)}
                  className="p-4 bg-neutral-900 border border-neutral-800 rounded-2xl flex flex-col gap-2"
                >
                  <IconPhoto className="w-5 h-5 text-emerald-400" />
                  <span className="text-white font-semibold text-sm">Uses &amp; Setup</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navbar Container with GSAP Card Expansion */}
      <div
        className={cn(
          "fixed bottom-6 md:top-6 left-1/2 -translate-x-1/2 z-[9999]",
          className
        )}
        onMouseEnter={openMenu}
        onMouseLeave={closeMenu}
      >
        <nav
          ref={navRef}
          className="block h-[56px] p-0 rounded-full md:rounded-3xl border border-neutral-800/90 bg-black/90 shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden will-change-[height] backdrop-blur-xl"
        >
          {/* Top Pill Navbar Bar (Original Appearance) */}
          <div className="h-[56px] px-2 flex items-center justify-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.name;
              const isMoreMenu = item.name === "More";

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => isMoreMenu && openMenu()}
                >
                  <Link
                    href={item.url}
                    onClick={(e) => handleNavClick(e, item)}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-5 sm:px-6 py-2 rounded-full transition-all duration-200 flex items-center gap-1.5",
                      "text-neutral-300 hover:text-white",
                      isActive && "bg-neutral-800/90 text-white"
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
                          isExpanded && "rotate-180 text-blue-400"
                        )}
                      />
                    )}

                    {/* Lamp indicator for active tab */}
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-white/5 rounded-full -z-10"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                      >
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-6 h-1 bg-white rounded-t-full">
                          <div className="absolute w-10 h-5 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* GSAP Expanded Cards Section (Reveals on Hovering More) */}
          <div
            className={cn(
              "card-nav-content absolute left-0 right-0 top-[56px] bottom-0 p-3 hidden md:flex items-stretch gap-3 justify-start z-[1]",
              isExpanded ? "visible pointer-events-auto" : "invisible pointer-events-none"
            )}
            aria-hidden={!isExpanded}
          >
            {/* Card 1: Guestbook Image Card */}
            <div
              ref={setCardRef(0)}
              className="nav-card relative overflow-hidden rounded-2xl border border-neutral-800 flex-1 h-full group cursor-pointer"
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
                    <IconArrowUpRight className="w-4 h-4 text-white opacity-80" />
                  </h3>
                  <p className="text-neutral-300 text-xs font-sans">Let me know you were here</p>
                </div>
              </Link>
            </div>

            {/* Card 2: Bucket List Image Card */}
            <div
              ref={setCardRef(1)}
              className="nav-card relative overflow-hidden rounded-2xl border border-neutral-800 flex-1 h-full group cursor-pointer"
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
                    <IconArrowUpRight className="w-4 h-4 text-white opacity-80" />
                  </h3>
                  <p className="text-neutral-300 text-xs font-sans">Things to do at least once in my life</p>
                </div>
              </Link>
            </div>

            {/* Card 3: Stacked Links & Uses Card */}
            <div
              ref={setCardRef(2)}
              className="nav-card flex flex-col gap-3 flex-1 h-full text-white"
            >
              {/* Links Card */}
              <Link
                href="/links"
                onClick={closeMenu}
                className="group flex-1 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 hover:border-neutral-700 hover:bg-neutral-800/90 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <IconLink size={20} className="text-blue-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Links</h4>
                  <p className="text-neutral-400 text-xs">All my links are here</p>
                </div>
              </Link>

              {/* Uses Card */}
              <Link
                href="/uses"
                onClick={closeMenu}
                className="group flex-1 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-4 hover:border-neutral-700 hover:bg-neutral-800/90 transition-all flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <IconPhoto size={20} className="text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm">Uses</h4>
                  <p className="text-neutral-400 text-xs">A peek into my digital workspace</p>
                </div>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default CardNav;
