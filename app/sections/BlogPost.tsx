"use client";

import React from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import { getBlogPostBySlug } from "@/lib/blogData";
import { IconArrowLeft, IconCalendar, IconClock, IconUser, IconTag } from "@tabler/icons-react";

// Dynamic MDX Component Loader Map
import TurboshipPost from "@/content/blog/building-turboship-buildathon.mdx";
import React19Post from "@/content/blog/react-19-and-tanstack-router.mdx";

const MDX_COMPONENTS: Record<string, React.ComponentType> = {
  "building-turboship-buildathon": TurboshipPost,
  "react-19-and-tanstack-router": React19Post,
};

export const BlogPost = ({ slug }: { slug: string }) => {
  const meta = getBlogPostBySlug(slug);
  const MDXContent = MDX_COMPONENTS[slug];

  if (!meta || !MDXContent) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-3xl font-serif font-bold text-neutral-300">Article Not Found</h1>
        <p className="text-neutral-500 font-mono text-xs mt-2">The requested article &quot;{slug}&quot; does not exist.</p>
        <Link href="/blog" className="mt-6 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-xs font-mono text-white hover:border-neutral-600">
          ← Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <article className="relative min-h-screen bg-black text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20 overflow-hidden">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto max-w-4xl relative z-10 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white px-3.5 py-1.5 rounded-full bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all shadow-md"
          >
            <IconArrowLeft className="w-4 h-4" />
            Back to Articles
          </Link>
        </div>

        {/* Post Header */}
        <div className="space-y-6 border-b border-neutral-800 pb-10">
          {/* Category Tag */}
          <span className="px-3.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono font-semibold text-neutral-300 tracking-wider uppercase">
            {meta.category}
          </span>

          {/* Post Title */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
            {meta.title}
          </h1>

          {/* Description */}
          <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed">
            {meta.description}
          </p>

          {/* Author & Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-xs font-mono text-neutral-400 border-t border-dashed border-neutral-800/80">
            <div className="flex items-center gap-2 text-neutral-200">
              <div className="w-7 h-7 rounded-full bg-neutral-800 overflow-hidden relative">
                <Image src="/WarunaUdaraSampath.jpg" alt={meta.author} fill className="object-cover" />
              </div>
              <span className="font-semibold">{meta.author}</span>
            </div>

            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <IconCalendar className="w-4 h-4 text-neutral-400" />
                {meta.date}
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock className="w-4 h-4 text-neutral-400" />
                {meta.readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {meta.coverImage && (
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl">
            <Image src={meta.coverImage} alt={meta.title} fill className="object-cover object-top" priority />
          </div>
        )}

        {/* Rendered MDX Content */}
        <div className="prose prose-invert max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-neutral-300 prose-p:leading-relaxed prose-code:text-emerald-400 prose-code:font-mono prose-code:bg-neutral-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-neutral-950 prose-pre:border prose-pre:border-neutral-800 prose-a:text-sky-300">
          <MDXContent />
        </div>

        {/* Footer Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-8 border-t border-neutral-800">
          <span className="text-xs font-mono text-neutral-500 uppercase mr-2">Article Tags:</span>
          {meta.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-neutral-950 border border-neutral-800 rounded-lg text-xs font-mono text-neutral-300 flex items-center gap-1">
              <IconTag className="w-3 h-3 text-neutral-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogPost;
