import { createFileRoute } from "@tanstack/react-router";
import Projects from "../sections/Projects";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { ParticleScroll } from "@/components/canvasui/ParticleScroll";
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
    <ParticleScroll point={0.68} band={420} density={2} className="min-h-screen bg-black text-white">
      <div className="pt-12">
        <Projects />
      </div>
      <Footer />
      <NavBar items={navItems} />
    </ParticleScroll>
  );
}
