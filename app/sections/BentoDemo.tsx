"use client";
import Image from "next/image";
import { Globe } from "@/app/ui/Globe"
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { BentoCard, BentoGrid } from "@/app/ui/BentoGrid";
import { Marquee } from "@/components/ui/marquee";

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
      <div className="absolute inset-0 overflow-hidden">
        {/* Heading - Top Left */}
        <div className="text-center absolute top-6 left-4 right-4 z-10">
          <h3 className="text-2xl sm:text-3xl font-serif leading-tight ">
            I&apos;m very flexible with time zone communications
          </h3>
        </div>

        {/* Globe - Scaled up for zoom effect */}
        <div className="absolute inset-0 flex items-center justify-center scale-125 -translate-y-4 pt-56">
          <Globe />
        </div>
        
        {/* Location Info - Bottom Left */}
        <div className="absolute bottom-4 left-4 z-10">
          <div className="items-center gap-3">
            <span className="text-gray-300 text-sm font-medium">Remote</span>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[var(--color-8)]" />
              <span className="text-white text-sm font-semibold">Sri Lanka</span>
            </div>
          </div>
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
            <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">
              cutting-edge technologies
            </span>
          </h3>
        </div>

        {/* Animated Cards Container - Positioned Lower */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 pt-24">
          {/* Card 1 - Bottom Left (Gradient Card) */}
          <div className="absolute bottom-12 left-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[-12deg] group-hover:translate-x-[-15px] group-hover:translate-y-[-8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-9)] via-[var(--color-8)] to-[var(--color-7)] opacity-90"></div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-16 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
          </div>

          {/* Card 2 - Center Bottom (Website Mockup) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-48 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:translate-y-[20px] group-hover:scale-105 z-10">
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-900 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 ml-2">
                <div className="w-32 h-4 bg-gray-800 rounded flex items-center px-2 transition-all duration-500 group-hover:w-40">
                  <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                </div>
              </div>
            </div>

            {/* Website Content */}
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-950 to-black p-4 flex flex-col items-center justify-center">
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-white text-sm font-semibold transition-all duration-500 group-hover:text-base">
                  Building elegant solutions
                </h3>
                <p className="text-gray-300 text-sm font-semibold transition-all duration-500 group-hover:text-sm">
                  that are secure and scalable
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 bg-[var(--color-8)] hover:bg-[var(--color-9)] text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Get Started
                </button>
                <button className="px-4 py-1.5 bg-transparent border border-[var(--color-5)] hover:border-[var(--color-7)] text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom Right (Gradient Card) */}
          <div className="absolute bottom-12 right-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[12deg] group-hover:translate-x-[15px] group-hover:translate-y-[8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-8)] via-[var(--color-9)] to-[var(--color-7)] opacity-90"></div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-14 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-16 h-1.5 bg-white/40 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    name: "Resume",
    description: "Download my professional resume and learn more about my experience.",
    className: "col-span-3 lg:col-span-1",
    href: "/waruna-udara-sampath-resume lts.pdf",
    cta: "Download CV",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-8)]/20 via-[var(--color-9)]/10 to-transparent"></div>
        
        {/* Floating Document Icon with Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative group-hover:scale-110 transition-transform duration-500">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-[var(--color-8)] opacity-20 blur-3xl rounded-full scale-150 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            {/* Document Icon */}
            <div className="relative w-24 h-28 bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
              {/* Document Header */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] opacity-80"></div>
              
              {/* Document Lines */}
              <div className="absolute top-10 left-3 right-3 space-y-2">
                <div className="h-1.5 bg-[var(--color-6)] rounded-full w-3/4 opacity-60"></div>
                <div className="h-1.5 bg-[var(--color-6)] rounded-full w-full opacity-50"></div>
                <div className="h-1.5 bg-[var(--color-6)] rounded-full w-5/6 opacity-40"></div>
                <div className="h-1.5 bg-[var(--color-6)] rounded-full w-2/3 opacity-30"></div>
              </div>
              
              {/* Download Arrow */}
              <div className="absolute bottom-2 right-2 w-6 h-6 bg-[var(--color-8)] rounded-full flex items-center justify-center group-hover:bg-[var(--color-9)] transition-colors duration-300">
                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              
              {/* Folded Corner */}
              <div className="absolute top-0 right-0 w-0 h-0 border-l-[20px] border-l-transparent border-t-[20px] border-t-[var(--color-7)] opacity-40"></div>
            </div>
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-[var(--color-8)] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-[var(--color-9)] rounded-full opacity-40 animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[var(--color-8)] rounded-full opacity-50 animate-pulse delay-700"></div>
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
