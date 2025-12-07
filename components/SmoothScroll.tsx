"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * SmoothScroll - Adds smooth scrolling using Lenis
 * 
 * This component provides smooth scrolling without breaking:
 * - Scroll anchors and hash navigation
 * - ScrollTrigger animations
 * - Fixed/sticky positioning
 * - Native browser functionality
 */

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle anchor links with offset
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          e.preventDefault();
          const offset = 80; // Offset for fixed navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
          lenis.scrollTo(targetPosition, { duration: 1.2 });
        }
      }
    };

    // Handle initial hash on page load
    const handleInitialHash = () => {
      if (window.location.hash) {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
          setTimeout(() => {
            const offset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
            lenis.scrollTo(targetPosition, { duration: 1.2 });
          }, 100);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    handleInitialHash();

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  return <>{children}</>;
}
