"use client";
import BucketList from "../sections/BucketList";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { House, User, Briefcase, FileText } from 'lucide-react';

export default function BucketListPage() {
  const navItems = [
    { name: 'Home', url: '/', icon: House },
    { name: 'About', url: '/#about', icon: User },
    { name: 'Projects', url: '/#projects', icon: Briefcase },
    { name: 'More', url: '#', icon: FileText }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar items={navItems} />
      <div className="pt-20">
        <BucketList />
      </div>
      <Footer />
    </div>
  );
}
