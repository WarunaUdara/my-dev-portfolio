import Image from "next/image";
import Aurora from "../ui/Aurora";
import FloatingSparkles from "../ui/FloatingSparkles";
import { BentoDemo } from "./BentoDemo";

export default function Hero() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
          {/* Aurora Background Animation */}
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#47007a", "#000000", "#9810fa"]}
              blend={0.6}
              amplitude={1.0}
              speed={0.5}
            />
          </div>

          <div className="container mx-auto max-w-6xl w-full z-20 px-4 sm:px-6 relative">
            {/* Hero Content */}
            <div className="flex flex-col items-center justify-center text-center space-y-6 sm:space-y-8">
              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl font-serif leading-tight">
                <span className="block">Transforming ideas into</span>
                <span className="block xl:text-8xl italic font-serif">seamless solutions</span>
              </h1>

              {/* Subheading with Silver Gradient */}
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-xl">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                    Hello, I&apos;m Waruna Udara
                  </span>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 overflow-hidden flex-shrink-0">
                    {/* Add your profile image here */}
                    <Image
                      src="/waruna-udara.jpg"
                      alt="Waruna Udara"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <span className="bg-gradient-to-b from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
                  a Full Stack Developer
                </span>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6 sm:mt-8 w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  Let&apos;s Connect
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>

                <button className="w-full sm:w-auto px-4 py-3 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-2 text-sm sm:text-base">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="truncate">warunaudarasam2003@gmail.com</span>
                </button>
              </div>
            </div>
          </div>

          {/* Purple Glow Effect on Eclipse */}
          <div className="absolute bottom-0 sm:-bottom-48 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[200px] sm:h-[300px] pointer-events-none z-5">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-600/40 via-purple-500/20 to-transparent blur-3xl"></div>
          </div>

          {/* Eclipse Background - Full Width */}
          <div className="absolute bottom-0  sm:-bottom-40 left-0 right-0 w-screen pointer-events-none z-10">
            <Image
              src="/eclipse.png"
              alt=""
              width={1920}
              height={400}
              className="w-full h-auto object-cover"
              priority
              unoptimized
            />
          </div>

          {/* Floating Sparkles Effect */}
          <FloatingSparkles />
          
        </section>
        <BentoDemo/>
      </main>
      
    </div>
  );
}