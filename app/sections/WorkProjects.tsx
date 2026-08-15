"use client";

import React from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuroraText from "@/components/ui/aurora-text";
import { IconUsers, IconExternalLink } from "@tabler/icons-react";

export interface TechStackItem {
  name: string;
  icon?: string;
}

export interface WorkProjectItem {
  id: string;
  category: string;
  date: string;
  title: string;
  tagline: string;
  teamMembers?: string[];
  imageSrc: string;
  gradient: string;
  link: string;
  techStack: TechStackItem[];
}

export const WORK_PAGE_PROJECTS: WorkProjectItem[] = [
  {
    id: "01",
    category: "MICROSERVICES EDTECH",
    date: "IN PROGRESS 🚧",
    title: "StudEd",
    tagline: "Subscription-based Sri Lankan educational platform with 11 Go microservices, GraphQL, & native 3Dmol/Manim visualizers",
    imageSrc: "/projects/studed.webp",
    gradient: "bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-950",
    link: "/blog/studed-microservices-educational-platform",
    techStack: [
      { name: "REACT 19", icon: "/techstack-icons/react.webp" },
      { name: "GO 1.22", icon: "/techstack-icons/golang.webp" },
      { name: "GRAPHQL", icon: "/techstack-icons/graphql.webp" },
      { name: "TANSTACK ROUTER", icon: "/techstack-icons/tanstack.webp" },
      { name: "TANSTACK QUERY", icon: "/techstack-icons/tanstack.webp" },
      { name: "POSTGRESQL", icon: "/techstack-icons/postgresql.webp" },
      { name: "REDIS 7", icon: "/techstack-icons/redis.webp" },
      { name: "KUBERNETES", icon: "/techstack-icons/kubernetes.webp" },
      { name: "OPENTOFU", icon: "/techstack-icons/opentofu.webp" },
    ],

  },
  {
    id: "02",
    category: "REVAMP ECOSYSTEM",
    date: "Jun – Jul 2026",
    title: "JESA 2026",
    tagline: "J'pura Employability Skills Awards official web platform, admin control centre & dynamic form workflow engine",
    teamMembers: ["Waruna Udara (IT Ops Head)", "Pruthivi Thejan", "Dharaka Meth", "Yesith Sri Hansana", "Pasindu Jeewan"],
    imageSrc: "/projects/jesa.webp",
    gradient: "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950",
    link: "https://jesa.lk",
    techStack: [
      { name: "NEXT.JS 15", icon: "/techstack-icons/nextjs.webp" },
      { name: "REACT 19", icon: "/techstack-icons/react.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "FIREBASE", icon: "/techstack-icons/firebase.webp" },
      { name: "NODE.JS 22", icon: "/techstack-icons/nodejs.webp" },
      { name: "VERCEL", icon: "/techstack-icons/vercel.webp" },
    ],

  },
  {
    id: "03",
    category: "TECH EVENT PLATFORM",
    date: "Feb – Mar 2026",
    title: "CRYPTX 2.0",
    tagline: "Official web platform for Sri Lanka's premier inter-university Hackathon, Designathon & CTF",
    teamMembers: ["Waruna Udara", "Malin Dhamsara", "Pruthivi Thejan", "Nuwan Konara"],
    imageSrc: "/projects/cryptx.webp",
    gradient: "bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-950",
    link: "https://cryptx.lk",
    techStack: [
      { name: "REACT", icon: "/techstack-icons/react.webp" },
      { name: "TANSTACK ROUTER", icon: "/techstack-icons/tanstack.webp" },
      { name: "TANSTACK QUERY", icon: "/techstack-icons/tanstack.webp" },
      { name: "APPWRITE", icon: "/techstack-icons/postgresql.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
    ],
  },
  {
    id: "04",
    category: "STARTUP PLATFORM",
    date: "2026",
    title: "EMWEE",
    tagline: "Official web platform for EMWEE startup ecosystem with modern web design & interactive UX",
    teamMembers: ["Waruna Udara", "Malin Dhamsara", "Vineth Ranathunga", "Farhan Hameeth", "Thisal Kokuhennadige"],
    imageSrc: "/projects/emwee.webp",
    gradient: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-950",
    link: "https://emwee.co",
    techStack: [
      { name: "REACT", icon: "/techstack-icons/react.webp" },
      { name: "TANSTACK ROUTER", icon: "/techstack-icons/tanstack.webp" },
      { name: "TANSTACK QUERY", icon: "/techstack-icons/tanstack.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "VERCEL", icon: "/techstack-icons/vercel.webp" },
    ],
  },
  {
    id: "05",
    category: "HACKATHON PLATFORM",
    date: "2025 – 2026",
    title: "AlgoArena",
    tagline: "Real-time competitive coding & hackathon management platform built for speed",
    imageSrc: "/projects-algoarena.webp",
    gradient: "bg-gradient-to-br from-pink-600 via-pink-700 to-rose-950",
    link: "https://algoarena.live",
    techStack: [
      { name: "NEXT.JS 14", icon: "/techstack-icons/nextjs.webp" },
      { name: "REACT", icon: "/techstack-icons/react.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "FIREBASE", icon: "/techstack-icons/firebase.webp" },
      { name: "VERCEL", icon: "/techstack-icons/vercel.webp" },
    ],
  },
  {
    id: "06",
    category: "DEV PORTFOLIO",
    date: "2024 – 2026",
    title: "Personal Portfolio",
    tagline: "High-performance SPA powered by TanStack Router, React 19, WebGL Shaders, & Experimental Micro-Interactions",
    imageSrc: "/projects-portfolio.webp",
    gradient: "bg-gradient-to-br from-indigo-600 via-purple-700 to-purple-950",
    link: "https://warunadev.vercel.app",
    techStack: [
      { name: "TANSTACK ROUTER", icon: "/techstack-icons/tanstack.webp" },
      { name: "REACT 19", icon: "/techstack-icons/react.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "BUN", icon: "/techstack-icons/bun.webp" },
      { name: "VERCEL", icon: "/techstack-icons/vercel.webp" },
    ],
  },
  {
    id: "07",
    category: "IDEATHON PLATFORM",
    date: "2025",
    title: "Beauty Of Cloud",
    tagline: "Inter-university cloud computing ideathon platform engineered with MongoDB Atlas",
    imageSrc: "/projects-beautyofcloud.webp",
    gradient: "bg-gradient-to-br from-slate-700 via-neutral-800 to-slate-950",
    link: "https://beautyof.cloud",
    techStack: [
      { name: "NEXT.JS", icon: "/techstack-icons/nextjs.webp" },
      { name: "REACT", icon: "/techstack-icons/react.webp" },
      { name: "MONGODB", icon: "/techstack-icons/mongodb.webp" },
      { name: "TYPESCRIPT", icon: "/techstack-icons/typescript.webp" },
      { name: "TAILWIND CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "VERCEL", icon: "/techstack-icons/vercel.webp" },
    ],
  },
];

export const WorkProjects = () => {
  return (
    <div className="w-full relative z-10">
      {/* Section Title */}
      <div className="text-center mb-16 sm:mb-20">
        <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3 font-semibold">
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
              className={`relative flex flex-col space-y-4 group p-6 rounded-3xl bg-neutral-950/80 border border-dashed border-neutral-800/90 backdrop-blur-xl shadow-2xl ${
                isEven ? "md:mt-20" : ""
              }`}
            >
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
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-amber-200 transition-colors">
                {project.title}
              </h3>

              {/* Team Members Tag */}
              {project.teamMembers && (
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <IconUsers className="w-4 h-4 text-neutral-400 shrink-0" />
                  <span className="truncate">Team: {project.teamMembers.join(", ")}</span>
                </div>
              )}

              {/* Compact Hero Card Container */}
              <Link
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : undefined}
                rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`relative rounded-2xl p-5 sm:p-6 ${project.gradient} border border-white/20 shadow-2xl overflow-hidden block transition-all duration-300 hover:-translate-y-1.5 cursor-pointer group/card`}
              >
                {/* Top Tagline & Arrow */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <p className="text-white/95 text-xs sm:text-sm font-sans font-medium leading-relaxed max-w-xs">
                    {project.tagline}
                  </p>
                  <div className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white flex-shrink-0 group-hover/card:bg-white group-hover/card:text-black group-hover/card:rotate-45 transition-all duration-300">
                    <IconExternalLink className="w-4 h-4" />
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
              </Link>

              {/* Tech Stack Badges with Logo Icons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-lg text-[10px] font-mono font-medium text-neutral-300 tracking-wider flex items-center gap-1.5 hover:border-neutral-700 transition-colors"
                  >
                    {tech.icon ? (
                      <Image
                        src={tech.icon}
                        alt={tech.name}
                        width={13}
                        height={13}
                        className="w-3.5 h-3.5 object-contain"
                      />
                    ) : null}
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
