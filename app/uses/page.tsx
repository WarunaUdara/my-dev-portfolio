"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "@/components/ui/Image";
import Scales from "@/components/ui/scales";
import AuroraText from "@/components/ui/aurora-text";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import { NavBar } from "@/app/ui/TubelightNavbar";
import Footer from "@/app/sections/Footer";
import { IconHome, IconUser, IconBriefcase, IconFileText } from "@tabler/icons-react";

interface ToolItem {
  name: string;
  icon: string;
  link?: string;
}

const CRAFT_TOOLS: ToolItem[] = [
  { name: "Zed", icon: "/zed.png", link: "https://zed.dev/" },
  { name: "VS Code", icon: "/icons8-vs-code-96.png", link: "https://code.visualstudio.com/" },
  { name: "IntelliJ IDEA", icon: "/icons8-intellij-idea-96.png", link: "https://www.jetbrains.com/idea/" },
  { name: "Postman", icon: "/icons8-postman-inc-96.png", link: "https://www.postman.com/" },
  { name: "DBeaver", icon: "/icons8-dbeaver.png", link: "https://dbeaver.io/" },
  { name: "Figma", icon: "/icons8-figma-96.png", link: "https://www.figma.com/" },
  { name: "Framer", icon: "/framer-logo.png", link: "https://www.framer.com/" },
];

const CLI_TOOLS: ToolItem[] = [
  { name: "Ghostty", icon: "/ghostty copy.webp", link: "https://ghostty.org/" },
  { name: "GitHub CLI", icon: "/icons8-github-50.png", link: "https://cli.github.com/" },
  { name: "Homebrew", icon: "/Homebrew.png", link: "https://brew.sh/" },
  { name: "Git Worktrees", icon: "/icons8-git-144.png" },
  { name: "Gemini CLI", icon: "/gemini-cli-icon.png", link: "https://geminicli.com/" },
  { name: "Opencode", icon: "/opencode-logo-dark.png", link: "https://opencode.ai/" },
  { name: "Codex", icon: "/codex-color.webp", link: "https://chatgpt.com/codex/cloud" },
];

const DAILY_APPS: ToolItem[] = [
  { name: "Notion", icon: "/notion-logo-icon.png", link: "https://www.notion.so/" },
  { name: "Notion Calendar", icon: "/notion-calendar.png", link: "https://www.notion.so/product/calendar" },
  { name: "Google Calendar", icon: "https://img.icons8.com/?size=100&id=DEJypxE54F9v&format=png&color=000000", link: "https://calendar.google.com/" },
  { name: "Obsidian", icon: "/obsidian-icon.png", link: "https://obsidian.md/" },
  { name: "NotebookLM", icon: "/notebooklm.png", link: "https://notebooklm.google/" },
  { name: "ChatWise", icon: "/chat-wise.png", link: "https://chatwise.app/" },
  { name: "ClickUp", icon: "https://img.icons8.com/?size=100&id=znqq179L1K9g&format=png&color=000000", link: "https://clickup.com/" },
  { name: "Microsoft ToDo", icon: "https://img.icons8.com/?size=100&id=HpPqCqynotVp&format=png&color=000000", link: "https://todo.microsoft.com/" },
  { name: "Spotify", icon: "/spotify-logo.png", link: "https://www.spotify.com/" },
  { name: "Opal", icon: "/opal.png", link: "https://www.opal.so/" },
];

function ToolBadgeGrid({ items }: { items: ToolItem[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {items.map((tool) => (
        <a
          key={tool.name}
          href={tool.link || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl bg-neutral-950/80 border border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/90 transition-all duration-300 shadow-sm"
        >
          <div className="relative w-7 h-7 sm:w-8 sm:h-8 mb-2 flex items-center justify-center">
            <Image
              src={tool.icon}
              alt={tool.name}
              fill
              className="object-contain group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <span className="text-xs font-sans font-medium text-neutral-300 group-hover:text-white transition-colors text-center truncate w-full">
            {tool.name}
          </span>
        </a>
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
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">
      {/* Side Scales Borders with Padding Offset & Framing */}
      <div className="fixed top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>
      <div className="fixed top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>

      {/* Frost Background Canvas */}
      <ScrollFrost height="h-[600px]" />

      {/* Main Content Container with Side Padding */}
      <main className="relative pt-28 sm:pt-36 pb-20 px-6 sm:px-16 md:px-24 max-w-7xl mx-auto z-10">
        {/* Header matching design sample */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <p className="text-xs font-mono uppercase tracking-[0.35em] text-neutral-400 font-semibold mb-3">
            THE GEAR
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            What Powers{" "}
            <AuroraText
              className="italic font-serif "
              colors={["#a717de", "#ff0cbd", "#3c34f3", "#ff6926"]}
              speed={1.2}
            >
              My Work
            </AuroraText>
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

              {/* Hardware Card - Using /uses/macbook.webp */}
              <div className="w-full flex-1">
                <div className="bg-neutral-950/90 border border-neutral-800/90 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl group">
                  {/* Subtle Ambient Radial Glow */}
                  <div className="absolute inset-0 bg-radial from-neutral-800/20 via-black to-black pointer-events-none" />

                  {/* MacBook Display Box */}
                  <div className="relative w-full aspect-[16/10] max-h-[440px] mx-auto rounded-2xl overflow-hidden bg-neutral-900/80 border border-neutral-800/80 flex items-center justify-center p-2 sm:p-4">
                    <Image
                      src="/uses/macbook.webp"
                      alt="MacBook Air M4"
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
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
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#a717de] via-[#ff0cbd] via-[#3c34f3] to-[#ff6926] rounded-full shadow-[0_0_12px_rgba(255,12,189,0.8)]"
            />
          </div>
        </div>
      </main>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
