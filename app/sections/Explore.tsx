"use client";

import React from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuroraText from "@/components/ui/aurora-text";
import {
  IconPencil,
  IconSparkles,
  IconArrowRight,
  IconListCheck,
  IconTerminal,
} from "@tabler/icons-react";

// Complete Tools & Apps List from Uses Section
const USES_TOOLS = [
  { name: "Zed", icon: "/zed.png" },
  { name: "VS Code", icon: "/icons8-vs-code-96.png" },
  { name: "IntelliJ IDEA", icon: "/icons8-intellij-idea-96.png" },
  { name: "Ghostty", icon: "/ghostty copy.webp" },
  { name: "Opencode", icon: "/opencode-logo-dark.png" },
  { name: "Postman", icon: "/icons8-postman-inc-96.png" },
  { name: "DBeaver", icon: "/icons8-dbeaver.png" },
  { name: "Figma", icon: "/icons8-figma-96.png" },
  { name: "Framer", icon: "/framer-logo.png" },
  { name: "GitHub CLI", icon: "/icons8-github-50.png" },
  { name: "Homebrew", icon: "/Homebrew.png" },
  { name: "Git", icon: "/icons8-git-144.png" },
  { name: "Gemini CLI", icon: "/gemini-cli-icon.png" },
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
    <section className="relative bg-black text-white py-16 overflow-hidden border-t border-neutral-900">
      {/* Subtle Slow Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-neutral-900/30 rounded-full blur-[130px] pointer-events-none" />

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
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/90 border border-neutral-800/80 text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase font-semibold">
            <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse" />
            <span>EXPLORE &amp; CONNECT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif leading-tight tracking-tight text-white">
            Explore, experiment <br />
            <AuroraText className="italic font-serif">
              &amp; say hello
            </AuroraText>
          </h2>
        </div>

        {/* Cards Grid — Compact Sleek Portfolio Cards (h-[330px]) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          
          {/* Card 1: SETUP & STACK */}
          <div className="group relative">
            <Link href="/uses" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-6 h-[330px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Hover Arrow Button */}
                <div className="absolute bottom-6 right-6 w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg z-10">
                  <IconArrowRight className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Featured Tool App Badges */}
                <div className="flex items-center justify-center gap-2.5 mb-3 mt-1">
                  <div className="relative w-12 h-12 bg-neutral-900/90 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 p-2">
                    <Image src="/obsidian-icon.png" alt="Obsidian" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="relative w-14 h-14 bg-neutral-900/90 border border-neutral-700 rounded-xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 p-2.5">
                    <Image src="/icons8-vs-code-96.png" alt="VSCode" width={34} height={34} className="object-contain" />
                  </div>
                  <div className="relative w-12 h-12 bg-neutral-900/90 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300 p-2">
                    <Image src="/notebooklm.png" alt="NotebookLM" width={28} height={28} className="object-contain" />
                  </div>
                </div>

                {/* Continuous Uses Tool Icons Marquee */}
                <div className="my-3 overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/90 to-transparent z-10 pointer-events-none" />
                  <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-black/90 to-transparent z-10 pointer-events-none" />
                  
                  <div className="flex gap-2 animate-marquee whitespace-nowrap py-1">
                    {[...USES_TOOLS, ...USES_TOOLS].map((tool, idx) => (
                      <div
                        key={`${tool.name}-${idx}`}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-[11px] font-mono shrink-0 whitespace-nowrap min-w-max"
                      >
                        <Image src={tool.icon} alt={tool.name} width={14} height={14} className="object-contain w-3.5 h-3.5 shrink-0" />
                        <span className="shrink-0">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-6 left-6 right-12 space-y-1">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                    SETUP &amp; STACK
                  </p>
                  <h3 className="text-base font-semibold text-white leading-snug font-sans">
                    Check out my favorite tools, hardware and developer spots.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2: BUCKET LIST */}
          <div className="group relative">
            <Link href="/bucket-list" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-6 h-[330px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Hover Arrow Button */}
                <div className="absolute bottom-6 right-6 w-8 h-8 bg-neutral-900 border border-neutral-800 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110 shadow-lg z-10">
                  <IconArrowRight className="w-3.5 h-3.5 text-white" />
                </div>

                {/* Bucket List Visual Preview */}
                <div className="relative h-40 mt-1 flex flex-col justify-center items-center gap-2.5">
                  <div className="w-full max-w-[220px] bg-neutral-900/90 border border-neutral-800 rounded-xl p-3 shadow-xl flex items-center justify-between group-hover:scale-105 transition-transform duration-300">
                    <div className="flex items-center gap-2">
                      <IconListCheck className="w-3.5 h-3.5 text-neutral-400" />
                      <span className="text-[11px] font-mono text-neutral-300">12 Goals Done</span>
                    </div>
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-800 px-2 py-0.5 rounded-full">30 Total</span>
                  </div>

                  <div className="w-full max-w-[220px] bg-neutral-900/90 border border-neutral-800 rounded-xl p-2.5 shadow-lg space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
                      <span>Speak to 1000 People</span>
                      <span className="text-white">70%</span>
                    </div>
                    <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[70%]" />
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-6 left-6 right-12 space-y-1">
                  <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-semibold">
                    THE BUCKET LIST
                  </p>
                  <h3 className="text-base font-semibold text-white leading-snug font-sans">
                    The things I&apos;ll do before I&apos;m done — life goals &amp; dreams.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3: GUESTBOOK SIGN CTA */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <Link href="/guestbook" className="block">
              <div className="relative bg-black/90 backdrop-blur-sm border border-neutral-800/80 shadow-[0_0_0_1px_rgba(255,255,255,.05),0_2px_4px_rgba(0,0,0,.4)] rounded-2xl p-6 h-[330px] overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:border-neutral-700">
                {/* Header Indicator */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-neutral-300 text-[10px] font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>Interactive Wall</span>
                  </div>
                  <IconSparkles className="w-4 h-4 text-neutral-300" />
                </div>

                {/* CTA Main Body */}
                <div className="space-y-2.5 my-4">
                  <h3 className="text-xl font-serif text-white font-medium leading-tight">
                    Leave your mark on my guestbook!
                  </h3>
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans">
                    Drop a message, share feedback, or say hello. Authentic notes from fellow developers and visitors.
                  </p>
                </div>

                {/* Bottom Sign CTA Bar */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pt-3.5 border-t border-neutral-900">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-xs">
                    <IconTerminal className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Sign Wall</span>
                  </div>

                  <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-mono font-semibold group-hover:bg-neutral-200 transition-colors shadow-lg group-hover:scale-105 transition-transform duration-200">
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
