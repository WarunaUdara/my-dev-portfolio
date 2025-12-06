import React from 'react';
import Image from 'next/image';
import { Linkedin, Github } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative min-h-screen bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Label */}
            <p className="text-sm text-gray-400 uppercase tracking-wider text-center py-8">
              KNOW ABOUT ME
            </p>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            

            {/* Main Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight text-center lg:text-left">
              <span className="block">Full-Stack Developer and</span>
              <span >a little bit of{' '}</span>
              <span className=" italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">
              everything
              </span>
            </h2>

            {/* Description Paragraphs */}
            <div className="space-y-6 text-gray-200 text-base sm:text-lg leading-relaxed">
              <p>
                I&apos;m Waruna Udara Sampath, a proactive full-stack developer passionate 
                about creating dynamic web experiences. From frontend to backend, I thrive 
                on solving complex problems with clean, efficient code. My expertise spans 
                Java, Spring Boot, React, and Next.js, and I&apos;m always eager to learn more.
              </p>

              <p>
                When I&apos;m not immersed in work, I&apos;m exploring new ideas and 
                staying curious. Life&apos;s about balance, and I love embracing 
                every part of it.
              </p>

              <p className="font-medium text-white">
                I believe in waking up each day eager to make a difference!
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-6 pt-4">
              <a 
                href="https://www.linkedin.com/in/waruna-udara/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/WarunaUdara" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              {/* <a 
                href="https://www.instagram.com/w.u.d.s/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a> */}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative lg:order-last order-first">
            <div className="relative w-full max-w-md mx-auto lg:max-w-full">
              {/* Purple Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-7)] to-[var(--color-8)] rounded-3xl transform rotate-3"></div>
              
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden ">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;