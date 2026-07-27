"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/ui/Image";
import Scales from "@/components/ui/scales";
import { NavBar } from "@/app/ui/TubelightNavbar";
import Footer from "@/app/sections/Footer";
import { IconHome, IconUser, IconBriefcase, IconFileText } from "@tabler/icons-react";

interface ToolItem {
  name: string;
  category?: string;
  icon?: string;
  svgIcon?: React.ReactNode;
}

const CRAFT_TOOLS: ToolItem[] = [
  { name: "Zed", icon: "/icons8-vs-code-96.png" },
  { name: "Claude Code", icon: "/notebooklm.png" },
  { name: "Ghostty", icon: "/ghostty.webp" },
  { name: "Arc", icon: "/chat-wise.png" },
  { name: "Linear", icon: "/notion-logo-icon.png" },
  { name: "Figma", icon: "/icons8-figma-96.png" },
  { name: "Docker", icon: "/icons8-docker-144.png" },
  { name: "VS Code", icon: "/icons8-vs-code-96.png" },
  { name: "IntelliJ IDEA", icon: "/icons8-intellij-idea-96.png" },
  { name: "Postman", icon: "/icons8-postman-inc-96.png" },
  { name: "DBeaver", icon: "/icons8-dbeaver.png" },
];

const CLI_TOOLS: ToolItem[] = [
  { name: "Zsh", icon: "/icons8-git-144.png" },
  { name: "tmux", icon: "/icons8-github-50.png" },
  { name: "LazyGit", icon: "/icons8-git-144.png" },
  { name: "Neovim", icon: "/opencode-logo-dark.png" },
  { name: "Gemini CLI", icon: "/gemini-cli-icon.png" },
  { name: "Starship", icon: "/codex-color.webp" },
  { name: "GitHub CLI", icon: "/icons8-github-50.png" },
  { name: "Homebrew", icon: "/Bun.png" },
];

const DAILY_APPS: ToolItem[] = [
  { name: "Raycast", icon: "/opal.png" },
  { name: "Notion", icon: "/notion-logo-icon.png" },
  { name: "CleanShot X", icon: "/chat-wise.png" },
  { name: "1Password", icon: "/google-firebase-logo-icon-hd.png" },
  { name: "Spotify", icon: "/spotify-logo.png" },
  { name: "Obsidian", icon: "/obsidian-icon.png" },
  { name: "Opal", icon: "/opal.png" },
  { name: "Notion Calendar", icon: "/notion-calendar.png" },
];

