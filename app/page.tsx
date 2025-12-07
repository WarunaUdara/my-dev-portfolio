
"use client";
import About from "./sections/About";
import Hero from "./sections/Hero";
import TechStack from "./sections/TechStack";
import GitHubActivity from "./sections/GitHubActivity";
import RevealingQuote from "./sections/RevealingQuote";
import Footer from "./sections/Footer";
import Projects from "./sections/Projects";
import { NavBar } from "./ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react'
import Explore from "./sections/Explore";




export default function Home() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: IconHome  },
    { name: 'About', url: '#about', icon: IconUser },
    { name: 'Projects', url: '#projects', icon: IconBriefcase },
    { name: 'More', url: '#', icon: IconFileText }
  ]
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      
      

     
      <Hero />
      <About/>
      <RevealingQuote/>
      <Projects/>
      <TechStack/>
      <GitHubActivity/>
      <Explore/>
      <Footer/>
      
      <NavBar items={navItems} />

      
      
      
    </div>
  );
}