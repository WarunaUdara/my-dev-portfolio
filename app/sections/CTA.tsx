"use client";

import React from "react";
import Grainient from "@/components/ReactBits/Grainient";
import CircularText from "@/components/ReactBits/CircularText";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";

export default function CTA() {
  return (
    <section className="relative w-full overflow-hidden bg-black text-white py-24 px-4 sm:px-6">
      {/* Background WebGL Grainient Shader */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Grainient
          color1="#383838"
          color2="#050505"
          color3="#1c1c1c"
          timeSpeed={0.2}
          colorBalance={0.1}
          warpStrength={1.2}
          warpFrequency={4.0}
          warpSpeed={1.8}
          warpAmplitude={40.0}
          blendAngle={15.0}
          blendSoftness={0.08}
          rotationAmount={350.0}
          noiseScale={2.2}
          grainAmount={0.12}
          grainScale={2.0}
          grainAnimated={true}
          contrast={1.4}
          gamma={1.0}
          saturation={0.8}
          centerX={0.0}
          centerY={0.0}
          zoom={0.85}
        />
      </div>

      {/* Top & Bottom Shadow Fade Overlays */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none z-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none z-10"></div>

      {/* Main CTA Content */}
      <div className="container mx-auto max-w-5xl relative z-20 flex flex-col items-center text-center space-y-8">
        
        {/* Emblem Badge Icon */}
        <div className="relative group">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neutral-800 to-black p-0.5 shadow-2xl border border-neutral-700/80 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
              <span className="font-mono text-base font-black tracking-tighter bg-gradient-to-t from-[#cbd5e1] to-white bg-clip-text text-transparent">
                WU
              </span>
            </div>
          </div>
        </div>

        {/* Main Headline with Floating Rotating Disc */}
        <div className="relative max-w-4xl px-2">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans tracking-tight uppercase font-light leading-tight sm:leading-tight">
            FROM CONCEPT TO{" "}
            <span className="font-serif italic font-extrabold text-white">
              CREATION
            </span>
            <br />
            LET&apos;S MAKE IT{" "}
            <span className="font-serif italic font-extrabold bg-gradient-to-t from-[#f8fafc] via-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent">
              HAPPEN!
            </span>
          </h2>

          {/* Circular Text Rotating Disc Badge */}
          <div className="hidden sm:flex absolute -top-6 -right-6 md:-right-12 z-30 pointer-events-auto items-center justify-center">
            <div className="relative flex items-center justify-center w-28 h-28">
              <CircularText
                text="OPEN TO WORK • OPEN TO WORK • "
                spinDuration={16}
                onHover="speedUp"
                className="w-28 h-28"
              />
              {/* Inner Disc Icon */}
              <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black/90 border border-neutral-700/80 flex items-center justify-center shadow-lg">
                <IconSparkles className="w-4 h-4 text-blue-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Center Get In Touch CTA Button */}
        <div className="pt-2">
          <a
            href="https://www.linkedin.com/in/waruna-udara/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 hover:bg-white text-black font-medium text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] hover:scale-105"
          >
            <span>Get In Touch</span>
            <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
              <IconArrowUpRight className="w-4 h-4" />
            </div>
          </a>
        </div>

        {/* Availability & Subtitle Text */}
        <div className="space-y-3 pt-6 max-w-2xl border-t border-neutral-800/80 w-full">
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-white">
            I&apos;m available for full-time roles &amp; freelance projects.
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
            I thrive on crafting dynamic web applications and delivering seamless user experiences.
          </p>
        </div>

      </div>
    </section>
  );
}
