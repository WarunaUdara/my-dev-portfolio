"use client";

import React from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuroraText from "@/components/ui/aurora-text";
import {
  IconPencil,
  IconSparkles,
  IconArrowRight,
  IconMessage,
  IconTerminal,
} from "@tabler/icons-react";

// Complete Tools & Apps List from Uses Section (Craft Tools, CLI Tools & Daily Apps)
const USES_TOOLS = [
  { name: "Zed", icon: "/zed.png" },
  { name: "VS Code", icon: "/icons8-vs-code-96.png" },
  { name: "IntelliJ IDEA", icon: "/icons8-intellij-idea-96.png" },
  { name: "Postman", icon: "/icons8-postman-inc-96.png" },
  { name: "DBeaver", icon: "/icons8-dbeaver.png" },
  { name: "Figma", icon: "/icons8-figma-96.png" },
  { name: "Framer", icon: "/framer-logo.png" },
  { name: "Ghostty", icon: "/ghostty copy.webp" },
  { name: "GitHub CLI", icon: "/icons8-github-50.png" },
  { name: "Homebrew", icon: "/Homebrew.png" },
  { name: "Git", icon: "/icons8-git-144.png" },
  { name: "Gemini CLI", icon: "/gemini-cli-icon.png" },
  { name: "Opencode", icon: "/opencode-logo-dark.png" },
  { name: "Codex", icon: "/codex-color.webp" },
  { name: "Notion", icon: "/notion-logo-icon.png" },
  { name: "Notion Calendar", icon: "/notion-calendar.png" },
  { name: "Obsidian", icon: "/obsidian-icon.png" },
  { name: "NotebookLM", icon: "/notebooklm.png" },
  { name: "ChatWise", icon: "/chat-wise.png" },
  { name: "Spotify", icon: "/spotify-logo.png" },
  { name: "Opal", icon: "/opal.png" },
];

export const Explore = () => {
  return (
    <section className="relative bg-black text-white py-24 overflow-hidden border-t border-neutral-900">
      {/* Subtle Slow Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-900/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header with AuroraText */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/90 border border-neutral-800/80 text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
            <span>EXPLORE &amp; CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif leading-tight tracking-tight text-white">
            Explore, experiment <br />
            <AuroraText className="italic font-serif">
              &amp; say hello
            </AuroraText>
          </h2>
        </div>

        {/* Cards Grid — Standardized Portfolio Card Background & Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1: SETUP & STACK (Matching standard card borders with full Uses tool icons marquee) */}
          <div className="group relative">
            <Link href="/uses" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-7 h-[390px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Hover Arrow Button */}
                <div className="absolute bottom-7 right-7 w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg z-10">
                  <IconArrowRight className="w-4 h-4 text-white" />
                </div>

                {/* Featured Tool App Badges */}
                <div className="flex items-center justify-center gap-3 mb-4 mt-2">
                  <div className="relative w-14 h-14 bg-neutral-900/90 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 p-2.5">
                    <Image src="/obsidian-icon.png" alt="Obsidian" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="relative w-16 h-16 bg-neutral-900/90 border border-neutral-700 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 p-3">
                    <Image src="/icons8-vs-code-96.png" alt="VSCode" width={40} height={40} className="object-contain" />
                  </div>
                  <div className="relative w-14 h-14 bg-neutral-900/90 border border-neutral-800 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 p-2.5">
                    <Image src="/notebooklm.png" alt="NotebookLM" width={32} height={32} className="object-contain" />
                  </div>
                </div>

                {/* Continuous Uses Tool Icons Marquee */}
                <div className="my-4 overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-2.5 animate-marquee whitespace-nowrap py-1">
                    {[...USES_TOOLS, ...USES_TOOLS].map((tool, idx) => (
                      <div
                        key={`${tool.name}-${idx}`}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-xs font-mono"
                      >
                        <Image src={tool.icon} alt={tool.name} width={16} height={16} className="object-contain w-4 h-4" />
                        <span>{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-7 left-7 right-14 space-y-1.5">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                    SETUP &amp; STACK
                  </p>
                  <h3 className="text-lg font-semibold text-white leading-snug font-sans">
                    Check out my favorite tools, hardware and developer spots.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2: COMMUNITY WALL (Floating Notes) */}
          <div className="group relative">
            <Link href="/guestbook" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-7 h-[390px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Hover Arrow Button */}
                <div className="absolute bottom-7 right-7 w-9 h-9 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg z-10">
                  <IconArrowRight className="w-4 h-4 text-white" />
                </div>

                {/* Floating Note Cards Display (Monochrome Portfolio Theme) */}
                <div className="relative h-48 mt-3 flex items-center justify-center">
                  <div className="absolute left-6 top-2 w-36 h-38 bg-neutral-900/90 rounded-2xl p-4 shadow-2xl border border-neutral-800/90 -rotate-12 group-hover:rotate-[-6deg] group-hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="space-y-2">
                      <div className="h-2 bg-neutral-700 rounded-full w-3/4" />
                      <div className="h-2 bg-neutral-800 rounded-full w-full" />
                      <div className="h-2 bg-neutral-800 rounded-full w-5/6" />
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <IconMessage className="w-4 h-4 text-neutral-400" />
                      <span className="text-[10px] font-mono text-neutral-400">Note</span>
                    </div>
                  </div>

                  <div className="absolute right-6 top-6 w-36 h-38 bg-neutral-900/90 rounded-2xl p-4 shadow-2xl border border-neutral-700/90 rotate-12 group-hover:rotate-[6deg] group-hover:scale-105 transition-all duration-300 overflow-hidden">
                    <div className="space-y-2">
                      <div className="h-2 bg-neutral-600 rounded-full w-2/3" />
                      <div className="h-2 bg-neutral-800 rounded-full w-full" />
                      <div className="h-2 bg-neutral-800 rounded-full w-4/5" />
                    </div>
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      <IconSparkles className="w-4 h-4 text-neutral-300" />
                      <span className="text-[10px] font-mono text-neutral-300">Signed</span>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-7 left-7 right-14 space-y-1.5">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                    COMMUNITY WALL
                  </p>
                  <h3 className="text-lg font-semibold text-white leading-snug font-sans">
                    Let me know you were here — read &amp; leave notes.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3: GUESTBOOK SIGN CTA */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <Link href="/guestbook" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-7 h-[390px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Header Indicator */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>Interactive Wall</span>
                  </div>
                  <IconSparkles className="w-5 h-5 text-neutral-300" />
                </div>

                {/* CTA Main Body */}
                <div className="space-y-3 my-5">
                  <h3 className="text-2xl font-serif text-white font-medium leading-tight">
                    Leave your mark on my guestbook!
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed font-sans">
                    Drop a message, share feedback, or say hello. Authentic notes from fellow developers and visitors.
                  </p>
                </div>

                {/* Bottom Sign CTA Bar */}
                <div className="absolute bottom-7 left-7 right-7 flex items-center justify-between pt-4 border-t border-neutral-900">
                  <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                    <IconTerminal className="w-4 h-4 text-neutral-500" />
                    <span>Sign Wall</span>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-mono font-semibold group-hover:bg-neutral-200 transition-colors shadow-lg group-hover:scale-105 transition-transform duration-200">
                    <IconPencil className="w-3.5 h-3.5" />
                    <span>Write Note</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Explore;
