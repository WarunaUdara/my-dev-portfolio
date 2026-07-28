"use client";

import React, { useEffect, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "@/components/ui/Image";
import AuroraText from "@/components/ui/aurora-text";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import { IconMail, IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";

export default function ContactSection() {
  const [showLogo, setShowLogo] = useState(true);

  // Smooth continuous transition between Logo and Profile Image
  useEffect(() => {
    const interval = setInterval(() => {
      setShowLogo((prev) => !prev);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

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
      } catch (err) {
        console.error("Cal.com embed init error:", err);
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
        {/* Header Block with Animated Logo / Profile Transition */}
        <div className="text-center max-w-3xl mx-auto space-y-5 pt-4 flex flex-col items-center">
          
          {/* Animated Avatar Badge (Transitioning Logo & Profile Image) */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-gradient-to-tr from-neutral-800 via-white/20 to-neutral-800 shadow-[0_0_25px_rgba(255,255,255,0.15)] cursor-pointer group"
            onClick={() => setShowLogo(!showLogo)}
            title="Click to toggle Logo / Profile Photo"
          >
            <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-950 flex items-center justify-center border border-white/10">
              <AnimatePresence mode="wait">
                {showLogo ? (
                  <motion.div
                    key="logo"
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-10 h-10 sm:w-12 sm:h-12"
                  >
                    <Image
                      src="/logo.svg"
                      alt="Waruna Udara Logo"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="profile"
                    initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/waruna-udara.jpg"
                      alt="Waruna Udara"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Subtle Pulsing Halo Ring */}
            <div className="absolute -inset-1 rounded-full bg-white/10 blur-sm -z-10 group-hover:bg-white/20 transition-all duration-300" />
          </div>

          {/* Google Meet Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-mono text-neutral-300 shadow-md">
            <Image
              src="/icons8-google-meet-48.png"
              alt="Google Meet"
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Google Meet 1-on-1 Call</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight tracking-tight">
            Book a <AuroraText className="italic font-serif">1-on-1 Call</AuroraText>
          </h1>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Schedule a 30-minute Google Meet video consultation with Waruna Udara. Select an available date and time slot below.
          </p>
        </div>

        {/* Stable Fixed-Height Cal.com Embed Container (Crops out bottom Cal.com link & prevents scroll stuttering) */}
        <div className="w-full max-w-4xl mx-auto h-[565px] max-h-[565px] overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#090a0f] shadow-2xl relative z-10">
          <Cal
            namespace="30min"
            calLink="waruna-udara"
            style={{ width: "100%", height: "575px", overflow: "hidden" }}
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
