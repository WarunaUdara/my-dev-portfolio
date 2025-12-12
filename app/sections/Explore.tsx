"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { IconBrandSpotify } from '@tabler/icons-react';
import { DottedGlowBackground } from '@/components/ui/dotted-glow-background';

interface SpotifyData {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
}

const Explore = () => {
  const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Refs for GSAP animations
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const noteCard1Ref = useRef<HTMLDivElement>(null);
  const noteCard2Ref = useRef<HTMLDivElement>(null);
  const vinylRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);
  
  // Animation timeline refs
  const card1TlRef = useRef<gsap.core.Timeline | null>(null);
  const card2TlRef = useRef<gsap.core.Timeline | null>(null);
  const card3TlRef = useRef<gsap.core.Timeline | null>(null);
  const vinylTlRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const fetchSpotifyData = async () => {
      try {
        const response = await fetch('/api/spotify/now-playing');
        if (response.ok) {
          const data = await response.json();
          setSpotifyData(data);
        }
      } catch (error) {
        console.error('Failed to fetch Spotify data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpotifyData();
    const interval = setInterval(fetchSpotifyData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Setup hover-triggered animations
  useEffect(() => {
    // Card 1: Wave animation for icons - triggered on hover
    if (icon1Ref.current && icon2Ref.current && icon3Ref.current && card1Ref.current) {
      // Create paused timeline
      const waveTl = gsap.timeline({ paused: true });
      
      // Wave effect: center icon moves first, then side icons follow with stagger
      waveTl
        .to(icon2Ref.current, {
          y: -18,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to([icon1Ref.current, icon3Ref.current], {
          y: -14,
          scale: 1.03,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0
        }, 0.1)
        // Border glow follows the wave
        .to(card1Ref.current, {
          borderColor: "rgba(59, 130, 246, 0.6)",
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.2), inset 0 0 20px rgba(59, 130, 246, 0.05)",
          duration: 0.5,
          ease: "power2.out"
        }, 0.15)
        // Icon borders glow in wave order
        .to(icon2Ref.current, {
          borderColor: "rgba(59, 130, 246, 0.5)",
          boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          duration: 0.3,
          ease: "power2.out"
        }, 0.05)
        .to([icon1Ref.current, icon3Ref.current], {
          borderColor: "rgba(59, 130, 246, 0.4)",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.2)",
          duration: 0.3,
          ease: "power2.out"
        }, 0.15);
      
      card1TlRef.current = waveTl;
      
      const card1 = card1Ref.current;
      const onEnter1 = () => waveTl.play();
      const onLeave1 = () => waveTl.reverse();
      
      card1.addEventListener('mouseenter', onEnter1);
      card1.addEventListener('mouseleave', onLeave1);
      
      // Cleanup
      return () => {
        card1.removeEventListener('mouseenter', onEnter1);
        card1.removeEventListener('mouseleave', onLeave1);
      };
    }
  }, []);

  // Card 2 hover animation
  useEffect(() => {
    if (noteCard1Ref.current && noteCard2Ref.current && card2Ref.current) {
      const noteTl = gsap.timeline({ paused: true });
      
      // Floating cards animate on hover
      noteTl
        .to(noteCard1Ref.current, {
          y: -15,
          rotation: -6,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out"
        }, 0)
        .to(noteCard2Ref.current, {
          y: -10,
          rotation: 8,
          scale: 1.05,
          duration: 0.5,
          ease: "power2.out"
        }, 0.1)
        // Border glow
        .to(card2Ref.current, {
          borderColor: "rgba(168, 85, 247, 0.6)",
          boxShadow: "0 0 30px rgba(168, 85, 247, 0.2), inset 0 0 20px rgba(168, 85, 247, 0.05)",
          duration: 0.5,
          ease: "power2.out"
        }, 0.1)
        // Note card glows
        .to(noteCard1Ref.current, {
          borderColor: "rgba(168, 85, 247, 0.5)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
          duration: 0.4,
          ease: "power2.out"
        }, 0.1)
        .to(noteCard2Ref.current, {
          borderColor: "rgba(236, 72, 153, 0.5)",
          boxShadow: "0 0 20px rgba(236, 72, 153, 0.3)",
          duration: 0.4,
          ease: "power2.out"
        }, 0.2);
      
      card2TlRef.current = noteTl;
      
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

  // Card 3 hover animation
  useEffect(() => {
    if (card3Ref.current && vinylRef.current && albumRef.current) {
      const spotifyTl = gsap.timeline({ paused: true });
      
      // Vinyl spin and album scale on hover
      spotifyTl
        .to(albumRef.current, {
          scale: 1.08,
          duration: 0.5,
          ease: "power2.out"
        }, 0)
        .to(card3Ref.current, {
          borderColor: "rgba(34, 197, 94, 0.6)",
          boxShadow: "0 0 30px rgba(34, 197, 94, 0.25), inset 0 0 20px rgba(34, 197, 94, 0.05)",
          duration: 0.5,
          ease: "power2.out"
        }, 0);
      
      card3TlRef.current = spotifyTl;
      
      // Separate vinyl rotation (continuous while hovering)
      const vinylRotation = gsap.to(vinylRef.current, {
        rotation: "+=360",
        duration: 3,
        repeat: -1,
        ease: "none",
        paused: true
      });
      vinylTlRef.current = vinylRotation;
      
      const card3 = card3Ref.current;
      const onEnter3 = () => {
        spotifyTl.play();
        vinylRotation.play();
      };
      const onLeave3 = () => {
        spotifyTl.reverse();
        vinylRotation.pause();
      };
      
      card3.addEventListener('mouseenter', onEnter3);
      card3.addEventListener('mouseleave', onLeave3);
      
      return () => {
        card3.removeEventListener('mouseenter', onEnter3);
        card3.removeEventListener('mouseleave', onLeave3);
        vinylRotation.kill();
      };
    }
  }, [spotifyData]);

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-pink-600/5 rounded-full blur-3xl pointer-events-none animate-pulse" />

      {/* Dot Pattern Background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-[0.3em] mb-4">
            MY SITE
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif leading-tight">
            Explore, experiment <br />
            <span className="italic bg-gradient-to-r from-[var(--color-8)] via-[var(--color-9)] to-[var(--color-8)] bg-clip-text text-transparent">
              & say hello
            </span>
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Card 1: USES */}
          <div className="group relative">
            <Link href="/uses" className="block">
              <div 
                ref={card1Ref}
                className="relative bg-black border-2 border-white/10 rounded-[32px] p-8 h-[380px] overflow-hidden transition-border duration-300"
              >
                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Tool Icons with Wave Animation */}
                <div className="flex items-center justify-center gap-4 mb-8 mt-12">
                  <div
                    ref={icon1Ref}
                    className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-white/20 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/obsidian-icon.png" alt="Obsidian" width={48} height={48} className="object-contain" />
                  </div>
                  <div
                    ref={icon2Ref}
                    className="w-28 h-28 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-white/20 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/icons8-vs-code-96.png" alt="VSCode" width={56} height={56} className="object-contain" />
                  </div>
                  <div
                    ref={icon3Ref}
                    className="w-24 h-24 bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-white/20 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-300"
                  >
                    <Image src="/notebooklm.png" alt="NotebookLM" width={48} height={48} className="object-contain" />
                  </div>
                </div>

                {/* Text Content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">USES</p>
                  <h3 className="text-xl font-semibold text-white leading-relaxed">
                    Check out my favorite tools and spots around the web.
                  </h3>
                </div>
              </div>
            </Link>
          </div>

          {/* Card 2: GUESTBOOK */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            
            <Link href="/guestbook" className="block">
              <div 
                ref={card2Ref}
                className="relative bg-black border-2 border-white/10 rounded-[32px] p-8 h-[380px] overflow-hidden transition-border duration-300"
              >
                
                {/* Hover Arrow */}
                <div className="absolute bottom-8 right-8 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>

                {/* Floating Note Cards */}
                <div className="relative h-64 mt-8">
                  <div
                    ref={noteCard1Ref}
                    className="absolute left-8 top-4 w-40 h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-2xl border border-cyan-500/30 -rotate-12 group-hover:rotate-[-8deg] transition-transform duration-500 overflow-hidden"
                    style={{ willChange: 'transform' }}
                  >
                    {/* <DottedGlowBackground
                      className="pointer-events-none absolute inset-0"
                      opacity={0.8}
                      gap={8}
                      radius={1.2}
                      colorLightVar="--color-neutral-600"
                      glowColorLightVar="--color-cyan-500"
                      colorDarkVar="--color-neutral-600"
                      glowColorDarkVar="--color-cyan-500"
                      backgroundOpacity={0}
                      speedMin={0.3}
                      speedMax={1.2}
                      speedScale={1}
                    /> */}
                    <div className="relative z-10 space-y-3">
                      <div className="h-3 bg-cyan-400/40 rounded-full w-3/4"></div>
                      <div className="h-3 bg-white/20 rounded-full w-full"></div>
                      <div className="h-3 bg-white/20 rounded-full w-5/6"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-cyan-400/30 rounded-full z-10"></div>
                  </div>

                  <div
                    ref={noteCard2Ref}
                    className="absolute right-8 top-12 w-40 h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-2xl p-6 shadow-2xl border border-purple-500/30 rotate-12 group-hover:rotate-[8deg] transition-transform duration-500 overflow-hidden"
                    style={{ willChange: 'transform' }}
                  >
                    {/* <DottedGlowBackground
                      className="pointer-events-none absolute inset-0"
                      opacity={0.8}
                      gap={8}
                      radius={1.2}
                      colorLightVar="--color-neutral-600"
                      glowColorLightVar="--color-purple-500"
                      colorDarkVar="--color-neutral-600"
                      glowColorDarkVar="--color-purple-500"
                      backgroundOpacity={0}
                      speedMin={0.3}
                      speedMax={1.2}
                      speedScale={1}
                    /> */}
                    <div className="relative z-10 space-y-3">
                      <div className="h-3 bg-purple-400/40 rounded-full w-2/3"></div>
                      <div className="h-3 bg-white/20 rounded-full w-full"></div>
                      <div className="h-3 bg-white/20 rounded-full w-4/5"></div>
                      <div className="h-3 bg-white/20 rounded-full w-3/4"></div>
                    </div>
                    <div className="absolute bottom-4 left-4 w-10 h-10 bg-purple-400/30 rounded-full z-10"></div>
                  </div>
                </div>
                
                

                {/* Text Content */}
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">GUESTBOOK</p>
                  <h3 className="text-xl font-semibold text-white leading-relaxed">
                    Let me know you were here
                  </h3>
                </div>
              </div>
            </Link>
            
          </div>

          {/* Card 3: SPOTIFY - Currently Playing */}
          <div className="group relative md:col-span-2 lg:col-span-1">
            <div 
              ref={card3Ref}
              className="relative bg-black border-2 border-white/10 rounded-[32px] p-8 h-[380px] overflow-hidden transition-border duration-300"
            >
              {/* Spotify Logo */}
              <div className="flex items-center gap-3 mb-6">
                <IconBrandSpotify className="w-8 h-8 text-[#1DB954]" />
                <h3 className="text-xl font-bold text-white">Currently Playing</h3>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : spotifyData ? (
                <a 
                  href={spotifyData.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Song Info */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">
                      {spotifyData.isPlaying ? "I'm listening to" : "Last played"}
                    </p>
                    <p className="text-lg font-bold text-white mb-1">
                      {spotifyData.title}
                    </p>
                    <p className="text-base text-gray-300">
                      by <span className="font-semibold">{spotifyData.artist}</span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      from <span className="font-medium">{spotifyData.album}</span>
                    </p>
                  </div>

                  {/* Album Artwork with Vinyl Animation */}
                  <div className="relative w-full h-56 flex items-center justify-center">
                    {/* Vinyl Record Background */}
                    <div
                      ref={vinylRef}
                      className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 shadow-2xl opacity-40"
                      style={{
                        background: 'radial-gradient(circle, #1a1a1a 30%, #0a0a0a 70%)',
                        willChange: 'transform'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                      <div className="absolute inset-[20%] rounded-full bg-zinc-950 border-2 border-white/10"></div>
                    </div>

                    {/* Album Cover */}
                    <div ref={albumRef} className="relative w-40 h-40 rounded-lg overflow-hidden shadow-2xl z-10 transition-shadow duration-300">
                      <Image
                        src={spotifyData.albumImageUrl}
                        alt={spotifyData.album}
                        fill
                        className="object-cover"
                        sizes="160px"
                        priority
                        quality={90}
                      />
                    </div>
                  </div>
                </a>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <IconBrandSpotify className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-center">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Explore;