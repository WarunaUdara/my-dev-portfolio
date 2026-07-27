"use client";
import BucketList from "../sections/BucketList";
import Footer from "../sections/Footer";
import { NavBar } from "../ui/TubelightNavbar";
import { IconHome, IconUser, IconBriefcase, IconFileText } from '@tabler/icons-react';
import SEOHead from "@/components/ui/SEOHead";
import { PAGE_META, PERSON_SCHEMA, SITE_URL } from "@/lib/seo";

export default function BucketListPage() {
  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "More", url: "#more", icon: IconFileText },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={PAGE_META.bucketList.title}
        description={PAGE_META.bucketList.description}
        keywords={PAGE_META.bucketList.keywords}
        canonicalUrl={`${SITE_URL}/bucket-list`}
        schemas={[PERSON_SCHEMA]}
      />
      <NavBar items={navItems} />
      <div className="pt-20">
        <BucketList />
      </div>
      <Footer />
    </div>
  );
}
