import { createFileRoute } from '@tanstack/react-router';
import About from '../sections/About';
import Volunteering from '../sections/Volunteering';
import Footer from '../sections/Footer';
import CardNav from '@/components/ReactBits/CardNav';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <CardNav />
      <div className="pt-12">
        <About />
        <Volunteering />
      </div>
      <Footer />
    </div>
  );
}
