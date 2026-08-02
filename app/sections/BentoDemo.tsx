"use client";
import React, { Suspense, lazy } from "react";
import Image from "@/components/ui/Image";
import { IconMapPin } from "@tabler/icons-react";
import AuroraText from "@/components/ui/aurora-text";

import { cn } from "@/lib/utils";

import { BentoCard, BentoGrid } from "@/app/ui/BentoGrid";
import { Marquee } from "@/components/ui/marquee";
import { DottedGlowBackground } from "@/components/ui/dotted-glow-background";

// cobe is a heavy WebGL dependency. Load it on demand so the initial bundle
// (and first paint) don't pay for a globe that renders below the fold.
const Globe = lazy(() =>
  import("@/app/ui/Globe").then((m) => ({ default: m.Globe }))
);

const articles = [
  {
    name: "Understanding Block Storage and Object Storage",
    body: "A Simple Guide for Everyone",
    link: "https://medium.com/@warunaudarasampath/understanding-block-storage-and-object-storage-a-simple-guide-for-everyone-03bd79201e48",
  },
  {
    name: "Understanding Compute as a Service on AWS",
    body: "In the world of cloud computing, Compute as a Service (CaaS) is a service model where resources are provisioned on-demand and are managed by a cloud provider.",
    link: "https://medium.com/@warunaudarasampath/understanding-compute-as-a-service-on-aws-8f609fb6653e",
  },
  {
    name: "How to Build a Custom Logger with Trace ID in Spring Boot",
    body: "Logging is critical in modern microservices or monolithic applications for tracking application behavior, debugging issues, and monitoring performance. ",
    link: "https://medium.com/@warunaudarasampath/how-to-build-a-custom-logger-with-trace-id-in-spring-boot-a-step-by-step-guide-6c744b22ef9f"
  },
  {
    name: "ORM vs. Native SQL",
    body: "Finding the Right Fit for Industrial-Grade Applications",
    link: "https://medium.com/@warunaudarasampath/orm-vs-native-sql-finding-the-right-fit-for-industrial-grade-applications-bd6048e6cd5f"
  },
];

