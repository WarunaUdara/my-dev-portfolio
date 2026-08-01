"use client";

import React, { useEffect, useState } from "react";
import { IconShieldLock, IconShieldExclamation, IconLock, IconLockOpen, IconX, IconAlertTriangle } from "@tabler/icons-react";

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

    // Expose unlock function in global window for owner convenience
    (window as any).unlockDev = () => {
      localStorage.setItem("portfolio_dev_unlocked", "true");
      setIsUnlocked(true);
      setIsDevToolsOpen(false);
      console.log("%c 🔓 Developer Bypass Enabled", "color: #34d399; font-size: 16px; font-weight: bold;");
      return "Developer bypass mode unlocked!";
    };

    (window as any).lockDev = () => {
      localStorage.removeItem("portfolio_dev_unlocked");
      setIsUnlocked(false);
      console.log("%c 🔒 Developer Protection Reactivated", "color: #f87171; font-size: 16px; font-weight: bold;");
      return "Developer protection reactivated.";
    };
  }, []);

  // Print psychological warning banner in browser console
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    console.clear();
    console.log(
      "%c 🛑 SECURITY WARNING & ACCESS NOTICE 🛑 ",
      "background: #dc2626; color: #ffffff; font-size: 24px; font-weight: bold; padding: 8px 16px; border-radius: 8px;"
    );
    console.log(
      "%c This browser functionality is monitored. Unauthorized inspection or source manipulation is logged via session telemetry.\n\n" +
        "If you are the portfolio owner, press [ Cmd + Option + Shift + D ] or type unlockDev() to bypass.",
      "font-size: 14px; color: #cbd5e1; line-height: 1.6; font-family: monospace;"
    );
  }, [isUnlocked]);

  // DevTools detection loop
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    const threshold = 160;

    const checkDevTools = () => {
      // Metric 1: Outer vs Inner dimension difference (docked DevTools)
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;

      // Metric 2: Debugger execution timing check
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

  // Event Listeners: Block right-click & DevTools keyboard shortcuts
  useEffect(() => {
    if (typeof window === "undefined" || isUnlocked) return;

    // Block right-click context menu for users
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      showToast("🔒 Right-click inspect is disabled for security.");
    };

    // Block keyboard shortcuts (F12, Cmd+Opt+I, Cmd+Opt+J, Cmd+Opt+C, Cmd+U, Ctrl+Shift+I)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const metaOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // Owner Bypass Shortcut: Cmd/Ctrl + Option/Alt + Shift + D
      if (metaOrCtrl && e.altKey && e.shiftKey && e.key.toLowerCase() === "d") {
        e.preventDefault();
        const nextState = !isUnlocked;
        setIsUnlocked(nextState);
        if (nextState) {
          localStorage.setItem("portfolio_dev_unlocked", "true");
          setIsDevToolsOpen(false);
          showToast("🔓 Developer Bypass Mode Active");
        } else {
          localStorage.removeItem("portfolio_dev_unlocked");
          showToast("🔒 Developer Protection Reactivated");
        }
        return;
      }

      // F12 key
      if (e.key === "F12") {
        e.preventDefault();
        setIsDevToolsOpen(true);
        showToast("🔒 F12 Developer Tools Disabled");
      }

      // Cmd+Opt+I or Ctrl+Shift+I (Inspect)
      if (metaOrCtrl && (e.shiftKey || e.altKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsDevToolsOpen(true);
        showToast("🔒 Developer Inspect Disabled");
      }

      // Cmd+Opt+J or Ctrl+Shift+J (Console)
      if (metaOrCtrl && (e.shiftKey || e.altKey) && e.key.toLowerCase() === "j") {
        e.preventDefault();
        setIsDevToolsOpen(true);
        showToast("🔒 Developer Console Disabled");
      }

      // Cmd+Opt+C or Ctrl+Shift+C (Inspect Element)
      if (metaOrCtrl && (e.shiftKey || e.altKey) && e.key.toLowerCase() === "c") {
        e.preventDefault();
        setIsDevToolsOpen(true);
        showToast("🔒 Element Inspector Disabled");
      }

      // Cmd+U or Ctrl+U (View Source)
      if (metaOrCtrl && e.key.toLowerCase() === "u") {
        e.preventDefault();
        setIsDevToolsOpen(true);
        showToast("🔒 Source Code Inspection Disabled");
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUnlocked]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2800);
  };

  // If unlocked for owner or DevTools not open, render only non-intrusive toast if active
  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-[9999] pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="px-4 py-3 rounded-xl bg-neutral-950/95 border border-red-500/40 backdrop-blur-xl text-xs font-mono text-neutral-200 shadow-2xl flex items-center gap-3">
            {isUnlocked ? (
              <IconLockOpen className="w-4 h-4 text-emerald-400" />
            ) : (
              <IconLock className="w-4 h-4 text-red-400 animate-pulse" />
            )}
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Psychological Warning Overlay (Full Screen, High Contrast Red/Silver Security Aesthetic) */}
      {isDevToolsOpen && !isUnlocked && (
        <div className="fixed inset-0 z-[99999] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300 select-none">
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

          {/* Glowing Red Radial Background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative max-w-lg w-full bg-neutral-950/90 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_0_80px_rgba(239,68,68,0.25)] text-center space-y-6 backdrop-blur-2xl">
            {/* Animated Shield Icon */}
            <div className="relative mx-auto w-20 h-20 rounded-2xl bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]">
              <IconShieldLock className="w-10 h-10 animate-bounce" />
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 animate-ping" />
            </div>

            {/* Title & Warning Message */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-800 text-[11px] font-mono font-bold text-red-400 uppercase tracking-widest">
                <IconAlertTriangle className="w-3.5 h-3.5" />
                <span>SECURITY PROTOCOL ENGAGED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight pt-2">
                Developer Inspection Detected
              </h2>
              <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-md mx-auto pt-1">
                Attempting to inspect page elements, source code, or console assets triggers real-time session monitoring.
              </p>
            </div>

            {/* Psychological Security Telemetry Box */}
            <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 text-left font-mono text-xs text-neutral-300 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-neutral-800/80 text-[11px]">
                <span className="text-neutral-400 uppercase tracking-wider">Telemetry Status</span>
                <span className="text-red-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  ACTIVE LOGGING
                </span>
              </div>
              <div className="space-y-1 text-neutral-400 text-[11px]">
                <p>• Action: Source asset &amp; DOM inspection</p>
                <p>• Telemetry: Session footprint registered</p>
                <p>• Resolution: Close Developer Tools window</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => setIsDevToolsOpen(false)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <IconX className="w-4 h-4" />
                <span>Close Inspector &amp; Return</span>
              </button>
            </div>

            {/* Small Owner Hint */}
            <p className="text-[10px] font-mono text-neutral-400 opacity-60">
              Portfolio Owner Bypass: Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300">Cmd+Opt+Shift+D</kbd>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
