"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const RevealingQuote = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    // Split text into words
    const splitText = new SplitType(textElement, {
      types: "words",
    });

    const words = splitText.words || [];

    // First 5 words: "I translate curiosity into structure,"
    const revealedWords = 5;

    // Style each word
    words.forEach((word, index) => {
      word.style.display = "inline-block";
      word.style.whiteSpace = "pre-wrap";

      if (index < revealedWords) {
        // First part - already revealed (white)
        word.style.color = "rgb(255, 255, 255)";
      } else {
        // Rest - start as gray
        word.style.color = "#2e2e2b";
      }
    });

    // Get only the words that need to be revealed
    const wordsToReveal = words.slice(revealedWords);

    // Create timeline for each word to reveal one at a time
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=250%",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });

    // Add each word to the timeline with a sequential animation
    wordsToReveal.forEach((word, index) => {
      timeline.to(
        word,
        {
          color: "rgb(255, 255, 255)",
          duration: 0.5,
          ease: "none",
        },
        index * 0.5
      ); // Start each word after the previous one
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      splitText.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-black text-white flex items-center justify-center py-20 px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-4">
            PHILOSOPHY
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif mb-2">
            What{" "}
            <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">
              Drives Me
            </span>
          </h2>
        </div>
        <div
          ref={textRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-center"
        >
          I translate curiosity into structure, knowing technology defines
          future time. Every system carries ethical consequence, so I build with
          clarity and care.
        </div>
      </div>
    </section>
  );
};

export default RevealingQuote;
