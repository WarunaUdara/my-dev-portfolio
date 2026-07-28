"use client";
import Links from "../sections/Links";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText, IconPhoneCall } from '@tabler/icons-react';
import SEOHead from "@/components/ui/SEOHead";
import { PAGE_META, PERSON_SCHEMA, SITE_URL } from "@/lib/seo";

export default function LinksPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "Blog", url: "/blog", icon: IconArticle },
    { name: "More", url: "#more", icon: IconFileText },
    { name: "Book a Call", url: "/contact", icon: IconPhoneCall },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={PAGE_META.links.title}
        description={PAGE_META.links.description}
        keywords={PAGE_META.links.keywords}
        canonicalUrl={`${SITE_URL}/links`}
        schemas={[PERSON_SCHEMA]}
      />
      <NavBar items={navItems} />
      <div className="pt-20">
        <Links />
      </div>
      <Footer />
    </div>
  );
}
