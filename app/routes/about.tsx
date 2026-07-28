import { createFileRoute } from "@tanstack/react-router";
import About from "../sections/About";
import Education from "../sections/Education";
import Volunteering from "../sections/Volunteering";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText, IconPhoneCall } from "@tabler/icons-react";
import SEOHead from '@/components/ui/SEOHead';
import { PAGE_META, PERSON_SCHEMA, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "Blog", url: "/blog", icon: IconArticle },
    { name: "More", url: "#more", icon: IconFileText },
    { name: "Book a Call", url: "/contact", icon: IconPhoneCall },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground scroll-smooth">
      <SEOHead
        title={PAGE_META.about.title}
        description={PAGE_META.about.description}
        keywords={PAGE_META.about.keywords}
        ogType="profile"
        canonicalUrl={`${SITE_URL}/about`}
        schemas={[PERSON_SCHEMA]}
      />
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
