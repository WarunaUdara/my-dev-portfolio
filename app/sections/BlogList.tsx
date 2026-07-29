"use client";

import React, { useState } from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import AuroraText from "@/components/ui/aurora-text";
import { BLOG_POSTS, BlogPostMeta } from "@/lib/blogData";
import { IconSearch, IconCalendar, IconClock, IconArrowUpRight, IconTag } from "@tabler/icons-react";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const searchPlaceholders = [
  "Search articles by title, tech stack, or topic...",
  "Search Kubernetes & Kyverno policy engines...",
  "Search HTTP QUERY method (RFC 10008)...",
  "Search React 19 & TanStack Router...",
  "Search Turboship Buildathon project...",
];

export const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Extract all unique tags
  const allTags = Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags)));

  // Filter posts based on search & selected tag
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <section id="blog" className="relative min-h-screen bg-transparent text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      {/* Background Architectural Blueprint Line */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-neutral-400 uppercase">
            WRITINGS &amp; THOUGHTS
          </p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif leading-tight">
            Developer <AuroraText className="italic font-serif">Articles</AuroraText>
          </h1>
          <p className="text-neutral-400 font-sans text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Explorations into agentic AI workflows, full-stack microservices, cloud infrastructure, and modern frontend architecture.
          </p>
        </div>

        {/* Search & Tag Filter Bar */}
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Animated PlaceholdersAndVanishInput Search Input (Matching Guestbook Component) */}
          <div className="w-full">
            <PlaceholdersAndVanishInput
              placeholders={searchPlaceholders}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSubmit={(e) => e.preventDefault()}
            />
          </div>

          {/* Tag Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${
                selectedTag === null
                  ? "bg-white text-black font-semibold shadow-md"
                  : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
              }`}
            >
              All Topics
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5 ${
                  selectedTag === tag
                    ? "bg-white text-black font-semibold shadow-md"
                    : "bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white"
                }`}
              >
                <IconTag className="w-3 h-3" />
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative rounded-3xl bg-neutral-950/80 border border-neutral-800/90 hover:border-neutral-600 p-6 sm:p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-6 cursor-pointer"
            >
              <div className="space-y-4">
                {/* Cover Image Container */}
                {post.coverImage && (
                  <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-lg">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                {/* Category & Meta */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 border-b border-dashed border-neutral-800 pb-3">
                  <span className="px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 tracking-wider font-semibold uppercase">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <IconCalendar className="w-3.5 h-3.5 text-neutral-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <IconClock className="w-3.5 h-3.5 text-neutral-400" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide group-hover:text-sky-300 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mt-2.5 font-sans">
                    {post.description}
                  </p>
                </div>
              </div>

              {/* Tags & Read Arrow Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed border-neutral-800/80">
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 bg-neutral-900 border border-neutral-800 rounded-md text-[10px] font-mono text-neutral-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="w-8 h-8 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:rotate-45 transition-all duration-300 flex-shrink-0">
                  <IconArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-neutral-500 font-mono text-sm">
            No articles found matching &quot;{searchQuery}&quot;. Try clearing your filters!
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;
