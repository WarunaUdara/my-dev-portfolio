"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Grainient from "@/components/ReactBits/Grainient";
import CircularText from "@/components/ReactBits/CircularText";
import AuroraText from "@/components/ui/aurora-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { IconArrowUpRight, IconSparkles } from "@tabler/icons-react";
import FigmaSplitLogo from "@/components/ui/FigmaSplitLogo";

export default function CTA() {
  return (
    <section className="relative w-full bg-black text-white py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Card Container */}
        <div className="relative w-full overflow-hidden rounded-3xl border border-white/15 bg-neutral-950 py-16 px-6 sm:px-12 shadow-2xl">

          {/* Glowing Color Bubbles (Matching Reference Image) */}
          <div className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full bg-cyan-500/35 blur-[100px] pointer-events-none z-0 animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] rounded-full bg-blue-600/35 blur-[110px] pointer-events-none z-0 animate-pulse" style={{ animationDelay: "1.5s" }} />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-sky-400/25 blur-[90px] pointer-events-none z-0" />

          {/* WebGL Grainient Shader with Slow Motion Speed & Large Tactile Glass Grain Dots */}
          <div className="absolute inset-0 z-0 opacity-85 pointer-events-none mix-blend-screen">
            <Grainient
              color1="#0284c7"
              color2="#0369a1"
              color3="#0f172a"
              timeSpeed={0.06}
              colorBalance={0.1}
              warpStrength={1.2}
              warpFrequency={2.5}
              warpSpeed={0.4}
              warpAmplitude={30.0}
              blendAngle={20.0}
              blendSoftness={0.15}
              rotationAmount={350.0}
              noiseScale={2.5}
              grainAmount={0.35}
              grainScale={0.3}
              grainAnimated={true}
              contrast={1.25}
              gamma={1.0}
              saturation={0.8}
              centerX={0.0}
              centerY={0.0}
              zoom={0.9}
            />
          </div>

          {/* Contrast Vignette Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/30 to-black/70 pointer-events-none" />

          {/* Main Content inside Card */}
          <div className="relative z-20 flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">

            {/* Emblem / Animated Figma Split 'W' Logo */}
            <div className="relative py-1 flex items-center justify-center">
              <FigmaSplitLogo size={54} />
            </div>

            {/* Headline Block */}
            <div className="relative w-full px-2">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-sans tracking-tight uppercase font-light leading-tight sm:leading-tight text-white drop-shadow-lg">
                FROM CONCEPT TO{" "}
                <span className="font-serif italic font-extrabold text-white">
                  CREATION
                </span>
                <br />
                LET&apos;S MAKE IT{" "}
                <AuroraText className="font-serif italic">
                  HAPPEN! &nbsp;
                </AuroraText>
              </h2>

              {/* Draggable Rotating Disc Badge */}
              <motion.div
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.6}
                dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
                whileDrag={{ scale: 1.15, cursor: "grabbing" }}
                className="hidden lg:flex absolute top-14 -right-4 lg:right-2 z-30 pointer-events-auto cursor-grab"
              >
                <div className="relative flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
                  <CircularText
                    text="OPEN TO WORK • OPEN TO WORK • "
                    spinDuration={16}
                    onHover="speedUp"
                    className="w-28 h-28 sm:w-32 sm:h-32 text-white"
                  />
                  {/* Inner Disc Icon */}
                  <div className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-black/90 border border-sky-400/40 flex items-center justify-center shadow-lg pointer-events-none">
                    <IconSparkles className="w-4 h-4 text-sky-300 animate-pulse" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Center Get In Touch CTA Button */}
            <div className="pt-2">
              <a href="/contact">
                <InteractiveHoverButton icon={<IconArrowUpRight className="h-4 w-4" />}>
                  Get In Touch
                </InteractiveHoverButton>
              </a>
            </div>

            {/* Subtitle / Availability Statements */}
            <div className="space-y-3 pt-6 max-w-2xl border-t border-white/15 w-full">
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-white drop-shadow-sm">
                I&apos;m available for full-time roles &amp; freelance projects.
              </h3>
              <p className="text-neutral-200 font-sans text-xs sm:text-sm leading-relaxed max-w-lg mx-auto">
                I thrive on crafting dynamic web applications and delivering seamless user experiences.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
