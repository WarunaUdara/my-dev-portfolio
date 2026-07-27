"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Terminal from "./terminal";

export interface TerminalLoaderProps {
  children: React.ReactNode;
}

export function TerminalLoader({ children }: TerminalLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const seen = sessionStorage.getItem("hasSeenLoader");
      if (seen) {
        setShowLoader(false);
        setHasLoaded(true);
      }
    }
  }, []);

  const handleComplete = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("hasSeenLoader", "true");
    }
    setShowLoader(false);
    setTimeout(() => setHasLoaded(true), 1000);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {showLoader && (
          <motion.div
            key="terminal-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black p-4 text-white overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-radial from-neutral-900/50 via-black to-black pointer-events-none" />

            {/* Skip Button */}
            <button
              onClick={handleComplete}
              className="absolute top-6 right-6 z-50 text-xs font-mono tracking-widest text-neutral-400 hover:text-white uppercase px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/80 transition-all duration-300 hover:scale-105"
            >
              Skip Intro ➜
            </button>

            {/* Terminal Window */}
            <div className="relative z-10 w-full max-w-2xl">
              <Terminal
                username="Waruna-MacBook-Air"
                onComplete={handleComplete}
                commands={[
                  "git clone https://github.com/WarunaUdara/my-dev-portfolio.git",
                  "cd my-dev-portfolio && bun install",
                  "bun run dev --host",
                ]}
                outputs={{
                  0: [
                    "Cloning into 'my-dev-portfolio'...",
                    "remote: Enumerating objects: 100%, done.",
                    "remote: Compressing objects: 100%, done.",
                    "Receiving objects: 100%, done.",
                  ],
                  1: [
                    "bun install v1.3.12",
                    "+ @tanstack/react-router",
                    "+ vite",
                    "installed 42 packages in 180ms",
                  ],
                  2: [
                    "  VITE v8.1.5 ready in 240ms",
                    "  ➜ Local:   http://localhost:5173/",
                    "  ➜ Network: https://warunadev.vercel.app/",
                    "✔ Portfolio Environment Ready. Initializing site...",
                  ],
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Website Content with Smooth Entrance Animation */}
      <motion.div
        initial={hasLoaded ? { opacity: 1 } : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: showLoader ? 0.2 : 0, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </>
  );
}

export default TerminalLoader;
