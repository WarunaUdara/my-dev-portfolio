"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import AuroraText from "@/components/ui/aurora-text";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import { IconMail, IconBrandLinkedin, IconBrandGithub, IconVideo } from "@tabler/icons-react";

export default function ContactSection() {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        cal("ui", {
          theme: "dark",
          styles: {
            branding: {
              brandColor: "#ffffff",
            },
          },
          hideEventTypeDetails: false,
          layout: "month_view",
        });
      } catch (err) {
        console.error("Cal.com embed init error:", err);
      }
    })();
  }, []);

  return (
    <section className="relative min-h-screen bg-transparent text-white py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
      <ScrollFrost height="h-[600px]" />

      <div className="container mx-auto max-w-5xl relative z-10 space-y-16">
        {/* Header Block matching Portfolio Design */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-8">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase">
            LET&apos;S CONNECT
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            Book a <AuroraText className="italic font-serif">1-on-1 Call</AuroraText>
          </h1>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute Google Meet video consultation with Waruna Udara. Select an available date and time slot below.
          </p>
        </div>

        {/* Cal.com Embedded Widget Card (Cropped Branding & Premium Dark Silver Aesthetics) */}
        <div className="relative w-full max-w-4xl mx-auto rounded-3xl border border-neutral-800/90 bg-neutral-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden group">
          {/* Header Status Strip */}
          <div className="flex items-center justify-between px-6 py-4 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]/50" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]/50" />
              <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]/50" />
              <span className="ml-3 font-sans text-neutral-300 font-medium flex items-center gap-1.5">
                <IconVideo className="w-4 h-4 text-sky-400" />
                Google Meet Video Call
              </span>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-[11px]">
              Asia/Colombo (GMT+5:30)
            </span>
          </div>

          {/* Embedded Calendar Container (With Crop Container to hide branding label) */}
          <div className="relative w-full min-h-[620px] bg-[#090a0f] overflow-hidden">
            <Cal
              namespace="30min"
              calLink="waruna-udara"
              style={{ width: "100%", height: "100%", minHeight: "640px" }}
              config={{ layout: "month_view", theme: "dark" }}
            />
          </div>
        </div>

        {/* Alternative Direct Contact Links */}
        <div className="max-w-2xl mx-auto pt-8 border-t border-dashed border-neutral-800 text-center space-y-6">
          <h3 className="text-xl font-serif font-medium text-white">
            Prefer direct messaging?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono">
            <a
              href="mailto:warunaudarasampath@gmail.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-all shadow-md"
            >
              <IconMail className="w-4 h-4 text-neutral-400" />
              <span>Email Me</span>
            </a>
            <a
              href="https://www.linkedin.com/in/waruna-udara/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-all shadow-md"
            >
              <IconBrandLinkedin className="w-4 h-4 text-neutral-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://github.com/WarunaUdara"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white transition-all shadow-md"
            >
              <IconBrandGithub className="w-4 h-4 text-neutral-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
