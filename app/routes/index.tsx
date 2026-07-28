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
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText, IconPhoneCall } from '@tabler/icons-react';
import SEOHead from '@/components/ui/SEOHead';
import { PAGE_META, PERSON_SCHEMA, WEBSITE_SCHEMA, PROFILE_PAGE_SCHEMA, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const navItems = [
    { name: 'Home', url: '#hero', icon: IconHome },
    { name: 'About', url: '/about', icon: IconUser },
    { name: 'Work', url: '/work', icon: IconBriefcase },
    { name: 'Blog', url: '/blog', icon: IconArticle },
    { name: 'More', url: '#more', icon: IconFileText },
    { name: 'Book a Call', url: '/contact', icon: IconPhoneCall },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <SEOHead
        title={PAGE_META.home.title}
        description={PAGE_META.home.description}
        keywords={PAGE_META.home.keywords}
        ogType="profile"
        canonicalUrl={SITE_URL}
        schemas={[PERSON_SCHEMA, WEBSITE_SCHEMA, PROFILE_PAGE_SCHEMA]}
      />
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
