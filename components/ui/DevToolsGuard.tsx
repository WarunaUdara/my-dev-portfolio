"use client";

import React, { useEffect, useState } from "react";
import { IconX, IconLock, IconLockOpen } from "@tabler/icons-react";

export default function DevToolsGuard() {
  const [isDevToolsOpen, setIsDevToolsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Check localStorage and URL params for owner bypass
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUnlock = localStorage.getItem("portfolio_dev_unlocked") === "true";
    const urlParams = new URLSearchParams(window.location.search);
    const urlUnlock = urlParams.get("dev") === "true" || urlParams.get("unlock") === "true";

    if (storedUnlock || urlUnlock) {
      setIsUnlocked(true);
      if (urlUnlock) {
        localStorage.setItem("portfolio_dev_unlocked", "true");
      }
    }

    // Global helper methods for portfolio owner
    (window as any).unlockDev = () => {
      localStorage.setItem("portfolio_dev_unlocked", "true");
      setIsUnlocked(true);
      setIsDevToolsOpen(false);
      console.log("%c 🔓 Developer Mode Unlocked", "color: #34d399; font-size: 14px; font-family: monospace;");
      return "Developer bypass mode unlocked!";
    };

    (window as any).lockDev = () => {
      localStorage.removeItem("portfolio_dev_unlocked");
      setIsUnlocked(false);
      console.log("%c 🔒 Developer Mode Locked", "color: #f87171; font-size: 14px; font-family: monospace;");
      return "Developer protection reactivated.";
    };
  }, []);

  // Professional Console Notice (Only logged once in devtools)
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    console.clear();
    console.log(
      "%c ATTENTION %c Developer Tools Inspection Active",
      "background: #991b1b; color: #ffffff; font-size: 12px; font-weight: bold; padding: 4px 8px; border-radius: 4px;",
      "color: #e2e8f0; font-size: 12px; font-family: monospace;"
    );
    console.log(
      "%cThis environment uses technical inspection monitoring. To disable this protection for development, press [ Cmd + Option + Shift + D ] or run unlockDev().",
      "color: #a3a3a3; font-size: 11px; font-family: monospace; line-height: 1.5;"
    );
  }, [isUnlocked]);

  // DevTools detection loop (Only triggers when DevTools is ACTUALLY open)
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    const threshold = 160;

    const checkDevTools = () => {
      // Dimension differential check (docked DevTools side/bottom)
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      // Debugger execution timing check (undocked/separated DevTools)
      const start = performance.now();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performance.now();
      const debuggerOpen = end - start > 100;

      if (widthThreshold || heightThreshold || debuggerOpen) {
        setIsDevToolsOpen(true);
      } else {
        setIsDevToolsOpen(false);
      }
    };

    const intervalId = setInterval(checkDevTools, 800);
    window.addEventListener("resize", checkDevTools);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("resize", checkDevTools);
    };
  }, [isUnlocked]);

  // Keyboard shortcut listener for Owner Bypass (Cmd/Ctrl + Option/Alt + Shift + D)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      if (metaOrCtrl && e.altKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const nextState = !isUnlocked;
        setIsUnlocked(nextState);
        if (nextState) {
          localStorage.setItem("portfolio_dev_unlocked", "true");
          setIsDevToolsOpen(false);
          showToast("🔓 Developer Mode Unlocked");
        } else {
          localStorage.removeItem("portfolio_dev_unlocked");
          showToast("🔒 Developer Protection Active");
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isUnlocked]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-250">
          <div className="px-4 py-2.5 rounded-full bg-neutral-950/95 border border-neutral-800 text-xs font-mono text-neutral-200 shadow-2xl flex items-center gap-2.5 backdrop-blur-xl">
            {isUnlocked ? (
              <IconLockOpen className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <IconLock className="w-3.5 h-3.5 text-red-400" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Premium Editorial DevTools Overlay (Triggers ONLY when DevTools is open) */}
      {isDevToolsOpen && !isUnlocked && (
        <div className="fixed inset-0 z-[99999] bg-black/96 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 select-none">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[160px] pointer-events-none" />

          {/* Minimalist Grid Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative max-w-md w-full bg-neutral-950/95 border border-neutral-800/90 rounded-3xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.9)] text-center space-y-6 backdrop-blur-2xl overflow-hidden">
            {/* Top Muted Red Highlight Line */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />

            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/60 text-[10px] font-mono font-semibold text-red-400 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              DEVTOOLS DETECTED
            </div>

            {/* Title & Editorial Subheading */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Restricted Environment Notice
              </h2>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-sm mx-auto">
                Developer inspection tools are currently open. Please close DevTools to continue exploring the application.
              </p>
            </div>

            {/* Technical Telemetry Specs Card */}
            <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800 text-left font-mono text-[11px] text-neutral-300 space-y-2">
              <div className="text-neutral-500 text-[10px] uppercase tracking-wider pb-1 border-b border-neutral-800/80 flex justify-between">
                <span>Security Spec</span>
                <span className="text-red-400">Restricted</span>
              </div>
              <div className="space-y-1 text-neutral-400">
                <div className="flex justify-between">
                  <span>Inspector Status:</span>
                  <span className="text-neutral-200">Active Window</span>
                </div>
                <div className="flex justify-between">
                  <span>Source Protection:</span>
                  <span className="text-neutral-200">Enforced</span>
                </div>
              </div>
            </div>

            {/* Clean Action Button */}
            <div className="pt-2 flex flex-col items-center justify-center gap-3">
              <button
                onClick={() => setIsDevToolsOpen(false)}
                className="w-full px-6 py-3 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <IconX className="w-3.5 h-3.5 text-neutral-400" />
                <span>Close Inspector &amp; Continue</span>
              </button>
            </div>

            {/* Discreet Owner Shortcut Hint */}
            <p className="text-[10px] font-mono text-neutral-600">
              Owner Mode: <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">Cmd+Opt+Shift+D</kbd>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
