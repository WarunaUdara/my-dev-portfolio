"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconGitBranch, IconTerminal, IconCheck, IconBolt } from "@tabler/icons-react";

interface RouteConfig {
  cmd: string;
  output: string[];
  preloads: string[];
}

const ROUTE_LOGS: Record<string, RouteConfig> = {
  "/work": {
    cmd: "git checkout origin/work --force",
    output: [
      "Switched to branch 'work' (HEAD detached at 8d50fc8)",
      "✔ Preloaded case study hero mockups & SVG tech icons.",
      "⚡ 0 lints, 0 syntax errors, 100% pure craftsmanship."
    ],
    preloads: ["/projects-algoarena.png", "/projects-portfolio.png", "/projects-beautyofcloud.png"]
  },
  "/about": {
    cmd: "git checkout feature/about-waruna",
    output: [
      "Switched to branch 'feature/about-waruna'",
      "✔ Loaded BICT (Hons) Network Tech & institution logos.",
      "☕ Overclocking brain... Caffeine levels nominal."
    ],
    preloads: ["/me/waruna-speaking.png", "/me/usj-logo.png", "/me/icet-logo.png", "/me/school-logo.png"]
  },
  "/uses": {
    cmd: "cat ~/.config/setup.json",
    output: [
      "Reading hardware specs: M4 MacBook Air, 100Hz IPS display...",
      "✔ Preloaded Ghostty terminal, Zed editor, & CLI icons.",
      "⚡ Developer environment fully loaded."
    ],
    preloads: ["/uses/google-antigravity.webp", "/ghostty copy.webp", "/zed.png"]
  },
  "/guestbook": {
    cmd: "firebase firestore:listen --collection messages",
    output: [
      "Connecting to Firebase Firestore real-time channel...",
      "✔ Preloaded community signatures & guestbook cards.",
      "✍ Ready to receive new message."
    ],
    preloads: ["/guestbook.webp"]
  },
  "/bucket-list": {
    cmd: "cat ~/life/bucket_list.md",
    output: [
      "Parsing dream life milestones...",
      "✔ Preloaded bucket list cards & asset manifests.",
      "🎯 Skydiving, AI research, global tech summits."
    ],
    preloads: ["/bucket-list.webp"]
  },
  "/links": {
    cmd: "curl -I https://warunadev.vercel.app/links",
    output: [
      "HTTP/2 200 OK (resolving social graph...)",
      "✔ Verified LinkedIn, GitHub, Telegram, X, Email endpoints.",
      "🔗 Connections active."
    ],
    preloads: []
  },
  "/": {
    cmd: "git checkout main",
    output: [
      "Switched to branch 'main' (HEAD is up to date with 'origin/main')",
      "✔ Initialized WebGL Hero canvas & glassmorphic cards.",
      "✨ Welcome to Waruna Udara's Portfolio."
    ],
    preloads: ["/WarunaUdaraSampath.jpg", "/projects-algoarena.png"]
  }
};

export default function RouteTerminalLoader({ children }: { children: React.ReactNode }) {
  const [pathname, setPathname] = useState(() => (typeof window !== "undefined" ? window.location.pathname : "/"));
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<RouteConfig>(ROUTE_LOGS["/"] || ROUTE_LOGS["/work"]);
  const prevPathRef = useRef(pathname);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload images utility
  const preloadRouteImages = (urls: string[]) => {
    if (typeof window === "undefined") return;
    urls.forEach((url) => {
      const img = new window.Image();
      img.src = url;
    });
  };

  const triggerTransition = (targetPath: string) => {
    const matchingKey = Object.keys(ROUTE_LOGS).find((key) => key !== "/" && targetPath.startsWith(key)) || "/";
    const config = ROUTE_LOGS[matchingKey] || ROUTE_LOGS["/"];
    setCurrentConfig(config);
    preloadRouteImages(config.preloads);
    setIsTransitioning(true);

    if (timerRef.current) clearTimeout(timerRef.current);
    // Well-paced 1.35 second duration so user can comfortably read terminal command & sarcastic output
    timerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 1350);
  };

  useEffect(() => {
    const handleLocationChange = () => {
      const newPath = window.location.pathname;
      if (newPath === prevPathRef.current) return;
      prevPathRef.current = newPath;
      setPathname(newPath);
      triggerTransition(newPath);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Intercept clicks on links for instant route transition feedback
    const handleGlobalLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto:")) return;

      const targetPath = href.split("?")[0].split("#")[0];
      if (targetPath && targetPath !== window.location.pathname) {
        triggerTransition(targetPath);
      }
    };

    document.addEventListener("click", handleGlobalLinkClick, true);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      document.removeEventListener("click", handleGlobalLinkClick, true);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="route-terminal-overlay"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsTransitioning(false)}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl cursor-pointer"
          >
            {/* Terminal Window Box */}
            <div className="w-full max-w-lg rounded-2xl bg-neutral-950/95 border border-white/15 p-5 sm:p-6 shadow-[0_0_50px_rgba(0,0,0,0.9)] space-y-4">
              {/* Window Controls & Branch Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-xs font-mono text-neutral-400 flex items-center gap-1.5">
                    <IconTerminal className="w-3.5 h-3.5 text-neutral-300" />
                    waruna@macbook-air: ~
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-white/10 text-[10px] font-mono text-neutral-300">
                  <IconGitBranch className="w-3 h-3 text-emerald-400" />
                  <span>git-router</span>
                </div>
              </div>

              {/* Terminal Command Prompt */}
              <div className="font-mono text-xs sm:text-sm space-y-3">
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-white font-semibold"
                >
                  <span className="text-emerald-400">❯</span>
                  <span>{currentConfig.cmd}</span>
                </motion.div>

                {/* Sarcastic Execution Logs (Well-Paced Staggered Reveal) */}
                <div className="space-y-2 pt-1 text-neutral-300 text-[11px] sm:text-xs">
                  {currentConfig.output.map((line, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + idx * 0.22, duration: 0.25 }}
                      className="flex items-start gap-2.5 leading-relaxed"
                    >
                      {line.startsWith("✔") ? (
                        <IconCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      ) : line.startsWith("⚡") ? (
                        <IconBolt className="w-3.5 h-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
                      ) : (
                        <span className="text-neutral-500 font-bold">•</span>
                      )}
                      <span>{line.replace(/^[✔⚡]\s*/, "")}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Progress Bar / Pulsing Terminal Indicator */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                <span className="animate-pulse flex items-center gap-1.5 text-neutral-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Preloading route assets...
                </span>
                <span className="text-neutral-500">HTTP/2 200 OK (Click to skip)</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content */}
      {children}
    </>
  );
}
