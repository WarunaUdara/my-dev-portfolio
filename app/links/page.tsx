"use client";
import Links from "../sections/Links";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react';

export default function LinksPage() {
  const navItems = [
    { name: 'Home', url: '/', icon: IconHome },
    { name: 'About', url: '/#about', icon: IconUser },
    { name: 'Projects', url: '/#projects', icon: IconBriefcase },
    { name: 'More', url: '#', icon: IconFileText }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar items={navItems} />
      <div className="pt-20">
        <Links />
      </div>
      <Footer />
    </div>
  );
}
