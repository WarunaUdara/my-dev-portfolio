import { createFileRoute } from "@tanstack/react-router";
import About from "../sections/About";
import Education from "../sections/Education";
import Volunteering from "../sections/Volunteering";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconFileText } from "@tabler/icons-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "More", url: "#more", icon: IconFileText },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <div className="pt-12">
        <About isAboutPage={true} />
        <Education />
        <Volunteering />
      </div>
      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
