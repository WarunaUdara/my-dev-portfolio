"use client";

import React, { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./terminal";

export interface TerminalLoaderProps {
  children: React.ReactNode;
}

// Cap how long the reveal waits on fonts so the loader never hangs on a slow font server.
const MAX_FONT_WAIT_MS = 1500;

export function TerminalLoader({ children }: TerminalLoaderProps) {
  // Synchronously check sessionStorage so client routing NEVER re-triggers loader
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("hasSeenLoader");
    }
    return false;
  });

  const [hasLoaded, setHasLoaded] = useState(() => {
    if (typeof window !== "undefined") {
      return Boolean(sessionStorage.getItem("hasSeenLoader"));
    }
    return true;
  });

  const revealRef = useRef(false);

  const reveal = useCallback(() => {
    if (revealRef.current) return;
    revealRef.current = true;
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenLoader", "true");
    }
    setShowLoader(false);
    setHasLoaded(true);
  }, []);

  // Skip button reveals immediately; user explicitly wants out.
  const handleSkip = useCallback(() => reveal(), [reveal]);

  // Natural completion waits for fonts to be ready so the revealed page is
  // already fully styled (no font-swap flash), capped so it never stalls.
  const handleComplete = useCallback(() => {
    if (typeof document !== "undefined" && "fonts" in document && document.fonts) {
      const cap = new Promise<void>((resolve) => setTimeout(resolve, MAX_FONT_WAIT_MS));
      Promise.race([document.fonts.ready.catch(() => {}), cap]).then(reveal);
    } else {
      reveal();
    }
  }, [reveal]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="terminal-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(12px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black p-4 text-white overflow-hidden"
          >
            {/* Ambient Background Radial Glow */}
            <div className="absolute inset-0 bg-radial from-neutral-900/60 via-black to-black pointer-events-none" />

            {/* Fast Skip Button */}
            <button
              onClick={handleSkip}
              className="absolute top-6 right-6 z-[10000] text-[11px] font-mono tracking-widest text-neutral-400 hover:text-white uppercase px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/90 transition-all duration-200 hover:scale-105"
            >
              Skip ➜
            </button>

            {/* Fast, Fun, Sarcastic Terminal Window */}
            <div className="relative z-10 w-full max-w-xl">
              <Terminal
                username="Waruna-MacBook-Air"
                typingSpeed={9}
                typingJitter={8}
                initialDelay={80}
                delayBetweenCommands={100}
                enterDelay={45}
                outputLineDelay={65}
                postOutputDelay={110}
                doneDelay={60}
                onComplete={handleComplete}
                commands={[
                  "sudo brew install coffee --double-espresso",
                  "git commit -m 'fixed 1 bug, created 42 new features'",
                  "bun run launch-waruna-portfolio --no-sleep",
                ]}
                outputs={{
                  0: [
                    "☕ Espresso injected. Caffeine: 100%. Brain overclocked.",
                  ],
                  1: [
                    "[main 0xdeadbeef] 4,200 lines added, 0 tests written.",
                    "✔ Pushed directly to production without testing.",
                  ],
                  2: [
                    "🚀 VITE v8.1.5 ready in 12ms. Launching portfolio...",
                  ],
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content & Navbar: Hidden while loading, smoothly revealed on complete */}
      <motion.div
        initial={hasLoaded ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ pointerEvents: showLoader ? "none" : "auto" }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}

export default TerminalLoader;
