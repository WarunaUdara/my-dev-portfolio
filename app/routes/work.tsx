import { createFileRoute } from "@tanstack/react-router";
import WorkProjects from "../sections/WorkProjects";
import Hackathons from "../sections/Hackathons";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import Scales from "@/components/ui/scales";
import { IconHome, IconUser, IconBriefcase, IconFileText } from "@tabler/icons-react";

export const Route = createFileRoute("/work")({
  component: WorkPage,
});

function WorkPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "More", url: "#more", icon: IconFileText },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* 2-Sided Scales Ruler Strips (Matching Uses Page Layout) */}
      <div className="fixed top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>
      <div className="fixed top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>

      {/* Dynamic ScrollFrost Background */}
      <ScrollFrost height="h-[600px]" />

      <div className="relative z-10 pt-28 sm:pt-36 pb-20 px-6 sm:px-16 md:px-24 max-w-7xl mx-auto space-y-24 sm:space-y-32">
        <WorkProjects />
        <Hackathons />
      </div>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
