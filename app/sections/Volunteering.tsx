"use client";

import React from "react";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { IconCheck, IconBuildingCommunity, IconCalendarEvent } from "@tabler/icons-react";
import BounceCards from "@/components/ReactBits/BounceCards";

interface VolunteeringItem {
  role: string;
  organization: string;
  projectOrEvent: string | null;
  duration: string;
  category: string;
  description: string;
  highlights: string[];
  images?: string[];
}

const volunteeringData: VolunteeringItem[] = [
  {
    role: "IT Operations Team Head",
    organization: "Career Skills Development Society",
    projectOrEvent: "JESA 2026",
    duration: "Jun 2026 - Present",
    category: "Science and Technology",
    description: "Platform launch lead and IT operations management.",
    highlights: ["Platform launch"],
  },
  {
    role: "Event & Logistics Lead",
    organization: "AWS Student Builder Group at USJ",
    projectOrEvent: null,
    duration: "May 2026 - Present",
    category: "Science and Technology",
    description: "Leading event organization and logistics management for the student builder group.",
    highlights: [],
  },
  {
    role: "Project Co-chair",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    projectOrEvent: "Beauty of Cloud 2.0",
    duration: "May 2026 - Present",
    category: "Science and Technology",
    description: "Co-chairing project initiatives including technical workshops.",
    highlights: [
      "Workshop 4 - Code to Cloud with Platform Engineering",
      "Workshop 3 - Cloud Architecture: What Happens When You Open Instagram?",
    ],
  },
  {
    role: "Event Division Vice President",
    organization: "ICTS - Information and Communication Technology Society",
    projectOrEvent: null,
    duration: "Oct 2025 - Present",
    category: "Science and Technology",
    description: "Leading the Event Division for the ICT Society.",
    highlights: [],
    images: ["/me/icts1.webp", "/me/icts2.webp", "/me/icts3.webp", "/me/icts4.webp"],
  },
  {
    role: "ComSoc Standing Committee Member - Volunteer Management",
    organization: "IEEE ComSoc Student Branch Chapter - University of Sri Jayewardenepura",
    projectOrEvent: null,
    duration: "Oct 2025 - Present",
    category: "Science and Technology",
    description: "Volunteered for the term 2025/2026 managing volunteer operations.",
    highlights: [],
  },
  {
    role: "Head - Programming Team",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    projectOrEvent: "ALGOARENA (in collaboration with Leo Clubs)",
    duration: "Sep 2025 - Jan 2026",
    category: "Science and Technology",
    description: "As Co-Head of the Programming Team, led website development, tech selection, and cross-team coordination.",
    highlights: [
      "Leading the development of the official event website",
      "Mentoring team members on development tools and technologies",
      "Selecting appropriate development tools and hosting solutions",
      "Monitoring and inspecting event execution in collaboration with the team head",
      "Coordinating with other teams, scheduling meetings, and logging progress",
    ],
  },
  {
    role: "Logistics Team Member",
    organization: "IEEE Student Branch - University of Sri Jayewardenepura",
    projectOrEvent: "IEEE REBOOT 1.0 phase 2",
    duration: "Oct 2025",
    category: "Science and Technology",
    description: "Assisted in organizing and managing event logistics, including venue decoration, delegate coordination, and on-site arrangements.",
    highlights: [],
  },
  {
    role: "Programming and Web Development Crew Member",
    organization: "IEEE CS Student Branch Chapter - University of Sri Jayewardenepura",
    projectOrEvent: "Beauty of Cloud",
    duration: "Apr 2025 - Sep 2025",
    category: "Science and Technology",
    description: "Contributed to the execution of the event by developing, maintaining, and optimizing its web presence.",
    highlights: ["Developed official event website using Next.js"],
  },
  {
    role: "Member",
    organization: "ICTS - Information and Communication Technology Society",
    projectOrEvent: null,
    duration: "Sep 2024 - Nov 2025",
    category: "Science and Technology",
    description: "Actively participated in initiatives promoting ICT knowledge and collaboration within the community.",
    highlights: [],
  },
];

export default function Volunteering() {
  const timelineEntries: TimelineEntry[] = volunteeringData.map((item) => ({
    title: item.duration.toUpperCase(),
    content: (
      <div className="bg-neutral-950/90 border border-neutral-800/80 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        {/* Role Title */}
        <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
          {item.role}
        </h3>

        {/* Organization & Event Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300">
          <div className="flex items-center gap-1.5 font-medium text-gray-200">
            <IconBuildingCommunity className="w-4 h-4 text-neutral-400" />
            <span>{item.organization}</span>
          </div>

          {item.projectOrEvent && (
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-700/80 px-2.5 py-1 rounded-full text-xs font-mono text-gray-300">
              <IconCalendarEvent className="w-3.5 h-3.5 text-blue-400" />
              <span>{item.projectOrEvent}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm leading-relaxed font-sans">
          {item.description}
        </p>

        {/* Highlights List if present */}
        {item.highlights && item.highlights.length > 0 && (
          <div className="pt-2 space-y-2 border-t border-neutral-900">
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-mono">
              Key Contributions &amp; Highlights
            </p>
            <ul className="space-y-2">
              {item.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-200">
                  <IconCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Interactive Event Highlights Gallery */}
        {item.images && item.images.length > 0 && (
          <div className="pt-5 border-t border-neutral-900 flex flex-col items-center">
            <p className="text-xs uppercase tracking-wider text-neutral-500 font-mono mb-3 text-center">
              Event Highlights &amp; Team Gallery
            </p>
            
            {/* Desktop View: Wide Fan-out BounceCards */}
            <div className="hidden sm:block w-full overflow-visible">
              <BounceCards
                images={item.images}
                containerWidth={750}
                containerHeight={240}
                animationDelay={0.2}
                enableHover={true}
                cardClassName="w-[170px] md:w-[220px] aspect-[16/10]"
                transformStyles={[
                  'rotate(-4deg) translate(-255px)',
                  'rotate(2deg) translate(-85px)',
                  'rotate(-2.5deg) translate(85px)',
                  'rotate(4deg) translate(255px)'
                ]}
              />
            </div>

            {/* Mobile View: 2x2 Grid Layout for Full Image Legibility */}
            <div className="grid grid-cols-2 gap-2.5 my-2 w-full sm:hidden">
              {item.images.map((img, i) => (
                <div
                  key={i}
                  className="group relative rounded-xl border border-neutral-800 overflow-hidden aspect-[16/10] shadow-lg bg-neutral-900"
                >
                  <img
                    src={img}
                    alt={`icts-${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <section id="volunteering" className="relative w-full bg-black text-white scroll-mt-20">
      <Timeline data={timelineEntries} />
    </section>
  );
}
