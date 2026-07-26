"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-black font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 text-center md:text-left">
        <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.3em] mb-4">
          LEADERSHIP &amp; COMMUNITY
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight text-white mb-6">
          Volunteering{" "}
          <span className="italic bg-gradient-to-t from-[#f8fafc] via-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
            Experience
          </span>
        </h2>
        <p className="text-neutral-400 text-sm md:text-base max-w-xl">
          Active leadership, technical management, and community initiative positions I&apos;ve held across societies and tech organizations.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-24 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black border border-neutral-800 flex items-center justify-center shadow-md">
                <div className="h-3 w-3 rounded-full bg-neutral-400 border border-neutral-600 p-1" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-serif font-bold text-neutral-400">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-serif font-bold text-neutral-400">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#64748b] via-[#cbd5e1] to-transparent from-[0%] via-[20%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
