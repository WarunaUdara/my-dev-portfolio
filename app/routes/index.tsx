import { createFileRoute } from '@tanstack/react-router';
import Hero from '../sections/Hero';
import About from '../sections/About';
import RevealingQuote from '../sections/RevealingQuote';
import Projects from '../sections/Projects';
import TechStack from '../sections/TechStack';
import GitHubActivity from '../sections/GitHubActivity';
import Explore from '../sections/Explore';
import Footer from '../sections/Footer';
import { NavBar } from '../ui/TubelightNavbar';
import { IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: IconHome },
    { name: 'About', url: '#about', icon: IconUser },
    { name: 'Projects', url: '#projects', icon: IconBriefcase },
    { name: 'More', url: '/uses', icon: IconFileText },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <Hero />
      <About />
      <RevealingQuote />
      <Projects />
      <TechStack />
      <GitHubActivity />
      <Explore />
      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
