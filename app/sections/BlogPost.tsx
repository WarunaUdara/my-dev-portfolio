"use client";

import React from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import { getBlogPostBySlug } from "@/lib/blogData";
import { IconArrowLeft, IconCalendar, IconClock, IconTag } from "@tabler/icons-react";

// Dynamic MDX Component Loader Map
import KyvernoPost from "@/content/blog/kyverno-tutorial-kubernetes-policy-engine.mdx";
import TurboshipPost from "@/content/blog/building-turboship-buildathon.mdx";
import React19Post from "@/content/blog/react-19-and-tanstack-router.mdx";

const MDX_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "kyverno-tutorial-kubernetes-policy-engine": KyvernoPost,
  "building-turboship-buildathon": TurboshipPost,
  "react-19-and-tanstack-router": React19Post,
};

// ADHD-Friendly & Reading Psychology Custom MDX Design System
const mdxCustomComponents = {
  h1: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-12 mb-6 pb-3 border-b border-neutral-800/80 leading-snug">
      {children}
    </h1>
  ),
  h2: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-tight mt-10 mb-4 pt-4 border-t border-neutral-800/50 flex items-center gap-2">
      {children}
    </h2>
  ),
  h3: ({ children }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-mono font-semibold text-sky-400 mt-8 mb-3 tracking-wide">
      {children}
    </h3>
  ),
  p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-neutral-300 font-sans text-base sm:text-[17px] leading-[1.85] tracking-wide mb-6 max-w-prose">
      {children}
    </p>
  ),
  ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-3 my-6 pl-4 border-l-2 border-emerald-500/40 list-none text-neutral-300 text-base">
      {children}
    </ul>
  ),
  ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-3 my-6 pl-4 border-l-2 border-sky-500/40 list-decimal text-neutral-300 text-base">
      {children}
    </ol>
  ),
  li: ({ children }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex items-start gap-2.5 leading-relaxed">
      <span className="text-emerald-400 font-bold mt-1">❯</span>
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="my-8 p-5 rounded-2xl bg-neutral-950 border border-neutral-800/90 text-neutral-200 font-serif italic text-lg leading-relaxed shadow-inner">
      {children}
    </blockquote>
  ),
  pre: ({ children }: React.HTMLAttributes<HTMLPreElement>) => (
    <div className="my-8 rounded-2xl bg-neutral-950 border border-neutral-800/90 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] tracking-wider uppercase text-neutral-400">Code Snippet</span>
      </div>
      <pre className="p-5 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto leading-relaxed no-visible-scrollbar">
        {children}
      </pre>
    </div>
  ),
  code: ({ children, className }: React.HTMLAttributes<HTMLElement>) => {
    if (className?.includes("language-")) {
      return <code>{children}</code>;
    }
    return (
      <code className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-emerald-400 font-mono text-xs font-semibold">
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-10 border-neutral-800/80" />,
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

      <div className="container mx-auto max-w-3xl relative z-10 space-y-10">
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
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight tracking-tight">
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

        {/* Rendered MDX Content with ADHD-Friendly Typography & Component System */}
        <div className="space-y-6 text-neutral-300 font-sans">
          <MDXContent components={mdxCustomComponents} />
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
