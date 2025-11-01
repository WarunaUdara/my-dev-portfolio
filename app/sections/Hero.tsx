"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "../ui/Aurora";
import FloatingSparkles from "../ui/FloatingSparkles";
import { BentoDemo } from "./BentoDemo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [showToast, setShowToast] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const hero = heroRef.current;

    // Create parallax scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate scale and border radius
    tl.to(hero, {
      scale: 0.85,
      borderRadius: "32px",
      ease: "none",
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === hero) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = "warunaudarasam2003@gmail.com";
    
    try {
      await navigator.clipboard.writeText(email);
      
      // Show toast
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section
          ref={heroRef}
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden origin-top will-change-transform"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Aurora Background Animation */}
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#003CAA", "#000000", "#0059FF"]}
              blend={0.6}
              amplitude={1.0}
              speed={0.5}
            />
            
          </div>

          <div className="container mx-auto max-w-6xl w-full z-20 px-4 sm:px-6 relative">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-serif leading-tight">
                <span className="block">Transforming ideas into</span>
                <span className="block xl:text-8xl italic font-serif">seamless solutions</span>
              </h1>

              {/* Subheading with Silver Gradient */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                    Hello, I&apos;m Waruna Udara
                  </span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
                    {/* Add your profile image here */}
                    <Image
                      src="/waruna-udara.jpg"
                      alt="Waruna Udara"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                  a Full Stack Developer
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-4 sm:mt-6 w-full sm:w-auto">
                
                <a href="https://www.linkedin.com/in/waruna-udara/" target="_blank" rel="noopener noreferrer">
                  <InteractiveHoverButton> Let&apos;s Connect </InteractiveHoverButton>
                </a>

                <button className="w-full sm:w-auto px-4 py-3 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 text-sm sm:text-base group"
                  onClick={handleCopyEmail}
                  type="button"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">warunaudarasam2003@gmail.com</span>
                </button>
              </div>
            </div>
          </div>

          {/* Purple Glow Effect on Eclipse */}
          <div className="absolute bottom-0 sm:-bottom-48 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[200px] sm:h-[300px] pointer-events-none z-5">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/40 via-blue-500/20 to-transparent blur-3xl"></div>
          </div>

          {/* Eclipse Background - Full Width */}
          <div className="absolute bottom-0  sm:-bottom-40 left-0 right-0 w-screen pointer-events-none z-10">
            <Image
              src="/eclipse.png"
              alt=""
              width={1920}
              height={400}
              className="w-full h-auto object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Floating Sparkles Effect */}
          <FloatingSparkles />
          
        </section>

        {/* Toast Notification - Outside hero to prevent layout shift */}
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[100] pointer-events-auto px-4 sm:px-0">
            <div className="bg-[var(--color-2)] border border-[var(--color-5)] rounded-xl shadow-2xl p-4 flex items-center gap-3 w-full sm:min-w-[320px] max-w-[90vw] sm:max-w-none animate-in slide-in-from-top-2 fade-in duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-8)] to-[var(--color-9)] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">Copied to clipboard!</p>
                
              </div>
              <a
                href="mailto:warunaudarasam2003@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-3 py-1.5 bg-[var(--color-8)] hover:bg-[var(--color-9)] text-white text-xs rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Send Email
              </a>
            </div>
          </div>
        )}

        <BentoDemo/>
      </main>
      
    </div>
  );
}