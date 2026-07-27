import { createFileRoute } from '@tanstack/react-router';
import Hero from '../sections/Hero';
import About from '../sections/About';
import RevealingQuote from '../sections/RevealingQuote';
import Projects from '../sections/Projects';
import TechStack from '../sections/TechStack';
import GitHubActivity from '../sections/GitHubActivity';
import Explore from '../sections/Explore';
import Footer from '../sections/Footer';
import CardNav from '@/components/ReactBits/CardNav';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <CardNav />
      <Hero />
      <About />
      <RevealingQuote />
      <Projects />
      <TechStack />
      <GitHubActivity />
      <Explore />
      <Footer />
    </div>
  );
}