const features = [
  {
    name: "",
    description: "",
    href: "#",
    cta: "",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-gray-950/80 to-black p-6 flex flex-col justify-between">
        {/* Header matching design sample */}
        <div className="z-10 relative space-y-1">
          <p className="text-[11px] font-mono uppercase tracking-widest text-blue-400 font-semibold">
            FLEXIBLE WITH TIMEZONES
          </p>
          <h3 className="text-xl sm:text-2xl font-serif leading-snug text-white font-medium">
            Based in Sri Lanka, available globally
          </h3>
        </div>

        {/* Globe Container - Large arc centered under title matching reference design */}
        <div className="absolute inset-0 flex items-center justify-center scale-140 translate-y-16 pt-24 pointer-events-auto">
          <Suspense fallback={null}>
            <Globe className="w-full max-w-[540px]" />
          </Suspense>
        </div>
        
        {/* Location Info Footer */}
        <div className="z-10 relative flex items-center justify-between pt-4 border-t border-gray-800/60 text-xs pointer-events-none">
          <div className="flex items-center gap-1.5">
            <IconMapPin className="w-3.5 h-3.5 text-blue-400 animate-bounce" />
            <span className="text-white font-medium">Kalutara / Colombo, Sri Lanka</span>
          </div>
          <span className="text-gray-400 font-mono">UTC+5:30</span>
        </div>
      </div>
    ),
  },
  {
    name: "Latest Blog Posts",
    description:
      "Read my thoughts on cloud computing, software development and more.",
    href: "https://medium.com/@warunaudarasampath",
    cta: "Read on Medium",
    className: "col-span-3 lg:col-span-2",
    background: <div />, // Placeholder, will be replaced in component
  },
  {
    name: "",
    description: "",
    href: "#",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <Image src="/circles.svg" alt="" fill className="object-cover" />
        </div>

        {/* Heading at Top */}
        <div className="absolute top-6 left-6 right-6 z-20">
          <h3 className="text-2xl sm:text-3xl font-serif leading-tight">
            Passionate about{" "}
            <AuroraText className="italic font-serif">
              cutting-edge technologies
            </AuroraText>
          </h3>
        </div>

        {/* Animated Cards Container - Positioned Lower */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 pt-24">
          {/* Card 1 - Left Tech Stack Card (Cloud & DevOps) */}
          <div className="absolute bottom-10 left-6 sm:left-8 w-36 sm:w-40 h-44 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/90 bg-neutral-950/90 backdrop-blur-xl transition-all duration-700 group-hover:rotate-[-10deg] group-hover:translate-x-[-12px] group-hover:translate-y-[-6px] group-hover:scale-105">
            <div className="p-3.5 flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-semibold">Cloud &amp; Infra</span>
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 text-[11px] font-mono text-neutral-300">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-sky-300 font-bold">#</span> Docker &amp; K8s
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-amber-400 font-bold">#</span> AWS Cloud
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                  <span className="text-purple-400 font-bold">#</span> Kyverno Policy
                </div>
              </div>
              <div className="text-[9px] font-mono text-neutral-500 text-right pt-1">v2.4.0</div>
            </div>
          </div>

          {/* Card 2 - Center Bottom (Website Mockup) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-48 rounded-xl overflow-hidden shadow-2xl border border-neutral-800/80 bg-neutral-950 transition-all duration-700 group-hover:translate-y-[20px] group-hover:scale-105 z-10">
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-neutral-900/90 border-b border-neutral-800 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 ml-2">
                <div className="w-32 h-4 bg-neutral-800/80 rounded flex items-center px-2 transition-all duration-500 group-hover:w-40">
                  <div className="w-2 h-2 rounded-full bg-neutral-500" />
                </div>
              </div>
            </div>

            {/* Website Content */}
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-br from-neutral-950 via-black to-neutral-950 p-4 flex flex-col items-center justify-center">
              <div className="text-center space-y-1.5 mb-3">
                <h3 className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  Building elegant solutions
                </h3>
                <p className="text-neutral-400 text-[11px] sm:text-xs">
                  that are secure and scalable
                </p>
              </div>
              <div className="flex gap-2.5">
                <button className="px-3.5 py-1 bg-white hover:bg-neutral-200 text-black text-[11px] rounded-full font-semibold transition-all">
                  Get Started
                </button>
                <button className="px-3.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-[11px] rounded-full font-medium transition-all">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Right Tech Stack Card (Full-Stack & Microservices) */}
          <div className="absolute bottom-10 right-6 sm:right-8 w-36 sm:w-40 h-44 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800/90 bg-neutral-950/90 backdrop-blur-xl transition-all duration-700 group-hover:rotate-[10deg] group-hover:translate-x-[12px] group-hover:translate-y-[6px] group-hover:scale-105">
            <div className="p-3.5 flex flex-col justify-between h-full space-y-2">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-semibold">Full Stack</span>
                <div className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              </div>
              <div className="space-y-1.5 text-[11px] font-mono text-neutral-300">
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-emerald-400 font-bold">#</span> Spring Boot
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                  <span className="text-sky-400 font-bold">#</span> React &amp; Next
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-neutral-900 border border-neutral-800 text-[10px]">
                  <span className="text-yellow-400 font-bold">#</span> TypeScript
                </div>
              </div>
              <div className="text-[9px] font-mono text-neutral-500 text-right pt-1">Production</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Resume",
    // Previous: description: "Download my professional resume and learn more about my experience.", href: "/waruna-udara-sampath-resume.pdf", cta: "Download CV",
    description: "Resume updating for 2026. Available soon.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Updating for 2026 🚧",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Gradient */}
        
        <div className="absolute inset-0 bg-black to-transparent"></div>
        <DottedGlowBackground
        className="pointer-events-none mask-radial-to-90% mask-radial-at-center"
        opacity={1}
        gap={10}
        radius={1.6}
        colorLightVar="--color-neutral-500"
        glowColorLightVar="--color-neutral-600"
        colorDarkVar="--color-neutral-500"
        glowColorDarkVar="--color-sky-800"
        backgroundOpacity={0}
        speedMin={0.3}
        speedMax={1.6}
        speedScale={1}
      />
        {/* Floating Document Icon with Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            
            {/* Document Icon */}
            <div className="relative w-24 h-28 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black rounded-xl shadow-2xl border border-neutral-800 overflow-hidden">
              {/* Document Header Bar - Dark Metallic */}
              <div className="absolute top-0 left-0 right-0 h-7 bg-neutral-800/90 border-b border-neutral-700/60 flex items-center px-2.5 justify-between">
                <span className="text-[9px] font-mono font-bold text-amber-400">2026 🚧</span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              </div>
              
              {/* Document Lines */}
              <div className="absolute top-9 left-3 right-3 space-y-2">
                <div className="h-1.5 bg-neutral-700 rounded-full w-3/4 opacity-80" />
                <div className="h-1.5 bg-neutral-700 rounded-full w-full opacity-60" />
                <div className="h-1.5 bg-neutral-700 rounded-full w-5/6 opacity-50" />
                <div className="h-1.5 bg-neutral-700 rounded-full w-2/3 opacity-40" />
              </div>
              
              {/* Download Arrow */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-white text-black rounded-full flex items-center justify-center shadow-md group-hover:bg-neutral-200 transition-colors duration-300">
                <svg className="w-3.5 h-3.5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </div>
    ),
  },
];

export function BentoDemo() {
  return (
    <section className="relative bg-gradient-to-b from-transparent via-black/80 to-black text-white -mt-32 pt-40 px-4 sm:px-6 pb-20">
      <div className="container mx-auto max-w-6xl relative z-20">
        {/* Bento Grid */}
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard 
              key={idx} 
              {...feature}
              background={
                idx === 1 ? ( // Blog posts card
                  <Marquee
                    pauseOnHover
                    className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
                  >
                    {articles.map((f, articleIdx) => (
                      <a
                        key={articleIdx}
                        href={f.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                          "border-gray-800 bg-black/60 hover:bg-gray-900/80 hover:border-gray-700",
                          "transform-gpu blur-[1px] transition-all duration-300 ease-out",
                          "lg:hover:blur-none", // Desktop: remove blur on hover
                          "active:blur-none", // Mobile: remove blur on touch
                          "group"
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          {/* Blog Post Title */}
                          <div className="flex flex-col">
                            <figcaption className="text-sm font-semibold text-white transition-colors line-clamp-2">
                              {f.name}
                            </figcaption>
                            <span className="text-xs text-gray-400 mt-1">Medium</span>
                          </div>
                        </div>

                        {/* Blog Post Description */}
                        <blockquote className="mt-3 text-xs text-gray-300 line-clamp-3 leading-relaxed">
                          {f.body}
                        </blockquote>

                        {/* Read More Indicator */}
                        <div className="mt-3 flex items-center gap-1 text-xs text-[var(--color-8)] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                          <span>Read more</span>
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </a>
                    ))}
                  </Marquee>
                ) : (
                  feature.background
                )
              }
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
