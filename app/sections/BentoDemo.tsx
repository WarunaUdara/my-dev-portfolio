"use client";
import Image from "next/image";
import { useState } from "react";
import { Globe } from "@/app/ui/Globe"

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
        {/* Globe - Centered and Properly Scaled */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] flex items-center justify-center opacity-70">
          <Globe />
        </div>

        {/* Text Overlay - Top */}
        <div className="absolute top-6 left-6 right-6 z-10 text-center">
          <p className="text-sm sm:text-base text-white leading-relaxed">
            I&apos;m very flexible with time
          </p>
          <p className="text-sm sm:text-base text-white leading-relaxed">
            zone communications
          </p>
        </div>

        {/* Location Label - Bottom Left */}
        <div className="absolute bottom-10 left-6 z-10">
                    <h4 className="text-xl font-semibold text-white">Sri Lanka</h4>

          <p className="text-xs text-gray-500 mb-1">Remote</p>
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
            <span className="italic bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              cutting-edge technologies
            </span>
          </h3>
        </div>

        {/* Animated Cards Container - Positioned Lower */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 pt-24">
          {/* Card 1 - Bottom Left (Gradient Card) */}
          <div className="absolute bottom-12 left-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[-12deg] group-hover:translate-x-[-15px] group-hover:translate-y-[-8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 opacity-90"></div>
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
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 ml-2">
                <div className="w-32 h-4 bg-gray-700 rounded flex items-center px-2 transition-all duration-500 group-hover:w-40">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>

            {/* Website Content */}
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-white text-sm font-semibold transition-all duration-500 group-hover:text-base">
                  Building elegant solutions
                </h3>
                <p className="text-gray-400 text-sm font-semibold transition-all duration-500 group-hover:text-sm">
                  that are secure and scalable
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Get Started
                </button>
                <button className="px-4 py-1.5 bg-transparent border border-gray-600 hover:border-gray-500 text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom Right (Gradient Card) */}
          <div className="absolute bottom-12 right-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[12deg] group-hover:translate-x-[15px] group-hover:translate-y-[8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-purple-300 opacity-90"></div>
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
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl opacity-20">📅</div>
      </div>
    ),
  },
];

export function BentoDemo() {
  const [touchTimer, setTouchTimer] = useState<NodeJS.Timeout | null>(null);

  const handleTouchStart = (link: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const timer = setTimeout(() => {
        window.open(link, '_blank');
      }, 500); // 500ms long-press
      setTouchTimer(timer);
    }
  };

  const handleTouchEnd = () => {
    if (touchTimer) {
      clearTimeout(touchTimer);
      setTouchTimer(null);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      e.preventDefault();
    }
  };

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
                        onTouchStart={() => handleTouchStart(f.link)}
                        onTouchEnd={handleTouchEnd}
                        onClick={handleClick}
                        className={cn(
                          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                          "border-gray-700 bg-gray-800/50 hover:bg-gray-800 hover:border-purple-500/50",
                          "transform-gpu blur-[1px] transition-all duration-300 ease-out",
                          "lg:hover:blur-none", // Desktop: remove blur on hover
                          "active:blur-none", // Mobile: remove blur on touch
                          "group"
                        )}
                      >
                        <div className="flex flex-col gap-2">
                          {/* Blog Post Title */}
                          <div className="flex flex-col">
                            <figcaption className="text-sm font-semibold text-white group-hover:text-purple-400 group-active:text-purple-400 transition-colors line-clamp-2">
                              {f.name}
                            </figcaption>
                            <span className="text-xs text-gray-500 mt-1">Medium</span>
                          </div>
                        </div>

                        {/* Blog Post Description */}
                        <blockquote className="mt-3 text-xs text-gray-400 line-clamp-3 leading-relaxed">
                          {f.body}
                        </blockquote>

                        {/* Read More Indicator */}
                        <div className="mt-3 flex items-center gap-1 text-xs text-purple-400 opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity">
                          <span className="hidden lg:inline">Read more</span>
                          <span className="lg:hidden">Hold to open</span>
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
