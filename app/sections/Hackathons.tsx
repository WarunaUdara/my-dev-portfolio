"use client";

import React from "react";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";
import { IconTrophy, IconMedal, IconSparkles } from "@tabler/icons-react";

export interface HackathonItem {
  id: string;
  event: string;
  projectTitle: string;
  subtitle: string;
  date: string;
  awards: string[];
  description: string[];
  skills: string[];
  gradient: string;
}

export const HACKATHONS: HackathonItem[] = [
  {
    id: "H01",
    event: "Cursor Sri Lanka 24H Buildathon",
    projectTitle: "Turboship",
    subtitle: "Agentic AI Deployment Harness for Multi-Cloud Platforms",
    date: "May 2026",
    awards: ["🥈 2nd Place (n8n Track)", "🏅 14th Overall"],
    description: [
      "Turboship is an AI-powered Internal Developer Platform (IDP) control plane built during the Cursor Sri Lanka 24H Buildathon, where it achieved 🥈 2nd Place (n8n Track) and 🏅 14th Overall.",
      "The platform streamlines container deployment by allowing users to submit a public Docker Hub image, while an AI-driven orchestration workflow analyzes runtime requirements, performs vulnerability scanning, and automates cloud provisioning.",
      "Built with Next.js, n8n, OpenAI GPT-5.5, Supabase, and Vercel, Turboship integrates secure AWS SigV4 provisioning and supports real deployments to AWS ECS Fargate and Azure Container Apps with Trivy vulnerability scanning."
    ],
    skills: ["DevOps", "Platform Engineering", "AI Agents", "Cloud Architecture", "Next.js", "n8n", "AWS"],
    gradient: "from-amber-500/10 via-neutral-900/90 to-neutral-950",
  },
  {
    id: "H02",
    event: "CryptX 1.0 Hackathon",
    projectTitle: "NomadSpace",
    subtitle: "University of Sri Jayewardenepura",
    date: "2024",
    awards: ["🏅 Top 15 Finalist (out of 100+ teams)"],
    description: [
      "Had a great experience at the CryptX 1.0 hackathon at the University of Sri Jayewardenepura!",
      "We presented our solution connecting vendors and digital nomads with working spaces in the tourism industry and we made it to the Top 15 out of 100+ teams."
    ],
    skills: ["React", "Next.js", "Web3", "Tourism Tech", "Tailwind CSS"],
    gradient: "from-purple-500/10 via-neutral-900/90 to-neutral-950",
  },
];

export const Hackathons = () => {
  return (
    <section id="hackathons" className="relative bg-black text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden border-t border-neutral-800/80">
      {/* Background Architectural Blueprint Line */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3 flex items-center justify-center gap-2">
            <IconSparkles className="w-4 h-4 text-amber-400" />
            COMPETITIONS &amp; BUILDATHONS
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            Hackathons <AuroraText className="italic font-serif">&amp; Buildathons</AuroraText>
          </h2>
        </div>

        {/* Cards Grid */}
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

                {/* Description Paragraphs */}
                <div className="space-y-3 pt-2 text-neutral-300 text-sm leading-relaxed font-sans">
                  {h.description.map((point, i) => (
                    <p key={i}>{point}</p>
                  ))}
                </div>
              </div>

              {/* Skills / Tech Stack Badges */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-800/80">
                <span className="text-[11px] font-mono text-neutral-500 uppercase self-center mr-1">Skills:</span>
                {h.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded-md text-[11px] font-mono text-neutral-300 tracking-wider"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
