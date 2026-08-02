"use client";
import { useState, useEffect, useRef } from "react";
import Image from "@/components/ui/Image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Aurora from "../ui/Aurora";
import FloatingSparkles from "../ui/FloatingSparkles";
import { BentoDemo } from "./BentoDemo";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { IconCopy, IconCheck, IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const hero = heroRef.current;

    // Initial loading animations
    const ctx = gsap.context(() => {
      // Timeline for initial entrance animations
      const entranceTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Fade in and zoom the main heading (staggered words)
      entranceTl.fromTo(
        ".hero-heading-line",
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
        }
      );

      // Fade in subheading with slight delay
      entranceTl.fromTo(
        ".hero-subheading",
        { 
          opacity: 0, 
          y: 30,
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
        },
        "-=0.6"
      );

      // Fade and slide in CTA buttons
      entranceTl.fromTo(
        ".hero-cta",
        { 
          opacity: 0, 
          y: 30,
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8,
        },
        "-=0.4"
      );

      // Fade in aurora background
      entranceTl.fromTo(
        ".aurora-bg",
        { 
          opacity: 0,
        },
        { 
          opacity: 1,
          duration: 1.5,
        },
        0
      );

      // Eclipse animation - fade up and zoom in
      entranceTl.fromTo(
        ".eclipse-wrapper",
        { 
          opacity: 0,
          y: 100,
          scale: 1.1,
        },
        { 
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1"
      );

      // Glow effect fade in
      entranceTl.fromTo(
        ".eclipse-glow",
        { 
          opacity: 0,
          scale: 0.8,
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 1.2,
        },
        "-=1.2"
      );

      // Sparkles fade in
      entranceTl.fromTo(
        ".sparkles-wrapper",
        { 
          opacity: 0,
        },
        { 
          opacity: 1,
          duration: 1,
        },
        "-=0.8"
      );
    }, hero);

    // Scroll-triggered parallax animation
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate scale and border radius on scroll
    scrollTl.to(hero, {
      scale: 0.85,
      borderRadius: "32px",
      ease: "none",
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === hero) {
          trigger.kill();
        }
      });
    };
  }, []);

  const handleCopyEmail = async () => {
    const email = "warunaudarasam2003@gmail.com";
    
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return;
    }

    try {
      // Modern clipboard API (works in HTTPS)
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setToastMessage("Copied to clipboard!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setCopied(false);
        }, 3000);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement("textarea");
        textArea.value = email;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (successful) {
          setCopied(true);
          setToastMessage("Copied to clipboard!");
          setShowToast(true);
          setTimeout(() => {
            setShowToast(false);
            setCopied(false);
          }, 3000);
        } else {
          throw new Error('Fallback copy failed');
        }
      }
    } catch {
      // Show error message to user
      setToastMessage("Couldn't copy. Click 'Send Email' instead.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
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
          className="relative min-h-screen flex items-center justify-center overflow-hidden origin-top will-change-transform pb-28 sm:pb-0"
          style={{ transformOrigin: 'top center' }}
        >
          {/* Aurora Background Animation */}
          <div className="absolute inset-0 z-0 aurora-bg">
            <Aurora
              colorStops={["#003CAA", "#000000", "#0059FF"]}
              blend={0.6}
              amplitude={1.0}
              speed={0.5}
            />
            
          </div>

          <div className="container mx-auto max-w-6xl w-full z-20 px-6 sm:px-6 relative flex items-center justify-center">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center text-center w-full space-y-5 sm:space-y-8">
              {/* Main Heading */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-serif leading-tight w-full">
                <span className="block hero-heading-line">Transforming ideas into</span>
                <span className="block text-5xl sm:text-6xl xl:text-8xl italic font-serif hero-heading-line bg-gradient-to-t from-[#f8fafc] via-[#cbd5e1] to-[#64748b] bg-clip-text text-transparent [text-shadow:0_18px_55px_rgba(226,232,240,0.18)]">seamless solutions</span>
              </h1>

              {/* Subheading with Silver Gradient */}
              <div className="flex items-center justify-center text-lg sm:text-xl md:text-xl hero-subheading">
                <span className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                  Hello, I&apos;m Waruna Udara, a Software Developer
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 w-full hero-cta">
                <a href="https://www.linkedin.com/in/waruna-udara/" target="_blank" rel="noopener noreferrer">
                  <InteractiveHoverButton icon={<IconArrowUpRight className="h-4 w-4" />}>
                    Let&apos;s Connect
                  </InteractiveHoverButton>
                </a>

                {/* <button
                  className={cn(
                    "group relative inline-flex items-center gap-3 px-6 py-3.5 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:scale-105 active:scale-95 text-xs sm:text-sm font-sans font-medium",
                    copied
                      ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                      : "bg-neutral-950/90 border-neutral-800 hover:border-neutral-500 text-neutral-200 hover:text-white"
                  )}
                  onClick={handleCopyEmail}
                  type="button"
                >
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full border flex items-center justify-center transition-all",
                      copied
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : "bg-neutral-900 border-neutral-700/80 text-neutral-400 group-hover:text-white group-hover:border-neutral-500"
                    )}
                  >
                    {copied ? (
                      <IconCheck className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <IconCopy className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                    )}
                  </div>
                  <span className="font-mono tracking-tight">{copied ? "Copied to Clipboard!" : "warunaudarasam2003@gmail.com"}</span>
                </button> */}
              </div>
            </div>
          </div>

          {/* Mobile Eclipse - pinned to the hero section */}
          <div className="absolute inset-x-0 bottom-0 sm:hidden pointer-events-none z-30 eclipse-wrapper">
            <div className="relative mx-auto h-[100px] w-full overflow-hidden">
              <Image
                src="/eclipse.webp"
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-bottom"
                priority
                unoptimized
              />
              <div className="absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black via-black/60 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black via-black/60 to-transparent"></div>
            </div>
          </div>

          {/* Purple Glow Effect on Eclipse */}
          <div className="hidden sm:block absolute -bottom-16 sm:-bottom-48 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[200px] sm:h-[300px] pointer-events-none z-5 eclipse-glow">
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-8)]/40 via-[var(--color-9)]/20 to-transparent blur-3xl"></div>
          </div>

          {/* Eclipse Background - Full Width */}
          <div className="hidden sm:block absolute -bottom-16 sm:-bottom-40 left-0 right-0 w-full overflow-hidden pointer-events-none z-10 eclipse-wrapper">
            <Image
              src="/eclipse.webp"
              alt=""
              width={1920}
              height={400}
              className="w-full h-auto object-cover"
              priority
              unoptimized
            />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/70 to-transparent"></div>
          </div>

          {/* Floating Sparkles Effect */}
          <div className="sparkles-wrapper">
            <FloatingSparkles />
          </div>
          
        </section>

        {/* Toast Notification - High Contrast Silver, Black & White Glassmorphism */}
        {showToast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[100] pointer-events-auto px-4 sm:px-0">
            <div className="bg-neutral-950/95 border border-white/20 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.1)] p-4 flex items-center gap-4 w-full sm:min-w-[340px] max-w-[90vw] sm:max-w-none animate-in slide-in-from-top-3 fade-in duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-sans font-semibold text-sm drop-shadow">{toastMessage}</p>
              </div>
              <a
                href="mailto:warunaudarasam2003@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-white via-neutral-100 to-neutral-300 hover:from-white hover:to-white text-black font-semibold text-xs rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.25)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap"
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