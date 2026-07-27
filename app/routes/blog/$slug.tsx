import { createFileRoute } from "@tanstack/react-router";
import BlogPost from "../../sections/BlogPost";
import Footer from "../../sections/Footer";
import { NavBar } from "../../ui/TubelightNavbar";
import ScrollFrost from "@/components/canvasui/ScrollFrost";
import Scales from "@/components/ui/scales";
import { IconHome, IconUser, IconBriefcase, IconArticle, IconFileText } from "@tabler/icons-react";
import SEOHead from "@/components/ui/SEOHead";
import { getBlogPostSchema, PERSON_SCHEMA, BLOG_SCHEMA, SITE_URL } from "@/lib/seo";
import { getBlogPostBySlug } from "@/lib/blogData";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPostRoutePage,
});

function BlogPostRoutePage() {
  const { slug } = Route.useParams();
  const post = getBlogPostBySlug(slug);

  const navItems = [
    { name: "Home", url: "/", icon: IconHome },
    { name: "About", url: "/about", icon: IconUser },
    { name: "Work", url: "/work", icon: IconBriefcase },
    { name: "Blog", url: "/blog", icon: IconArticle },
    { name: "More", url: "#more", icon: IconFileText },
  ];

  // Dynamic SEO data from blog post metadata
  const postSchema = post ? getBlogPostSchema(post) : null;
  const canonicalUrl = `${SITE_URL}/blog/${slug}`;
  const ogImage = post?.coverImage
    ? `${SITE_URL}${post.coverImage}`
    : `${SITE_URL}/og-new.webp`;

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Dynamic per-post SEO Head with BlogPosting JSON-LD */}
      {post && (
        <SEOHead
          title={`${post.title} — Waruna Udara`}
          description={post.description}
          keywords={post.tags}
          ogType="article"
          ogImage={ogImage}
          canonicalUrl={canonicalUrl}
          article={{
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: new Date(post.date).toISOString(),
            tags: post.tags,
            author: post.author,
          }}
          schemas={[postSchema!, BLOG_SCHEMA, PERSON_SCHEMA]}
        />
      )}

      {/* 2-Sided Scales Ruler Strips (Matching Uses & Work Page Layout) */}
      <div className="fixed top-0 bottom-0 left-3 sm:left-6 md:left-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>
      <div className="fixed top-0 bottom-0 right-3 sm:right-6 md:right-10 w-6 sm:w-8 z-20 border-x border-neutral-800/80 pointer-events-none hidden sm:block">
        <Scales orientation="diagonal" size={8} className="w-full opacity-60" />
      </div>

      {/* Dynamic ScrollFrost Background */}
      <ScrollFrost height="h-[600px]" />

      <div className="relative z-10 pt-12">
        <BlogPost slug={slug} />
      </div>

      <Footer />
      <NavBar items={navItems} />
    </div>
  );
}
