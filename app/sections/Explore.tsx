"use client";

import React, { useEffect, useRef } from 'react';
import Image from '@/components/ui/Image';
import Link from '@/components/ui/Link';
import { gsap } from 'gsap';
import AuroraText from '@/components/ui/aurora-text';
import { IconPencil, IconMessageCircle, IconSparkles, IconArrowRight } from '@tabler/icons-react';

const Explore = () => {
  // Refs for GSAP animations
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const noteCard1Ref = useRef<HTMLDivElement>(null);
  const noteCard2Ref = useRef<HTMLDivElement>(null);

  // Setup hover animations
  useEffect(() => {
    // Card 1: Wave animation for tool icons
    if (icon1Ref.current && icon2Ref.current && icon3Ref.current && card1Ref.current) {
      const waveTl = gsap.timeline({ paused: true });
      waveTl
        .to(icon2Ref.current, { y: -18, scale: 1.05, duration: 0.4, ease: "power2.out" }, 0)
        .to([icon1Ref.current, icon3Ref.current], { y: -14, scale: 1.03, duration: 0.4, ease: "power2.out" }, 0.1)
        .to(card1Ref.current, { borderColor: "rgba(59, 130, 246, 0.6)", boxShadow: "0 0 30px rgba(59, 130, 246, 0.2)" }, 0.15);
      
      const card1 = card1Ref.current;
      const onEnter1 = () => waveTl.play();
      const onLeave1 = () => waveTl.reverse();
      card1.addEventListener('mouseenter', onEnter1);
      card1.addEventListener('mouseleave', onLeave1);
      return () => {
        card1.removeEventListener('mouseenter', onEnter1);
        card1.removeEventListener('mouseleave', onLeave1);
      };
    }
  }, []);

  useEffect(() => {
    // Card 2: Floating Note Cards
    if (noteCard1Ref.current && noteCard2Ref.current && card2Ref.current) {
      const noteTl = gsap.timeline({ paused: true });
      noteTl
        .to(noteCard1Ref.current, { y: -15, rotation: -6, scale: 1.05, duration: 0.5, ease: "power2.out" }, 0)
        .to(noteCard2Ref.current, { y: -10, rotation: 8, scale: 1.05, duration: 0.5, ease: "power2.out" }, 0.1)
        .to(card2Ref.current, { borderColor: "rgba(168, 85, 247, 0.6)", boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }, 0.1);
      
      const card2 = card2Ref.current;
      const onEnter2 = () => noteTl.play();
      const onLeave2 = () => noteTl.reverse();
      card2.addEventListener('mouseenter', onEnter2);
      card2.addEventListener('mouseleave', onLeave2);
      return () => {
        card2.removeEventListener('mouseenter', onEnter2);
        card2.removeEventListener('mouseleave', onLeave2);
      };
    }
  }, []);

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Grid Pattern Background */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase font-semibold">
            EXPLORE &amp; CONNECT
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif leading-tight">
            Explore, experiment <br />
            <AuroraText className="italic font-serif">
              &amp; say hello
            </AuroraText>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          
          {/* Card 1: USES */}
          <div className="group relative">
            <Link href="/uses" className="block">
              <div 
                ref={card1Ref}
                className="relative bg-neutral-950 border-2 border-white/10 rounded-[32px] p-8 h-[390px] overflow-hidden transition-all duration-300 group-hover:border-sky-500/50"
              >
                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <IconArrowRight className="w-5 h-5 text-white" />
                </div>

                {/* Tool Icons with Wave Animation */}
                <div className="flex items-center justify-center gap-4 mb-8 mt-8">
                  <div
                    ref={icon1Ref}
                    className="w-20 h-20 bg-gradient-to-br from-neutral-900 to-black border border-white/20 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/obsidian-icon.png" alt="Obsidian" width={42} height={42} className="object-contain" />
                  </div>
                  <div
                    ref={icon2Ref}
                    className="w-24 h-24 bg-gradient-to-br from-neutral-900 to-black border border-white/20 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/icons8-vs-code-96.png" alt="VSCode" width={50} height={50} className="object-contain" />
                  </div>
                  <div
                    ref={icon3Ref}
                    className="w-20 h-20 bg-gradient-to-br from-neutral-900 to-black border border-white/20 rounded-2xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/notebooklm.png" alt="NotebookLM" width={42} height={42} className="object-contain" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-8 left-8 right-8 space-y-1.5">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">SETUP &amp; STACK</p>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    Check out my favorite tools, hardware and developer spots.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2: GUESTBOOK */}
          <div className="group relative">
            <Link href="/guestbook" className="block">
              <div 
                ref={card2Ref}
                className="relative bg-neutral-950 border-2 border-white/10 rounded-[32px] p-8 h-[390px] overflow-hidden transition-all duration-300 group-hover:border-purple-500/50"
              >
                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-11 h-11 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <IconArrowRight className="w-5 h-5 text-white" />
                </div>

                {/* Floating Note Cards */}
                <div className="relative h-56 mt-4">
                  <div
                    ref={noteCard1Ref}
                    className="absolute left-6 top-2 w-36 h-44 bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-5 shadow-2xl border border-cyan-500/30 -rotate-12 group-hover:rotate-[-8deg] transition-transform duration-500 overflow-hidden"
                  >
                    <div className="relative z-10 space-y-2.5">
                      <div className="h-2.5 bg-cyan-400/50 rounded-full w-3/4" />
                      <div className="h-2.5 bg-white/20 rounded-full w-full" />
                      <div className="h-2.5 bg-white/20 rounded-full w-5/6" />
                    </div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 bg-cyan-400/30 rounded-full z-10" />
                  </div>

                  <div
                    ref={noteCard2Ref}
                    className="absolute right-6 top-8 w-36 h-44 bg-gradient-to-br from-neutral-900 to-black rounded-2xl p-5 shadow-2xl border border-purple-500/30 rotate-12 group-hover:rotate-[8deg] transition-transform duration-500 overflow-hidden"
                  >
                    <div className="relative z-10 space-y-2.5">
                      <div className="h-2.5 bg-purple-400/50 rounded-full w-2/3" />
                      <div className="h-2.5 bg-white/20 rounded-full w-full" />
                      <div className="h-2.5 bg-white/20 rounded-full w-4/5" />
                    </div>
                    <div className="absolute bottom-3 left-3 w-8 h-8 bg-purple-400/30 rounded-full z-10" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-8 left-8 right-8 space-y-1.5">
                  <p className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">COMMUNITY WALL</p>
                  <h3 className="text-xl font-semibold text-white leading-snug">
                    Let me know you were here — read &amp; leave notes.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 3: HIGH FOMO GUESTBOOK CTA (Replaced Spotify Card) */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <Link href="/guestbook" className="block">
              <div 
                ref={card3Ref}
                className="relative bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 border-2 border-emerald-500/30 hover:border-emerald-400 rounded-[32px] p-8 h-[390px] overflow-hidden transition-all duration-500 shadow-2xl group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
              >
                {/* Active Indicator & Title */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>35+ Messages Left</span>
                  </div>
                  <IconSparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
                </div>

                {/* FOMO Main Body */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-serif text-white font-medium leading-tight">
                    Don&apos;t leave without signing my wall!
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
                    Developers, designers &amp; friends from all over the world have dropped a note. Join them and leave your mark before you go!
                  </p>
                </div>

                {/* Avatar Stack + CTA Button */}
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between pt-4 border-t border-neutral-800">
                  {/* Fake Avatar Stack */}
                  <div className="flex items-center -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">WU</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-600 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">AK</div>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-600 border-2 border-black flex items-center justify-center text-[10px] font-bold text-white">SL</div>
                    <div className="w-8 h-8 rounded-full bg-neutral-800 border-2 border-black flex items-center justify-center text-[9px] font-mono text-neutral-300">+32</div>
                  </div>

                  {/* Sign Button */}
                  <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold group-hover:bg-emerald-400 transition-colors shadow-md">
                    <IconPencil className="w-3.5 h-3.5" />
                    <span>Sign Now</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Explore;
