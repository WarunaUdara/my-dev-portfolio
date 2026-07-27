"use client";

import React from "react";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";
import { IconTrophy, IconMedal, IconCode, IconExternalLink } from "@tabler/icons-react";

export interface ProjectItem {
  id: string;
  category: string;
  date: string;
  title: string;
  tagline: string;
  imageSrc: string;
  gradient: string;
  link: string;
  techStack: Array<{ name: string; icon?: string }>;
}

export interface HackathonItem {
  id: string;
  event: string;
  projectTitle: string;
  subtitle: string;
  date: string;
  awards: string[];
  description: string[];
  techStack: string[];
  gradient: string;
  link?: string;
}

export const WORK_PROJECTS: ProjectItem[] = [
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

export const HACKATHONS: HackathonItem[] = [
  {
    id: "H01",
    event: "Cursor Sri Lanka 24H Buildathon",
    projectTitle: "Turboship",
    subtitle: "Agentic AI Deployment Harness for Multi-Cloud Platforms",
    date: "May 2026",
    awards: ["🥈 2nd Place (n8n Track)", "🏅 14th Place Overall"],
    description: [
      "Turboship is an AI-powered Internal Developer Platform (IDP) control plane built during the Cursor Sri Lanka 24H Buildathon.",
      "Streamlines container deployment from Docker Hub with AI orchestration, AWS SigV4 security, Trivy vulnerability scanning, and automated multi-cloud provisioning to AWS ECS Fargate & Azure Container Apps."
    ],
    techStack: ["NEXT.JS", "N8N", "OPENAI GPT-5.5", "SUPABASE", "AWS SIGV4", "TRIVY", "VERCEL"],
    gradient: "from-amber-500/10 via-neutral-900/90 to-neutral-950",
  },
  {
    id: "H02",
    event: "CryptX 1.0 Hackathon",
    projectTitle: "NomadSpace",
    subtitle: "University of Sri Jayewardenepura Hackathon",
    date: "2024",
    awards: ["🏅 Top 15 Finalist (out of 100+ teams)"],
    description: [
      "Had a great experience at the CryptX 1.0 hackathon at the University of Sri Jayewardenepura!",
      "Presented an innovative platform solution connecting local vendors and digital nomads with co-working spaces in the Sri Lankan tourism industry, advancing to the Top 15 out of 100+ competing teams."
    ],
    techStack: ["REACT", "NEXT.JS", "WEB3", "TOURISM TECH", "TAILWIND CSS"],
    gradient: "from-purple-500/10 via-neutral-900/90 to-neutral-950",
  },
];

export const Projects = () => {
  return (
    <section id="work" className="relative min-h-screen bg-black text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      {/* Background Architectural Blueprint Line */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 space-y-28 sm:space-y-36">
        {/* SECTION 1: CURATED WORK */}
        <div>
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3">
              CASE STUDIES
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
              Curated <AuroraText className="italic font-serif">Work</AuroraText>
            </h2>
          </div>

          {/* Side-by-Side 2-Column Staggered Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-start">
            {WORK_PROJECTS.map((project, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={project.id}
                  className={`flex flex-col space-y-4 group ${
                    isEven ? "md:mt-16" : ""
                  }`}
                >
                  {/* Meta Bar */}
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-neutral-500">{project.id}</span>
                      <span className="w-8 h-[1px] bg-neutral-700" />
                      <span className="tracking-widest uppercase text-neutral-300">
                        {project.category}
                      </span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400">
                      {project.date}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Colorful Hero Card Box */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative rounded-3xl p-6 sm:p-8 ${project.gradient} border border-white/15 shadow-2xl overflow-hidden block transition-transform duration-500 hover:-translate-y-2 cursor-pointer group/card`}
                  >
                    {/* Top Tagline & Arrow */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <p className="text-white/90 text-sm sm:text-base font-sans font-medium leading-relaxed max-w-sm">
                        {project.tagline}
                      </p>
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white flex-shrink-0 group-hover/card:bg-white group-hover/card:text-black group-hover/card:rotate-45 transition-all duration-300">
                        <svg
                          className="w-4 h-4"
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

                    {/* Embedded Screenshot Container */}
                    <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-950 border border-white/20 shadow-2xl mt-4">
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
                        className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-[11px] font-mono font-medium text-neutral-300 tracking-wider hover:border-neutral-700 transition-colors"
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

        {/* SECTION 2: HACKATHONS & BUILDATHONS */}
        <div className="border-t border-neutral-800/80 pt-20">
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3">
              COMPETITIONS &amp; BUILDATHONS
            </p>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
              Hackathons <AuroraText className="italic font-serif">&amp; Buildathons</AuroraText>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
            {HACKATHONS.map((h) => (
              <div
                key={h.id}
                className={`relative rounded-3xl bg-gradient-to-b ${h.gradient} border border-neutral-800 hover:border-neutral-600 p-7 sm:p-9 shadow-2xl transition-all duration-300 hover:-translate-y-1 group flex flex-col justify-between space-y-6`}
              >
                <div className="space-y-4">
                  {/* Event & Date Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400">
                    <span className="flex items-center gap-2 text-amber-400 font-semibold tracking-wider uppercase">
                      <IconTrophy className="w-4 h-4" />
                      {h.event}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300">
                      {h.date}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-amber-300 transition-colors">
                      {h.projectTitle}
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-1">
                      {h.subtitle}
                    </p>
                  </div>

                  {/* Awards Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {h.awards.map((award, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono font-semibold text-amber-300 flex items-center gap-1.5 shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                      >
                        <IconMedal className="w-3.5 h-3.5" />
                        {award}
                      </span>
                    ))}
                  </div>

                  {/* Description Points */}
                  <div className="space-y-2 pt-2 text-neutral-300 text-sm leading-relaxed font-sans">
                    {h.description.map((point, i) => (
                      <p key={i}>{point}</p>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800/80">
                  {h.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-300 tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;