function ToolBadgeGrid({ items }: { items: ToolItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {items.map((tool) => (
        <div
          key={tool.name}
          className="group flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/90 transition-all duration-300 shadow-md"
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
            {tool.icon ? (
              <Image
                src={tool.icon}
                alt={tool.name}
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-white font-bold text-sm">
                {tool.name.substring(0, 2)}
              </div>
            )}
          </div>
          <span className="text-xs sm:text-sm font-sans font-medium text-neutral-300 group-hover:text-white transition-colors text-center">
            {tool.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function UsesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Projects", url: "/#projects", icon: IconBriefcase },
    { name: "More", url: "/uses", icon: IconFileText },
  ];

  useEffect(() => {
    if (timelineRef.current) {
      setContentHeight(timelineRef.current.getBoundingClientRect().height);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 15%", "end 85%"],
  });

  const lineHeightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, contentHeight]
  );
  const lineOpacityTransform = useTransform(
    scrollYProgress,
    [0, 0.1],
    [0, 1]
  );

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Side Scales Borders */}
      <div className="fixed top-0 bottom-0 left-0 w-6 sm:w-10 z-20 border-r border-neutral-800/60 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-30" />
      </div>
      <div className="fixed top-0 bottom-0 right-0 w-6 sm:w-10 z-20 border-l border-neutral-800/60 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-30" />
      </div>

      {/* Main Container */}
      <main className="relative pt-28 sm:pt-36 pb-20 px-4 sm:px-12 max-w-7xl mx-auto">
        {/* Header matching Image 1 */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-3">
            THE GEAR
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            What Powers{" "}
            <span className="italic bg-gradient-to-r from-pink-500 via-purple-400 to-orange-400 bg-clip-text text-transparent">
              My Work
            </span>
          </h1>
        </div>

        {/* Scroll Follow Timeline Container */}
        <div ref={containerRef} className="relative w-full">
          <div ref={timelineRef} className="relative space-y-20 sm:space-y-28">

            {/* 01: Setup. The Hardware */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-start items-start">
              {/* Sticky Title Column */}
              <div className="md:sticky md:top-36 self-start md:w-80 flex-shrink-0 z-30">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  01
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Setup.
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-400 italic font-normal">
                  The Hardware
                </h3>
              </div>

              {/* Hardware Card - Identical to Image 1 */}
              <div className="w-full flex-1">
                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl group">
                  {/* Subtle Background Glow */}
                  <div className="absolute inset-0 bg-radial from-neutral-800/20 via-black to-black pointer-events-none" />

                  {/* MacBook Display Box */}
                  <div className="relative w-full aspect-[16/10] max-h-[420px] mx-auto rounded-2xl overflow-hidden bg-neutral-900/60 border border-neutral-800/80 flex items-center justify-center p-4 sm:p-8">
                    {/* Dark gradient backdrop behind MacBook */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-sky-950/30 via-neutral-900 to-neutral-950" />
                    
                    {/* MacBook Air Mockup */}
                    <div className="relative w-full h-full max-w-[620px] flex flex-col items-center justify-center z-10">
                      {/* Screen */}
                      <div className="relative w-[85%] aspect-[16/10] bg-neutral-950 rounded-t-xl border-2 border-neutral-700 shadow-2xl overflow-hidden">
                        {/* Display Wallpaper */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-neutral-950 to-blue-950 opacity-90" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-28 h-28 rounded-full bg-sky-500/10 blur-xl animate-pulse" />
                          <span className="font-serif italic text-white/40 text-lg">macOS Sequoia</span>
                        </div>
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-black rounded-b-md" />
                      </div>
                      {/* Base Keyboard Deck */}
                      <div className="relative w-[96%] h-3 bg-gradient-to-b from-neutral-700 to-neutral-800 rounded-b-xl border-x border-b border-neutral-600 shadow-xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-neutral-500/50 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* Specs & Hardware Meta Bar */}
                  <div className="mt-6 pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h4 className="text-white font-sans font-bold text-base sm:text-lg">
                        MacBook Air M4
                      </h4>
                      <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-0.5">
                        16GB Unified Memory · 512GB SSD
                      </p>
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[10px] sm:text-xs font-mono font-semibold text-sky-400 tracking-wider uppercase">
                      SKY BLUE
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 02: Craft. Dev Environment */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-start items-start">
              {/* Sticky Title Column */}
              <div className="md:sticky md:top-36 self-start md:w-80 flex-shrink-0 z-30">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  02
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Craft.
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-400 italic font-normal">
                  Dev Environment
                </h3>
              </div>

              {/* Craft Tools Grid */}
              <div className="w-full flex-1">
                <ToolBadgeGrid items={CRAFT_TOOLS} />
              </div>
            </div>

            {/* 03: CLI. Keyboard First */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-start items-start">
              {/* Sticky Title Column */}
              <div className="md:sticky md:top-36 self-start md:w-80 flex-shrink-0 z-30">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  03
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  CLI.
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-400 italic font-normal">
                  Keyboard First
                </h3>
              </div>

              {/* CLI Tools Grid */}
              <div className="w-full flex-1">
                <ToolBadgeGrid items={CLI_TOOLS} />
              </div>
            </div>

            {/* 04: Apps. Daily Flow */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 justify-start items-start">
              {/* Sticky Title Column */}
              <div className="md:sticky md:top-36 self-start md:w-80 flex-shrink-0 z-30">
                <span className="font-mono text-xs text-neutral-500 block mb-1">
                  04
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white leading-tight">
                  Apps.
                </h2>
                <h3 className="text-xl sm:text-2xl font-serif text-neutral-400 italic font-normal">
                  Daily Flow
                </h3>
              </div>

              {/* Daily Apps Grid */}
              <div className="w-full flex-1">
                <ToolBadgeGrid items={DAILY_APPS} />
              </div>
            </div>

          </div>

          {/* Scroll-Follow Line Indicator (matching Volunteering Timeline) */}
          <div
            style={{ height: contentHeight + "px" }}
            className="absolute left-0 md:left-80 top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-800 to-transparent pointer-events-none hidden md:block"
          >
            <motion.div
              style={{
                height: lineHeightTransform,
                opacity: lineOpacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#64748b] via-[#cbd5e1] to-transparent rounded-full"
            />
          </div>
        </div>
      </main>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
