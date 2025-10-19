"use client"
import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons"
import { BellIcon, Share2Icon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { BentoCard, BentoGrid } from "@/app/ui/BentoGrid"
import { Marquee } from "@/components/ui/marquee"

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
]

const features = [
  {
    Icon: FileTextIcon,
    name: "Save your files",
    description: "We automatically save your files as you type.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl opacity-20">🔔</div>
      </div>
    ),
  },
  {
    Icon: BellIcon,
    name: "Notifications",
    description: "Get notified when something happens.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-700 bg-gray-800/50 hover:bg-gray-800",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium text-white">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs text-gray-400">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    Icon: Share2Icon,
    name: "",
    description: "",
    href: "#",
    cta: "",
    className: "col-span-3 lg:col-span-2",
    background: (
      <div className="absolute inset-0 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <Image 
            src="/circles.svg" 
            alt="" 
            fill
            className="object-cover"
          />
        </div>

        {/* Heading at Top */}
        <div className="absolute top-6 left-6 right-6 z-20">
          <h3 className="text-2xl sm:text-3xl font-serif leading-tight">
            Passionate about <span className="italic bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">cutting-edge technologies</span>
          </h3>
        </div>
        
        {/* Animated Cards Container - Positioned Lower */}
        <div className="absolute inset-0 flex items-end justify-center pb-4 pt-24">
          {/* Card 1 - Bottom Left (Gradient Card) */}
          <div className="absolute bottom-12 left-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[-12deg] group-hover:translate-x-[-15px] group-hover:translate-y-[-8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 opacity-90"></div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-16 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-12 h-1.5 bg-white/40 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
          </div>

          {/* Card 2 - Center Bottom (Website Mockup) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-72 h-48 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:translate-y-[20px] group-hover:scale-105 z-10">
            {/* Browser Chrome */}
            <div className="absolute top-0 left-0 right-0 h-8 bg-gray-800 flex items-center px-3 gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 ml-2">
                <div className="w-32 h-4 bg-gray-700 rounded flex items-center px-2 transition-all duration-500 group-hover:w-40">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                </div>
              </div>
            </div>
            
            {/* Website Content */}
            <div className="absolute top-8 left-0 right-0 bottom-0 bg-gradient-to-br from-gray-900 to-gray-800 p-4 flex flex-col items-center justify-center">
              <div className="text-center space-y-2 mb-4">
                <h3 className="text-white text-sm font-semibold transition-all duration-500 group-hover:text-base">
                  Websites that stand out
                </h3>
                <p className="text-gray-400 text-xs transition-all duration-500 group-hover:text-sm">
                  and make a difference
                </p>
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Get started
                </button>
                <button className="px-4 py-1.5 bg-transparent border border-gray-600 hover:border-gray-500 text-white text-xs rounded-full font-medium transition-all duration-500 group-hover:px-5 group-hover:py-2">
                  Read More
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 - Bottom Right (Gradient Card) */}
          <div className="absolute bottom-12 right-8 w-32 h-44 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-[12deg] group-hover:translate-x-[15px] group-hover:translate-y-[8px] group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-purple-300 opacity-90"></div>
            <div className="absolute inset-0 p-4 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-14 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-10 h-1.5 bg-white/40 rounded-full"></div>
                <div className="w-16 h-1.5 bg-white/40 rounded-full"></div>
              </div>
              <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    Icon: CalendarIcon,
    name: "Calendar",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl opacity-20">📅</div>
      </div>
    ),
  },
]

export function BentoDemo() {
  return (
    <section className="relative bg-gradient-to-b from-transparent via-black/80 to-black text-white -mt-32 pt-40 px-4 sm:px-6 pb-20">
      
      <div className="container mx-auto max-w-6xl relative z-20">
        {/* Bento Grid */}
        <BentoGrid>
          {features.map((feature, idx) => (
            <BentoCard key={idx} {...feature} />
          ))}
        </BentoGrid>
      </div>
    </section>
  )
}