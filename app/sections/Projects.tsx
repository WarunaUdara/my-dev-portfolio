"use client";
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lens } from '../ui/lens';

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  title: string;
  detailsTitle: string;
  pillarText: string;
  descriptionPoints: string[];
  techStack: Array<{ name: string; icon: string }>;
  imageSrc: string;
  gradient: string;
  link: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects: ProjectData[] = [
    {
      title: "Algorena",
      detailsTitle: "AlgoArena",
      pillarText: "Hackathon Platform",
      descriptionPoints: [
        "Built with Next.js 14 using Server Components and Firebase Authentication.",
        "Real-time team formation and submission tracking with Firestore.",
        "Responsive UI with Tailwind CSS and smooth animations."
      ],
      techStack: [
        { name: "Next.js", icon: "/icons8-nextjs-144.png" },
        { name: "React", icon: "/icons8-react-24.png" },
        { name: "Firebase", icon: "/google-firebase-logo-icon-hd.png" },
        { name: "TypeScript", icon: "/ts.png" },
        { name: "Tailwind CSS", icon: "/icons8-tailwind-css-144.png" }
      ],
      imageSrc: "/projects-algoarena.png",
      gradient: "bg-gradient-to-br from-pink-600 via-pink-700 to-pink-900",
      link: "https://algoarena.live"
    },
    {
      title: "Personal Portfolio",
      detailsTitle: "Personal Portfolio",
      pillarText: "Developer Portfolio",
      descriptionPoints: [
        "Developed with Next.js 15, React 19, and TypeScript for type safety.",
        "GSAP animations with ScrollTrigger for interactive experiences.",
        "Deployed on Vercel, Static assets are deployed to a global Content Delivery Network (CDN) for low latency and instant delivery worldwide, which optimizes performance and SEO."
      ],
      techStack: [
        { name: "Next.js", icon: "/icons8-nextjs-144.png" },
        { name: "React", icon: "/icons8-react-24.png" },
        { name: "TypeScript", icon: "/ts.png" },
        { name: "Tailwind CSS", icon: "/icons8-tailwind-css-144.png" },
        { name: "Vercel", icon: "/vercel.png" },
        { name: "Bun", icon: "/Bun.png" },
        { name: "GSAP", icon: "/gsap-logo_svgstack_com_28451764740258.png" },
        { name: "Firebase", icon: "/google-firebase-logo-icon-hd.png" }
      ],
      imageSrc: "/projects-portfolio.png",
      gradient: "bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900",
      link: "https://warunadev.vercel.app"
    },
    {
      title: "Beauty Of Cloud",
      detailsTitle: "Beauty Of Cloud",
      pillarText: "Inter-University Cloud Computing Ideathon",
      descriptionPoints: [
        "IEEE CS Chapter USJ flagship event promoting cloud technologies.",
        "Next.js with MongoDB Atlas for scalable data management.",
        "Tailwind CSS for responsive design across all devices."
      ],
      techStack: [
        { name: "Next.js", icon: "/icons8-nextjs-144.png" },
        { name: "React", icon: "/icons8-react-24.png" },
        { name: "MongoDB", icon: "/icons8-mongo-db-96.png" },
        { name: "Vercel", icon: "/vercel.png" },
        { name: "Tailwind CSS", icon: "/icons8-tailwind-css-144.png" }
      ],
      imageSrc: "/projects-beautyofcloud.png",
      gradient: "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900",
      link: "https://beautyof.cloud"
    }
  ];

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
      className="relative bg-black text-white overflow-hidden py-20"
    >
      {/* Section Title */}
      <div className="container mx-auto px-6 mb-12 text-center">
        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.3em] mb-4">
          MY WORK
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
          Featured{' '}
          <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 lg:gap-16">
          {/* Left: Scrolling Cards - Takes more space */}
          <div className="space-y-24">
            {projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative group"
              >
                {/* Card - Landscape orientation - Clickable */}
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative rounded-[32px] overflow-hidden ${project.gradient} border-2 border-white/20 transition-all duration-300 hover:translate-y-[-8px] block cursor-pointer`}
                >
                  {/* Arrow icon - Top right corner */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>

                  {/* Description text at top left */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 max-w-[70%]">
                    <p className="text-white text-base md:text-lg leading-relaxed">
                      {project.pillarText}
                    </p>
                  </div>

                  {/* Image - Landscape aspect ratio, sticks to bottom */}
                  <div className="relative w-full pt-24 md:pt-28 lg:pt-28">
                    <div className="relative w-full aspect-[16/9] lg:aspect-[16/9]">
                      {/* Desktop: padding on all sides with Lens effect */}
                      <div className="hidden lg:block absolute inset-0 px-6 pb-6">
                        <Lens zoomFactor={1.8} lensSize={200}>
                          <div className="relative w-full h-full rounded-2xl overflow-hidden">
                            <Image
                              src={project.imageSrc}
                              alt={project.title}
                              fill
                              className="object-contain object-bottom"
                              sizes="(max-width: 1024px) 100vw, 60vw"
                            />
                          </div>
                        </Lens>
                      </div>
                      
                      {/* Mobile: small padding on sides only, no bottom padding, no lens */}
                      <div className="lg:hidden absolute inset-0 px-3 pt-0 pb-0">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                          <Image
                            src={project.imageSrc}
                            alt={project.title}
                            fill
                            className="object-contain object-bottom"
                            sizes="100vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </a>

                {/* Mobile: Description below each card */}
                <div className="lg:hidden mt-8 px-2">
                  {/* Title */}
                  <h3 className="text-2xl font-serif font-bold text-white mb-6 leading-tight">
                    {project.detailsTitle}
                  </h3>

                  {/* Description Points */}
                  <ul className="space-y-3 mb-6">
                    {project.descriptionPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300">
                        <span className="text-[var(--color-8)] text-xl mt-0.5 flex-shrink-0 font-light">+</span>
                        <span className="text-sm leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300 font-medium flex items-center gap-2"
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

          {/* Right: Description - Desktop: Pinned, Mobile: Hidden */}
          <div className="hidden lg:block relative">
            <div 
              ref={descriptionRef}
              className="h-screen flex items-center justify-center"
            >
              <div className="w-full pb-80">
                {/* Title */}
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-serif font-bold text-white mb-8 leading-tight">
                  {projects[activeIndex].detailsTitle}
                </h3>

                {/* Description Points */}
                <ul className="space-y-3 mb-10">
                  {projects[activeIndex].descriptionPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-gray-300">
                      <span className="text-[var(--color-8)] text-2xl mt-0.5 flex-shrink-0 font-light">+</span>
                      <span className="text-base leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2.5">
                  {projects[activeIndex].techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full text-xs text-gray-300 font-medium transition-all duration-300 flex items-center gap-2"
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

      {/* Background Decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--color-8)]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--color-9)]/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
    </section>
  );
};

export default Projects;