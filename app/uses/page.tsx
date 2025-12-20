"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavBar } from "@/app/ui/TubelightNavbar";
import Footer from "@/app/sections/Footer";
import { IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

interface Tool {
  name: string;
  icon: string;
  link?: string;
}

const tools: Tool[] = [
  { name: "VSCode", icon: "/icons8-vs-code-96.png", link: "https://code.visualstudio.com/" },
  { name: "IntelliJ IDEA", icon: "/icons8-intellij-idea-96.png", link: "https://www.jetbrains.com/idea/" },
  { name: "Postman", icon: "/icons8-postman-inc-96.png", link: "https://www.postman.com/" },
  { name: "DBeaver", icon: "/icons8-dbeaver.png", link: "https://dbeaver.io/" },
  { name: "Figma", icon: "/icons8-figma-96.png", link: "https://www.figma.com/" },
  { name: "Framer", icon: "/framer-logo.png", link: "https://www.framer.com/" },
  { name: "Notion", icon: "/notion-logo-icon.png", link: "https://www.notion.so/" },
  { name: "Obsidian", icon: "/obsidian-icon.png", link: "https://obsidian.md/" },
  { name: "ClickUp", icon: "https://img.icons8.com/?size=100&id=znqq179L1K9g&format=png&color=000000", link: "https://clickup.com/" },
  { name: "ToDo", icon: "https://img.icons8.com/?size=100&id=HpPqCqynotVp&format=png&color=000000", link: "https://todo.microsoft.com/" },
  { name: "Calendar", icon: "/notion-calendar.png", link: "https://www.notion.so/product/calendar" },
  { name: "GCalendar", icon: "https://img.icons8.com/?size=100&id=DEJypxE54F9v&format=png&color=000000", link: "https://calendar.google.com/" },
  { name: "NotebookLM", icon: "/notebooklm.png", link: "https://notebooklm.google/" },
  { name: "Gemini CLI", icon: "/gemini-cli-icon.png", link: "https://geminicli.com/" },
  { name: "ChatWise", icon: "/chat-wise.png", link: "https://chatwise.app/" },
  { name: "Spotify", icon: "/spotify-logo.png", link: "https://www.spotify.com/" },
  { name: "Opal", icon: "/opal.png", link: "https://www.opal.so/" },
  { name: "Opencode", icon: "/opencode-logo-dark.png", link: "https://opencode.ai/" },
];

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-[var(--color-8)] transition-all duration-500 flex items-center justify-center overflow-hidden hover:shadow-[0_0_30px_rgba(var(--color-8-rgb),0.6)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-8)]/0 to-[var(--color-9)]/0 group-hover:from-[var(--color-8)]/20 group-hover:to-[var(--color-9)]/20 transition-all duration-500" />
        
        <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14">
          <Image
            src={tool.icon}
            alt={tool.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      </div>

      <p className="mt-3 text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors duration-300 font-medium text-center">
        {tool.name}
      </p>
    </a>
  );
}

export default function UsesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { name: 'Home', url: '/', icon: IconHome  },
    { name: 'About', url: '/#about', icon: IconUser },
    { name: 'Projects', url: '/#projects', icon: IconBriefcase },
    { name: 'More', url: '/uses', icon: IconFileText }
  ]

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // Inverse of Hero animation - expand on scroll
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Start small with rounded corners, expand to full screen
    scrollTl.fromTo(container, 
      {
        scale: 0.85,
        borderRadius: "32px",
      },
      {
        scale: 1,
        borderRadius: "0px",
        ease: "none",
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        {/* Static Header Section */}
        <section className="relative pt-32 pb-6 px-4 sm:px-6 bg-black">
          <div className="container mx-auto max-w-6xl">
            

            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-4">
                Tools that power my{' '}
                <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">
                  workflow
                </span>
              </h2>
              <h2 className="text-sm text-gray-400 uppercase tracking-wider">
                Software and tools I use daily for development, design, and productivity
              </h2>
            </div>
          </div>
        </section>

        {/* Animated Container - Only tools */}
        <section 
          ref={containerRef}
          className="relative min-h-screen py-12 px-4 sm:px-6 bg-black overflow-hidden"
          style={{ transformOrigin: "center center" }}
        >
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* Tools Grid - Centered like the reference image */}
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10 lg:gap-12">
              {tools.map((tool, index) => (
                <div
                  key={tool.name}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animationFillMode: 'both',
                  }}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-700"
                >
                  <ToolCard tool={tool} />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <NavBar items={navItems} />
    </>
  );
}
