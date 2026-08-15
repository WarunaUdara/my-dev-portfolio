import React from "react";
import Link from "@/components/ui/Link";
import { Linkedin, Github, Instagram, ArrowUpRight } from "lucide-react";
import CTA from "./CTA";
import FigmaSplitLogo from "@/components/ui/FigmaSplitLogo";
import AdamFooterDither from "@/components/ui/AdamFooterDither";

const Footer = () => {
  return (
    <>
      <CTA />
      <AdamFooterDither>
        <footer className="bg-transparent text-white py-24 px-8 border-t border-neutral-900/80 relative z-30">
          <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between gap-16 mb-16">
            {/* Brand Section - Left Side */}
            <div className="max-w-sm space-y-4 bg-black/50 backdrop-blur-sm rounded-2xl p-6 -m-6 border border-white/5">
              <div className="flex items-center justify-start">
                <FigmaSplitLogo size={42} />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Thank you for visiting my portfolio. If you have any questions or would like to collaborate, feel free to reach out.
              </p>
            </div>

            {/* Links Container - Right Side (3 Columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 md:gap-16">
              {/* Column 1: Navigation */}
              <div>
                <h3 className="text-xs font-mono font-semibold mb-5 text-neutral-400 uppercase tracking-widest">
                  Navigation
                </h3>
                <ul className="space-y-2.5 text-sm font-sans">
                  <li>
                    <Link href="/" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Home</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>About</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/work" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Work &amp; Projects</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Developer Blog</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="group inline-flex items-center gap-1.5 text-white font-medium hover:text-sky-300 transition-colors">
                      <span>Book a Call</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-100 text-sky-400" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Column 2: Explore */}
              <div>
                <h3 className="text-xs font-mono font-semibold mb-5 text-neutral-400 uppercase tracking-widest">
                  Explore
                </h3>
                <ul className="space-y-2.5 text-sm font-sans">
                  <li>
                    <Link href="/uses" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Uses &amp; Setup</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/guestbook" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Guestbook</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/bucket-list" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Bucket List</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/links" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>All Links</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                      className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer text-left"
                    >
                      <span>Resume (Updating 2026 🚧)</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                  </li>
                </ul>
              </div>

              {/* Column 3: Connect */}
              <div className="col-span-2 sm:col-span-1">
                <h3 className="text-xs font-mono font-semibold mb-5 text-neutral-400 uppercase tracking-widest">
                  Connect
                </h3>
                <ul className="space-y-2.5 text-sm font-sans">
                  <li>
                    <a href="https://www.linkedin.com/in/waruna-udara/" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>LinkedIn</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/WarunaUdara" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                  <li>
                    <a href="https://medium.com/@warunaudarasampath" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Medium Blog</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                  <li>
                    <a href="mailto:warunaudarasampath@gmail.com" className="group inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors">
                      <span>Email Me</span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-900/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <p className="text-sm text-gray-400">© 2026 Waruna Udara</p>
              <span className="text-gray-700">•</span>
              <p className="text-sm text-gray-400">Built with Tanstack</p>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/waruna-udara/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-gray-400 hover:bg-neutral-800 hover:text-[var(--color-9)] transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/WarunaUdara"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-gray-400 hover:bg-neutral-800 hover:text-purple-400 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/waruna_udarax/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-900/80 border border-neutral-800 text-gray-400 hover:bg-neutral-800 hover:text-pink-400 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
        </footer>
      </AdamFooterDither>
    </>
  );
};

export default Footer;
