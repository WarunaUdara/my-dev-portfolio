import React from "react";
import Link from "next/link";
import { Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-20 px-8 border-t border-[var(--color-2)]">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
          {/* Brand Section - Left Side */}
          <div className="max-w-sm">
            <div className="relative h-12 w-32 mb-4">
            <Image 
                src="/logo.svg" 
                alt="Logo" 
                fill
                className="object-contain object-left"
                priority
              />
              </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Thank you for visiting my portfolio. If you have any questions or would like to collaborate, feel free to reach out.
            </p>
          </div>

          {/* Links Container - Right Side */}
          <div className="flex gap-16 md:gap-24">
            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold mb-6 text-gray-400 uppercase tracking-wider">Navigation</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#hero"
                    className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      Home
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="group inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      About
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
                
                <li>
                  <Link
                    href="#projects"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      Projects
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect Section */}
            <div>
              <h3 className="text-sm font-semibold mb-6 text-gray-400 uppercase tracking-wider">Connect</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/waruna-udara/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      LinkedIn
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/WarunaUdara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      GitHub
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/waruna_udarax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      Instagram
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:warunaudara03@gmail.com"
                    className="group inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative">
                      Email
                      <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-gradient-to-r from-purple-400 to-pink-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <p className="text-sm text-gray-600">© 2025 Waruna Udara</p>
            <span className="text-gray-800">•</span>
            <p className="text-sm text-gray-600">Built with Next.js</p>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/waruna-udara/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-[var(--color-9)] transition-all duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://github.com/WarunaUdara"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-purple-400 transition-all duration-300 hover:scale-110"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/waruna_udarax/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-pink-400 transition-all duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
