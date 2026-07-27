"use client";

import React from "react";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";

export interface WorkProjectItem {
  id: string;
  category: string;
  date: string;
  title: string;
  tagline: string;
  imageSrc: string;
  gradient: string;
  link: string;
  techStack: Array<{ name: string }>;
}

export const WORK_PAGE_PROJECTS: WorkProjectItem[] = [
  {
    id: "01",
    category: "WEB APP",
    date: "Q2 2026",
    title: "AlgoArena",
    tagline: "Real-time competitive coding & hackathon management platform built for speed",
    imageSrc: "/projects-algoarena.png",
    gradient: "bg-gradient-to-br from-pink-600 via-pink-700 to-rose-900",
    link: "https://algoarena.live",
    techStack: [
      { name: "NEXT.JS 14" },
      { name: "TYPESCRIPT" },
      { name: "TAILWIND CSS" },
      { name: "FIREBASE" },
      { name: "GSAP" },
      { name: "VERCEL" },
    ],
  },
  {
    id: "02",
    category: "DEV PORTFOLIO",
    date: "Q4 2024",
    title: "Personal Portfolio",
    tagline: "Ultra-fast Next.js portfolio featuring WebGL glassmorphism and custom audio interactive features",
    imageSrc: "/projects-portfolio.png",
    gradient: "bg-gradient-to-br from-indigo-600 via-blue-700 to-purple-900",
    link: "https://warunadev.vercel.app",
    techStack: [
      { name: "NEXT.JS 15" },
      { name: "REACT 19" },
      { name: "TYPESCRIPT" },
      { name: "TAILWIND CSS" },
      { name: "THREE.JS" },
      { name: "BUN" },
      { name: "VERCEL" },
    ],
  },
  {
    id: "03",
    category: "IDEATHON PLATFORM",
    date: "Q1 2025",
    title: "Beauty Of Cloud",
    tagline: "Inter-university cloud computing ideathon platform engineered with MongoDB Atlas",
    imageSrc: "/projects-beautyofcloud.png",
    gradient: "bg-gradient-to-br from-slate-700 via-neutral-800 to-slate-900",
    link: "https://beautyof.cloud",
    techStack: [
      { name: "NEXT.JS" },
      { name: "MONGODB" },
      { name: "TYPESCRIPT" },
      { name: "TAILWIND CSS" },
      { name: "SANITY CMS" },
      { name: "VERCEL" },
    ],
  },
];

export const WorkProjects = () => {
  return (
    <div className="w-full relative z-10">
      {/* Section Title */}
      <div className="text-center mb-16 sm:mb-20">
        <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3">
          CASE STUDIES
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
          Curated <AuroraText className="italic font-serif">Work</AuroraText>
        </h2>
      </div>

      {/* Side-by-Side 2-Column Staggered Grid with Dotted Blueprint Borders */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        {/* Central Vertical Dotted Separator with Intersection Dots (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] border-r border-dashed border-neutral-700/80 -translate-x-1/2 pointer-events-none z-10">
          <div className="absolute top-0 -left-[5px] w-3 h-3 rounded-full bg-neutral-950 border border-neutral-400 shadow-[0_0_10px_rgba(255,255,255,0.4)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
          <div className="absolute top-1/2 -left-[5px] w-3 h-3 rounded-full bg-neutral-950 border border-neutral-400 shadow-[0_0_10px_rgba(255,255,255,0.4)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
          <div className="absolute bottom-0 -left-[5px] w-3 h-3 rounded-full bg-neutral-950 border border-neutral-400 shadow-[0_0_10px_rgba(255,255,255,0.4)] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-white" />
          </div>
        </div>

        {WORK_PAGE_PROJECTS.map((project, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <div
              key={project.id}
              className={`relative flex flex-col space-y-4 group p-6 rounded-3xl bg-neutral-950/70 border border-dashed border-neutral-800/90 backdrop-blur-xl shadow-2xl ${
                isEven ? "md:mt-20" : ""
              }`}
            >
              {/* Corner Intersection Node */}
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-neutral-950 border border-neutral-400 shadow-[0_0_8px_rgba(255,255,255,0.5)] flex items-center justify-center z-20">
                <div className="w-1 h-1 rounded-full bg-white" />
              </div>

              {/* Meta Bar */}
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-dashed border-neutral-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-neutral-500 font-semibold">{project.id}</span>
                  <span className="w-6 h-[1px] bg-neutral-700" />
                  <span className="tracking-widest uppercase text-neutral-300">
                    {project.category}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-700/80 text-[11px] font-mono text-neutral-300 shadow-sm">
                  {project.date}
                </span>
              </div>

              {/* Project Title */}
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors">
                {project.title}
              </h3>

              {/* Compact Hero Card Container */}
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative rounded-2xl p-5 sm:p-6 ${project.gradient} border border-white/20 shadow-2xl overflow-hidden block transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group/card`}
              >
                {/* Top Tagline & Arrow */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="text-white/95 text-xs sm:text-sm font-sans font-medium leading-relaxed max-w-xs">
                    {project.tagline}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white flex-shrink-0 group-hover/card:bg-white group-hover/card:text-black group-hover/card:rotate-45 transition-all duration-300">
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>
                </div>

                {/* Compact Embedded Screenshot Container */}
                <div className="relative w-full aspect-[16/10] max-h-[220px] rounded-xl overflow-hidden bg-neutral-950 border border-white/20 shadow-xl mt-2">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className="object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                  />
                </div>
              </a>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] font-mono font-medium text-neutral-300 tracking-wider hover:border-neutral-700 transition-colors"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkProjects;
