import { createFileRoute } from "@tanstack/react-router";
import About from "../sections/About";
import Education from "../sections/Education";
import Volunteering from "../sections/Volunteering";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import Scales from "@/components/ui/scales";
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
    <div className="min-h-screen bg-background text-foreground scroll-smooth overflow-x-hidden">
      <SEOHead
        title={PAGE_META.about.title}
        description={PAGE_META.about.description}
        keywords={PAGE_META.about.keywords}
        ogType="profile"
        canonicalUrl={`${SITE_URL}/about`}
        schemas={[PERSON_SCHEMA]}
      />

      {/* Main Content with 2-Sided Scales Ruler Strips (Stops cleanly before Footer) */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-10 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>
        <div className="absolute top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-10 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>

        <div className="pt-12 relative z-10">
          <About isAboutPage={true} />
          <Education />
          <Volunteering />
        </div>
      </div>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
