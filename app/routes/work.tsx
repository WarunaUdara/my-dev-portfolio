import { createFileRoute } from "@tanstack/react-router";
import Projects from "../sections/Projects";
import Hackathons from "../sections/Hackathons";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
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
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <div className="pt-12">
        <Projects />
        <Hackathons />
      </div>
      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
