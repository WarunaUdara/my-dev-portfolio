"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lens } from '../ui/lens';
import AuroraText from '@/components/ui/aurora-text';
import { IconUsers, IconExternalLink, IconArrowRight } from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  title: string;
  detailsTitle: string;
  pillarText: string;
  status?: string;
  descriptionPoints: string[];
  teamMembers?: string[];
  techStack: Array<{ name: string; icon: string }>;
  imageSrc: string;
  gradient: string;
  link: string;
}

const projects: ProjectData[] = [
  {
    title: "StudEd",
    detailsTitle: "StudEd: Microservices & GraphQL Intelligent Learning Platform",
    pillarText: "Subscription-Based Educational Platform & Gamified Micro-Learning",
    status: "IN PROGRESS 🚧",
    descriptionPoints: [
      "Engineered Sri Lanka's premium subscription-based learning platform for Grades 1–11, O/L & A/L with an editorial Intelligent Learning Canvas (Currently in Active Development).",
      "Powered by 11 Go microservices, gRPC inter-service communications, unified GraphQL API gateway (gqlgen + Chi), PostgreSQL 15, and Redis 7 ZSET leaderboards.",
      "Features native domain visualizers (Manim math animations, 3Dmol molecular models, tscircuit, Matter.js physics), OKLCH color space, zero-asset Web Audio sound synthesis, and streak gamification."
    ],
    techStack: [
      { name: "React 19", icon: "/techstack-icons/react.webp" },
      { name: "Go 1.22", icon: "/techstack-icons/golang.webp" },
      { name: "GraphQL", icon: "/techstack-icons/graphql.webp" },
      { name: "TanStack Router", icon: "/techstack-icons/tanstack.webp" },
      { name: "TanStack Query", icon: "/techstack-icons/tanstack.webp" },
      { name: "PostgreSQL", icon: "/techstack-icons/postgresql.webp" },
      { name: "Redis", icon: "/techstack-icons/redis.webp" },
      { name: "Kubernetes / Helm", icon: "/techstack-icons/kubernetes.webp" },
      { name: "OpenTofu", icon: "/techstack-icons/opentofu.webp" }
    ],
    imageSrc: "/projects/studed.webp",
    gradient: "bg-gradient-to-br from-violet-600 via-indigo-700 to-slate-950",
    link: "/blog/studed-microservices-educational-platform"
  },
  {
    title: "JESA 2026",
    detailsTitle: "J'pura Employability Skills Awards: JESA 2026 - Revamp",
    pillarText: "Official Awards Ecosystem & Admin Control Centre",
    descriptionPoints: [
      "Led digital transformation of JESA, evolving 2025 platform into a modern 2026 production ecosystem.",
      "Re-engineered platform architecture with scalable admin control centre, dynamic faculty workflows with complex validations, and Playwright E2E testing.",
      "Resolved production blockers caused by firebase-admin & jose ESM incompatibility, stabilizing Node 22 runtime on Vercel."
    ],
    teamMembers: ["Waruna Udara (IT Ops Head)", "Pruthivi Thejan (UI/UX)", "Dharaka Meth", "Yesith Sri Hansana", "Pasindu Jeewan"],
    techStack: [
      { name: "Next.js 15", icon: "/techstack-icons/nextjs.webp" },
      { name: "React 19", icon: "/techstack-icons/react.webp" },
      { name: "TypeScript", icon: "/techstack-icons/typescript.webp" },
      { name: "Tailwind CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "Firebase", icon: "/techstack-icons/firebase.webp" },
      { name: "Node.js 22", icon: "/techstack-icons/nodejs.webp" },
      { name: "Vercel", icon: "/techstack-icons/vercel.webp" }
    ],

    imageSrc: "/projects/jesa.webp",
    gradient: "bg-gradient-to-br from-amber-600 via-amber-700 to-amber-950",
    link: "https://jesa.lk"
  },
  {
    title: "CRYPTX 2.0",
    detailsTitle: "CRYPTX 2.0 Official Web Platform",
    pillarText: "Inter-University Hackathon, Designathon & CTF Platform",
    descriptionPoints: [
      "Official website for CryptX 2.0, Sri Lanka's premier inter-university tech event combining Hackathon, Designathon & CTF.",
      "24-hour development sprint (100+ commits) in a team of 4, building full React & TanStack frontend.",
      "Appwrite backend (database, hosting, storage) scaling seamlessly to 1,200+ user registrations across multiple event tracks."
    ],
    teamMembers: ["Waruna Udara", "Malin Dhamsara", "Pruthivi Thejan", "Nuwan Konara"],
    techStack: [
      { name: "React", icon: "/techstack-icons/react.webp" },
      { name: "TanStack Router", icon: "/techstack-icons/tanstack.webp" },
      { name: "TanStack Query", icon: "/techstack-icons/tanstack.webp" },
      { name: "Appwrite", icon: "/techstack-icons/postgresql.webp" },
      { name: "TypeScript", icon: "/techstack-icons/typescript.webp" },
      { name: "Tailwind CSS", icon: "/techstack-icons/tailwindcss.webp" }
    ],

    imageSrc: "/projects/cryptx.webp",
    gradient: "bg-gradient-to-br from-cyan-600 via-cyan-700 to-blue-950",
    link: "https://cryptx.lk"
  },
  {
    title: "EMWEE",
    detailsTitle: "EMWEE Startup Web Platform",
    pillarText: "Startup Web Platform & Ecosystem",
    descriptionPoints: [
      "Official web platform for EMWEE startup ecosystem.",
      "Custom UI/UX engineering and high-performance responsive web design.",
      "Collaborative agile development with multi-developer team execution."
    ],
    teamMembers: ["Waruna Udara", "Malin Dhamsara", "Vineth Ranathunga", "Farhan Hameeth", "Thisal Kokuhennadige"],
    techStack: [
      { name: "React", icon: "/techstack-icons/react.webp" },
      { name: "TanStack Router", icon: "/techstack-icons/tanstack.webp" },
      { name: "TanStack Query", icon: "/techstack-icons/tanstack.webp" },
      { name: "TypeScript", icon: "/techstack-icons/typescript.webp" },
      { name: "Tailwind CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "Vercel", icon: "/techstack-icons/vercel.webp" }
    ],

    imageSrc: "/projects/emwee.webp",
    gradient: "bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-950",
    link: "https://emwee.co"
  },
  {
    title: "Personal Portfolio",
    detailsTitle: "Personal Developer Portfolio",
    pillarText: "Interactive Developer Portfolio",
    descriptionPoints: [
      "Developed with Next.js 15, React 19, and TypeScript for type safety.",
      "GSAP animations with ScrollTrigger and dynamic WebGL shaders.",
      "Deployed on Vercel with Bun package manager for speed."
    ],
    techStack: [
      { name: "Next.js 15", icon: "/techstack-icons/nextjs.webp" },
      { name: "React 19", icon: "/techstack-icons/react.webp" },
      { name: "TypeScript", icon: "/techstack-icons/typescript.webp" },
      { name: "Tailwind CSS", icon: "/techstack-icons/tailwindcss.webp" },
      { name: "Bun", icon: "/techstack-icons/bun.webp" },
      { name: "Vercel", icon: "/techstack-icons/vercel.webp" }
    ],

    imageSrc: "/projects-portfolio.webp",
    gradient: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-950",
    link: "https://warunadev.vercel.app"
  },
  {
    title: "Beauty Of Cloud",
    detailsTitle: "Beauty Of Cloud Platform",
    pillarText: "Inter-University Cloud Computing Ideathon",
    descriptionPoints: [
      "IEEE CS Chapter USJ flagship event promoting cloud technologies.",
      "Next.js with MongoDB Atlas for scalable data management.",
      "Tailwind CSS for responsive design across all devices."
    ],
    techStack: [
      { name: "Next.js", icon: "/techstack-icons/nextjs.webp" },
      { name: "React", icon: "/techstack-icons/react.webp" },
      { name: "MongoDB", icon: "/techstack-icons/mongodb.webp" },
      { name: "Vercel", icon: "/techstack-icons/vercel.webp" },
      { name: "Tailwind CSS", icon: "/techstack-icons/tailwindcss.webp" }
    ],

    imageSrc: "/projects-beautyofcloud.webp",
    gradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-950",
    link: "https://beautyof.cloud"
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !descriptionRef.current) return;

    const section = sectionRef.current;
    const description = descriptionRef.current;

    const ctx = gsap.context(() => {
      // Pin description on desktop
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: description,
        pinSpacing: false,
      });

      // Track active card
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        ScrollTrigger.create({
          trigger: card,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-black text-white overflow-hidden py-20 scroll-mt-20 border-t border-neutral-900"
    >
      {/* Section Title */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-xs sm:text-sm text-neutral-400 uppercase tracking-[0.3em] mb-4 font-mono font-semibold">
          FEATURED WORK
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
          Featured{' '}
          <AuroraText className="italic font-serif">
            Projects
          </AuroraText>
        </h2>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          {/* Left: Scrolling Cards */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative group"
              >
                {/* Card - Landscape orientation - Clickable */}
                <Link
                  href={project.link}
                  target={project.link.startsWith("http") ? "_blank" : undefined}
                  rel={project.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={`relative rounded-[32px] overflow-hidden ${project.gradient} border-2 border-white/20 transition-all duration-300 hover:translate-y-[-8px] block cursor-pointer shadow-2xl`}
                >
                  {/* Arrow icon */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-11 h-11 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110">
                    <IconExternalLink className="w-5 h-5 text-white" />
                  </div>

                  {/* Description text at top left */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 max-w-[75%] space-y-1.5">
                    {project.status && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/25 border border-amber-400/40 text-amber-200 text-xs font-mono font-semibold tracking-wider shadow-lg backdrop-blur-md mb-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                        {project.status}
                      </span>
                    )}
                    <p className="text-white font-sans text-base md:text-lg font-medium leading-relaxed">
                      {project.pillarText}
                    </p>
                  </div>

                  {/* Image Container */}
                  <div className="relative w-full pt-24 md:pt-28 lg:pt-28">
                    <div className="relative w-full aspect-[16/9] lg:aspect-[16/9]">
                      {/* Desktop: padding with Lens effect */}
                      <div className="hidden lg:block absolute inset-0 px-6 pb-6">
                        <Lens zoomFactor={1.8} lensSize={200}>
                          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-950 border border-white/10">
                            <Image
                              src={project.imageSrc}
                              alt={project.title}
                              fill
                              className="object-cover object-top"
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              priority={index === 0}
                              quality={85}
                            />
                          </div>
                        </Lens>
                      </div>
                      
                      {/* Mobile */}
                      <div className="lg:hidden absolute inset-0 px-3 pt-0 pb-0">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-neutral-950 border border-white/10">
                          <Image
                            src={project.imageSrc}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            sizes="100vw"
                            priority={index === 0}
                            quality={85}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Mobile: Description below each card */}
                <div className="lg:hidden mt-8 px-2 space-y-4">
                  <h3 className="text-2xl font-serif font-bold text-white leading-tight">
                    {project.detailsTitle}
                  </h3>

                  {project.teamMembers && (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-300 font-mono">
                      <IconUsers className="w-4 h-4 text-neutral-400 shrink-0" />
                      <span className="text-neutral-400 font-semibold">Team:</span>
                      <span>{project.teamMembers.join(", ")}</span>
                    </div>
                  )}

                  <ul className="space-y-2.5">
                    {project.descriptionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 font-sans">
                        <span className="text-neutral-400 text-lg mt-0.5 flex-shrink-0 font-light">+</span>
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-full text-xs text-gray-300 font-mono flex items-center gap-2"
                      >
                        <Image src={tech.icon} alt={tech.name} width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Description - Desktop: Pinned */}
          <div className="hidden lg:block relative">
            <div 
              ref={descriptionRef}
              className="h-screen flex items-center justify-center"
            >
              <div className="w-full pb-80 space-y-6">
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-white leading-tight">
                  {projects[activeIndex].detailsTitle}
                </h3>

                {projects[activeIndex].teamMembers && (
                  <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800 text-xs font-mono text-neutral-300 space-y-1">
                    <div className="flex items-center gap-2 text-neutral-400 font-semibold uppercase tracking-wider">
                      <IconUsers className="w-4 h-4 text-neutral-300" />
                      <span>Collaborators &amp; Team</span>
                    </div>
                    <p className="text-neutral-200 leading-relaxed font-sans">
                      {projects[activeIndex].teamMembers?.join(" • ")}
                    </p>
                  </div>
                )}

                <ul className="space-y-3">
                  {projects[activeIndex].descriptionPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3.5 text-gray-300 font-sans">
                      <span className="text-neutral-400 text-xl mt-0.5 flex-shrink-0 font-light">+</span>
                      <span className="text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2.5 pt-2">
                  {projects[activeIndex].techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-full text-xs text-neutral-300 font-mono font-medium transition-all duration-300 flex items-center gap-2"
                    >
                      <Image src={tech.icon} alt={tech.name} width={16} height={16} className="w-4 h-4 object-contain" />
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* See More / View All Work CTA Button */}
      <div className="mt-14 sm:mt-16 text-center flex justify-center relative z-20">
        <Link
          href="/work"
          className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-neutral-950/90 border border-white/20 hover:border-white/50 text-neutral-200 hover:text-white font-mono text-xs font-medium tracking-wider uppercase backdrop-blur-2xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.18)] group hover:scale-105 active:scale-95"
        >
          <span>SEE MORE PROJECTS</span>
          <IconArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </section>
  );
};

export default Projects;