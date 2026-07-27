import { createFileRoute } from "@tanstack/react-router";
import BlogList from "../../sections/BlogList";
import Footer from "../../sections/Footer";
import { NavBar } from "../../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconFileText } from "@tabler/icons-react";

export const Route = createFileRoute("/blog/")({
  component: BlogListPage,
});

function BlogListPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "More", url: "#more", icon: IconFileText },
  ];

  return (
    <div className="min-h-screen bg-black text-white scroll-smooth">
      <div className="pt-12">
        <BlogList />
      </div>
      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
