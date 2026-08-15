import { createFileRoute } from "@tanstack/react-router";
import ContactSection from "../sections/ContactSection";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import Scales from "@/components/ui/scales";
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText, IconPhone } from "@tabler/icons-react";
import SEOHead from "@/components/ui/SEOHead";
import { PAGE_META, PERSON_SCHEMA, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "Blog", url: "/blog", icon: IconArticle },
    { name: "More", url: "#more", icon: IconFileText },
    { name: "Book a Call", url: "/contact", icon: IconPhone },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <SEOHead
        title={PAGE_META.contact.title}
        description={PAGE_META.contact.description}
        keywords={PAGE_META.contact.keywords}
        canonicalUrl={`${SITE_URL}/contact`}
        schemas={[PERSON_SCHEMA]}
      />

      {/* Main Content with 2-Sided Scales Ruler Strips (Stops cleanly before Footer) */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>
        <div className="absolute top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>

        <div className="relative z-10 pt-16">
          <ContactSection />
        </div>
      </div>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
