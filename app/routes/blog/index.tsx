import { createFileRoute } from "@tanstack/react-router";
import BlogList from "../../sections/BlogList";
import Footer from "../../sections/Footer";
import CTA from "../../sections/CTA";
import { NavBar } from "../../ui/TubelightNavbar";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import Scales from "@/components/ui/scales";
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText, IconPhoneCall } from "@tabler/icons-react";
import SEOHead from '@/components/ui/SEOHead';
import { PAGE_META, BLOG_SCHEMA, PERSON_SCHEMA, SITE_URL } from '@/lib/seo';

export const Route = createFileRoute("/blog/")({
  component: BlogListPage,
});

function BlogListPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "Blog", url: "/blog", icon: IconArticle },
    { name: "More", url: "#more", icon: IconFileText },
    { name: "Book a Call", url: "/contact", icon: IconPhoneCall },
  ];

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      <SEOHead
        title={PAGE_META.blog.title}
        description={PAGE_META.blog.description}
        keywords={PAGE_META.blog.keywords}
        canonicalUrl={`${SITE_URL}/blog`}
        schemas={[BLOG_SCHEMA, PERSON_SCHEMA]}
      />

      {/* Main Content with 2-Sided Scales Ruler Strips (Spreads through CTA to Adam Hands Footer) */}
      <div className="relative">
        <div className="absolute top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>
        <div className="absolute top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
          <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
        </div>

        {/* Dynamic ScrollFrost Background */}
        <ScrollFrost height="h-[600px]" />

        <div className="relative z-10 pt-12">
          <BlogList />
        </div>

        {/* CTA Section covered by Scales */}
        <div className="relative z-10 pt-16">
          <CTA />
        </div>
      </div>

      <Footer hideCTA />
      <NavBar items={navItems} />
    </div>
  );
}
