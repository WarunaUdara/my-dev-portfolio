
"use client";
import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import GitHubActivity from "./sections/GitHubActivity";
import RevealingQuote from "./sections/RevealingQuote";
import Footer from "./sections/Footer";
import BucketList from "./sections/BucketList";
// import Projects from "./sections/Projects";
import { NavBar } from "./ui/TubelightNavbar";
import { House, User, Briefcase, FileText } from 'lucide-react'
import Links from "./sections/Links";



export default function Home() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: House  },
    { name: 'About', url: '#about', icon: User },
    { name: 'Projects', url: '/under-construction', icon: Briefcase },
    { name: 'More', url: '/under-construction', icon: FileText }
  ]
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      
      

     
      <Hero />
      <About/>
      <RevealingQuote/>
      {/* <Projects/> */}
      {/* <TechStack/> */}
      {/* <GitHubActivity/> */}
      {/* <BucketList/> */}
      <Footer/>
      {/* <Links/> */}
            <NavBar items={navItems} />

      
      
      
    </div>
  );
}