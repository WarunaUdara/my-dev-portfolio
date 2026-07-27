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
    <div className="relative min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      {/* Dynamic ScrollFrost Background */}
      <ScrollFrost className="fixed inset-0 pointer-events-none z-0" />

      {/* Blueprint Scales Overlay (Same as Uses page) */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <Scales />
      </div>

      <div className="relative z-10 pt-16 sm:pt-20 px-4 sm:px-6 md:px-12 container mx-auto max-w-7xl space-y-24 sm:space-y-32 pb-24">
        <WorkProjects />
        <Hackathons />
      </div>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
