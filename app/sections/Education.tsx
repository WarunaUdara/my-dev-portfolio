"use client";

import React from "react";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";
import { IconSchool, IconAward } from "@tabler/icons-react";

export interface EducationItem {
  id: string;
  institution: string;
  logo: string;
  degree: string;
  period: string;
  description?: string;
  achievements?: string[];
  gradient: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: "EDU01",
    institution: "University of Sri Jayewardenepura",
    logo: "/me/usj-logo.png",
    degree: "Bachelor of Information and Communication Technology (Hons), Network Technology",
    period: "May 2024 – Dec 2028",
    description: "Undergraduate | BICT (Hons) Specialized in Network Technology",
    gradient: "from-neutral-900/90 via-neutral-950 to-black",
  },
  {
    id: "EDU02",
    institution: "Institute of Computer Engineering Technology (iCET)",
    logo: "/me/icet-logo.png",
    degree: "Diploma in Software Engineering",
    period: "Nov 2023 – Jun 2024",
    gradient: "from-neutral-900/90 via-neutral-950 to-black",
  },
  {
    id: "EDU03",
    institution: "Ananda Sastralaya National School",
    logo: "/me/school-logo.png",
    degree: "Engineering Technology",
    period: "Feb 2008 – Mar 2022",
    achievements: [
      "G.C.E. Advanced Level (Technology Stream) – Achieved AAA passes in Engineering Technology, Science for Technology, and Information & Communication Technology (ICT).",
      "Secured District Rank 09 and Island Rank 121."
    ],
    gradient: "from-neutral-900/90 via-neutral-950 to-black",
  },
];

export const Education = () => {
  return (
    <section id="education" className="relative bg-black text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden border-t border-dashed border-neutral-800/80">
      {/* Background Blueprint Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase mb-3 flex items-center justify-center gap-2">
            <IconSchool className="w-4 h-4 text-neutral-300" />
            ACADEMIC JOURNEY
          </p>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            Education <AuroraText className="italic font-serif">&amp; Qualifications</AuroraText>
          </h2>
        </div>

        {/* Education Cards Stack */}
        <div className="space-y-8">
          {EDUCATION_DATA.map((edu) => (
            <div
              key={edu.id}
              className={`relative rounded-3xl bg-neutral-950/80 border border-neutral-800/90 hover:border-neutral-600 p-7 sm:p-9 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col sm:flex-row items-start gap-6 md:gap-8`}
            >
              {/* Institution Logo Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-neutral-900/90 border border-neutral-800 p-2 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg group-hover:border-neutral-600 transition-colors">
                <Image
                  src={edu.logo}
                  alt={edu.institution}
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Institution & Period Content */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 border-b border-dashed border-neutral-800 pb-3">
                  <span className="text-neutral-200 font-semibold text-base sm:text-lg font-serif">
                    {edu.institution}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 font-mono">
                    {edu.period}
                  </span>
                </div>

                {/* Degree & Specialization */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide group-hover:text-neutral-200 transition-colors">
                    {edu.degree}
                  </h3>
                  {edu.description && (
                    <p className="text-neutral-400 text-xs sm:text-sm font-mono mt-1.5 font-medium">
                      {edu.description}
                    </p>
                  )}
                </div>

                {/* Academic Achievements */}
                {edu.achievements && edu.achievements.length > 0 && (
                  <div className="space-y-2.5 pt-2 border-t border-dashed border-neutral-800/80">
                    <span className="text-xs font-mono font-semibold text-neutral-300 tracking-wider uppercase flex items-center gap-2">
                      <IconAward className="w-4 h-4 text-neutral-300" />
                      Academic Achievements
                    </span>
                    <ul className="space-y-2 text-neutral-300 text-sm font-sans leading-relaxed">
                      {edu.achievements.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-neutral-500 font-mono text-xs mt-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
