import React from 'react';
import Image from '@/components/ui/Image';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import ScrollFrost from '@/components/canvasui/ScrollFrost';
import AuroraText from '@/components/ui/aurora-text';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';

interface AboutProps {
  isAboutPage?: boolean;
}

const About = ({ isAboutPage = false }: AboutProps) => {
  return (
    <section id="about" className="relative min-h-screen bg-black text-white py-20 px-4 sm:px-6 scroll-mt-20 overflow-hidden">
      {/* Background Frost Layer with Scroll Trigger */}
      <ScrollFrost height="h-[68%]" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Label */}
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gray-500 mb-6 text-center lg:text-left">
          KNOW ABOUT ME
        </p>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight text-center lg:text-left">
              <span className="block">Full-Stack Developer and</span>
              <span>a little bit of{' '}</span>
              <AuroraText className="italic font-serif">
                everything
              </AuroraText>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-gray-200 text-base sm:text-lg leading-relaxed">
              <p>
                Driven by a deep curiosity for modern software systems, cloud architecture, and intuitive user design. Over the past 4+ years, I&apos;ve engineered robust web platforms, automated cloud infrastructures, and led tech communities.
              </p>
              <p>
                Whether orchestrating containerized microservices, diving into frontend design systems, or exploring artificial intelligence, I build software that is performant, scalable, and delightful.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4 justify-center lg:justify-start">
              <a
                href="https://github.com/WarunaUdara"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all hover:scale-110"
              >
                <IconBrandGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/waruna-udara/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-600 transition-all hover:scale-110"
              >
                <IconBrandLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Image Showcase */}
          <div className="relative lg:order-last order-first flex items-center justify-center">
            {isAboutPage ? (
              /* About Page Exclusive: Heroic Waruna Portrait + Subtle Orbiting DevOps Circles */
              <div className="relative flex h-[580px] w-full max-w-[580px] items-center justify-center">
                {/* Orbiting Circles Layer 1 (Inner Orbit) */}
                <OrbitingCircles radius={170} duration={28} iconSize={40}>
                  <div className="w-10 h-10 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/icons8-kubernetes-48.png" alt="Kubernetes" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/icons8-terraform-48.png" alt="Terraform" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/aws.png" alt="AWS" width={28} height={28} className="object-contain" />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/icons8-docker-144.png" alt="Docker" width={28} height={28} className="object-contain" />
                  </div>
                </OrbitingCircles>

                {/* Orbiting Circles Layer 2 (Outer Orbit, Reverse) */}
                <OrbitingCircles radius={250} duration={38} reverse iconSize={44}>
                  <div className="w-11 h-11 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/opentofu.webp" alt="OpenTofu" width={30} height={30} className="object-contain" />
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/icons8-azure-96.png" alt="Azure" width={30} height={30} className="object-contain" />
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/Linux.png" alt="Linux" width={30} height={30} className="object-contain" />
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-neutral-950/90 border border-neutral-800/90 p-2 shadow-lg flex items-center justify-center">
                    <Image src="/argo-cd.webp" alt="Argo CD" width={30} height={30} className="object-contain" />
                  </div>
                </OrbitingCircles>

                {/* Prominent Waruna Speaking Portrait - Direct Image Masking for PNG Transparency */}
                <div className="relative z-20 w-80 sm:w-96 md:w-[420px] h-[480px] sm:h-[520px] flex items-end justify-center">
                  <Image
                    src="/me/waruna-speaking.png"
                    alt="Waruna Udara Speaking"
                    fill
                    className="object-cover object-top"
                    style={{
                      WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 98%)",
                      maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 65%, rgba(0,0,0,0) 98%)",
                    }}
                    priority
                  />
                </div>
              </div>
            ) : (
              /* Landing Page Standard Image Frame */
              <div className="relative w-full max-w-md mx-auto lg:max-w-full">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 via-neutral-800 to-neutral-950 rounded-3xl transform rotate-3 border border-neutral-700/50"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/WarunaUdaraSampath.jpg"
                    alt="Waruna Udara Sampath"
                    width={500}
                    height={600}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;