"use client";

import React, { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import FigmaSplitLogo from "@/components/ui/FigmaSplitLogo";
import { IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export default function ContactSection() {
  // Initialize Cal API once
  useEffect(() => {
    let isMounted = true;
    (async function () {
      try {
        const cal = await getCalApi({ namespace: "30min" });
        if (isMounted) {
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
        }
      } catch {
        // Embed init is best-effort; failure should not block the page
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-transparent text-white py-16 px-4 sm:px-6 md:px-12 overflow-hidden">
      <ScrollFrost height="h-[600px]" />

      <div className="container mx-auto max-w-5xl relative z-10 space-y-12">
        {/* Header Block with Animated Figma Split 'W' Logo */}
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-4 flex flex-col items-center">
          
          {/* Animated Figma Split 'W' Logo (Replaced Image Animation) */}
          <div className="relative py-2 flex items-center justify-center">
            <FigmaSplitLogo size={84} />
          </div>

          {/* Google Meet Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-200 shadow-lg">
            <Image
              src="/techstack-icons/google-meet.webp"
              alt="Google Meet"
              width={22}
              height={22}
              className="object-contain"
            />
            <span className="font-semibold text-white">Google Meet 1-on-1 Call</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight tracking-tight">
            Book a <AuroraText className="italic font-serif">1-on-1 Call</AuroraText>
          </h1>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute Google Meet video consultation with Waruna Udara. Select an available date and time slot below.
          </p>
        </div>

        {/* Responsive Cal.com Container (Direct 30-min booking calendar view with clean bottom padding) */}
        <div className="w-full max-w-4xl mx-auto h-[640px] sm:h-[455px] sm:max-h-[455px] overflow-y-auto sm:overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#101010] shadow-2xl relative z-10">
          <Cal
            namespace="30min"
            calLink="waruna-udara/30min"
            style={{ width: "100%", height: "100%", minHeight: "100%" }}
            config={{ layout: "month_view", theme: "dark" }}
          />
        </div>

        {/* Direct Contact Links */}
        <div className="max-w-2xl mx-auto pt-6 border-t border-dashed border-neutral-800 text-center space-y-5">
          <h3 className="text-lg sm:text-xl font-serif font-medium text-white">
            Prefer direct messaging?
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-mono">
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
