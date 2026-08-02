"use client";

import React, { useEffect, useState } from "react";
import { IconLock, IconLockOpen } from "@tabler/icons-react";

interface DevToolsWindow extends Window {
  unlockDev?: () => string;
  lockDev?: () => string;
}

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

    const devWindow = window as unknown as DevToolsWindow;

    // Global helper methods for portfolio owner
    devWindow.unlockDev = () => {
      localStorage.setItem("portfolio_dev_unlocked", "true");
      setIsUnlocked(true);
      setIsDevToolsOpen(false);
      return "Developer bypass mode unlocked!";
    };

    devWindow.lockDev = () => {
      localStorage.removeItem("portfolio_dev_unlocked");
      setIsUnlocked(false);
      return "Developer protection reactivated.";
    };
  }, []);

  // DevTools detection loop (sticky: overlay stays up until DevTools is closed)
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    const threshold = 160;
    const graceMs = 3000;

    // Any positive signal (docked size change, console trap firing, or a
    // DevTools keyboard shortcut) refreshes this timestamp. The overlay only
    // clears once the signal has been quiet for the grace period, which
    // prevents the flicker from undocked DevTools toggling the size check.
    let lastSignal = 0;

    const trapImage = new Image();
    Object.defineProperty(trapImage, "id", {
      get: () => {
        lastSignal = Date.now();
      },
    });

    const markOpen = () => {
      lastSignal = Date.now();
      setIsDevToolsOpen(true);
    };

    const detect = () => {
      // Docked DevTools shrink the viewport window.
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;
      const dockedOpen = widthDiff > threshold || heightDiff > threshold;

      if (dockedOpen) {
        lastSignal = Date.now();
      }

      setIsDevToolsOpen(dockedOpen || Date.now() - lastSignal <= graceMs);
    };

    // Undocked DevTools are caught via the console getter trap: the id getter
    // is only evaluated while the DevTools console is live, so each interval
    // tick refreshes the heartbeat. When DevTools closes the trap goes quiet.
    const trapInterval = setInterval(() => {
      console.dir(trapImage);
      detect();
    }, 1000);

    const dimensionInterval = setInterval(detect, 500);
    window.addEventListener("resize", detect);

    // Keyboard shortcuts that open DevTools trigger the overlay immediately
    const devToolsShortcuts = (e: KeyboardEvent) => {
      if (e.key === "F12") {
        markOpen();
        return;
      }

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      const key = e.key.toUpperCase();

      if (metaOrCtrl && e.shiftKey && ["I", "J", "C", "K"].includes(key)) {
        markOpen();
      } else if (metaOrCtrl && e.altKey && ["I", "J", "C"].includes(key)) {
        markOpen();
      }
    };
    window.addEventListener("keydown", devToolsShortcuts);

    return () => {
      clearInterval(trapInterval);
      clearInterval(dimensionInterval);
      window.removeEventListener("resize", detect);
      window.removeEventListener("keydown", devToolsShortcuts);
    };
  }, [isUnlocked]);

  // Silently disable right-click while protection is active (no warning shown)
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    const blockContextMenu = (e: MouseEvent) => e.preventDefault();
    window.addEventListener("contextmenu", blockContextMenu);

    return () => window.removeEventListener("contextmenu", blockContextMenu);
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
          showToast("Developer Mode Unlocked");
        } else {
          localStorage.removeItem("portfolio_dev_unlocked");
          showToast("Developer Protection Active");
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

      {/* Premium Editorial DevTools Overlay (stays visible until DevTools is closed) */}
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
                Developer inspection tools are currently open. Close DevTools to continue exploring the application.
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

            {/* Instruction */}
            <p className="pt-2 text-xs font-mono text-neutral-300">
              The screen will unlock automatically once Developer Tools are closed.
            </p>

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
