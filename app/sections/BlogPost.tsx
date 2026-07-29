"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import { getBlogPostBySlug } from "@/lib/blogData";
import { IconArrowLeft, IconCalendar, IconClock, IconTag, IconList } from "@tabler/icons-react";

import CodeBlock from "@/components/ui/CodeBlock";
import { LineSidebar } from "@/components/ReactBits/LineSidebar";

// Dynamic MDX Component Loader Map
import HttpQueryPost from "@/content/blog/http-query-method-rfc-10008.mdx";
import KyvernoPost from "@/content/blog/kyverno-tutorial-kubernetes-policy-engine.mdx";
import TurboshipPost from "@/content/blog/building-turboship-buildathon.mdx";
import React19Post from "@/content/blog/react-19-and-tanstack-router.mdx";

const MDX_COMPONENTS: Record<string, React.ComponentType<any>> = {
  "http-query-method-rfc-10008": HttpQueryPost,
  "kyverno-tutorial-kubernetes-policy-engine": KyvernoPost,
  "building-turboship-buildathon": TurboshipPost,
  "react-19-and-tanstack-router": React19Post,
};

// Medium-Style Standardized MDX Typography & Components
const mdxCustomComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight mt-12 mb-6 pb-3 border-b border-neutral-800/80 leading-snug scroll-mt-28">
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 {...props} className="text-xl sm:text-2xl font-serif font-semibold text-white tracking-tight mt-12 mb-4 pt-6 border-t border-neutral-800/60 flex items-center gap-2 scroll-mt-28">
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className="text-lg font-mono font-semibold text-sky-400 mt-8 mb-3 tracking-wide scroll-mt-28">
      {children}
    </h3>
  ),
  p: ({ children }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-neutral-200 font-sans text-base sm:text-[18px] leading-[1.85] tracking-normal mb-6 max-w-prose">
      {children}
    </p>
  ),
  ul: ({ children }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="space-y-3 my-6 pl-5 border-l-2 border-emerald-500/50 list-none text-neutral-200 text-base sm:text-[17px]">
      {children}
    </ul>
  ),
  ol: ({ children }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="space-y-3 my-6 pl-5 border-l-2 border-sky-500/50 list-decimal text-neutral-200 text-base sm:text-[17px]">
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
    <blockquote className="my-8 p-6 rounded-2xl bg-neutral-950/90 border-l-4 border-sky-400 text-neutral-200 font-serif italic text-lg leading-relaxed shadow-lg">
      {children}
    </blockquote>
  ),
  pre: (props: any) => {
    const childrenArray = React.Children.toArray(props.children);
    const codeChild = childrenArray[0] as React.ReactElement<any>;

    if (codeChild && codeChild.props) {
      const rawCode = typeof codeChild.props.children === "string"
        ? codeChild.props.children
        : Array.isArray(codeChild.props.children)
          ? codeChild.props.children.join("")
          : String(codeChild.props.children || "");

      const langClassName = codeChild.props.className || "";
      return <CodeBlock code={rawCode} language={langClassName} />;
    }

    return <CodeBlock code={String(props.children || "")} />;
  },
  code: ({ children, className }: React.HTMLAttributes<HTMLElement>) => {
    if (className?.includes("language-")) {
      return <code className={className}>{children}</code>;
    }
    return (
      <code className="px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-sky-300 font-mono text-xs font-semibold">
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-10 border-neutral-800/80" />,
};

// Format heading text into clean TOC label preserving technical terms
function formatShortTopic(fullText: string): string {
  const clean = fullText.replace(/^#+\s*/, "").trim();
  const words = clean.split(/\s+/);
  if (words.length <= 6) return clean;
  return words.slice(0, 6).join(" ");
}

export const BlogPost = ({ slug }: { slug: string }) => {
  const meta = getBlogPostBySlug(slug);
  const MDXContent = MDX_COMPONENTS[slug];

  const articleContentRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [activeHeadingIndex, setActiveHeadingIndex] = useState<number>(0);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  // Extract article section headings & observe active topic & article bounds
  useEffect(() => {
    if (!articleContentRef.current) return;
    const elements = Array.from(
      articleContentRef.current.querySelectorAll("h1, h2, h3")
    ) as HTMLElement[];

    const itemsList: { id: string; text: string }[] = [];

    elements.forEach((el, index) => {
      const id = el.id || `section-topic-${index}`;
      el.id = id;
      const fullText = el.textContent || `Section ${index + 1}`;
      const shortText = formatShortTopic(fullText);
      itemsList.push({ id, text: shortText });
    });

    setHeadings(itemsList);

    if (elements.length === 0) return;

    // Window scroll listener: Synchronizes active TOC topic and hides sidebar when outside article bounds
    const handleScroll = () => {
      if (!articleContentRef.current) return;

      const articleRect = articleContentRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Show sidebar while reading article body (hides when scrolling down to CTA / Footer)
      const inArticleBody = articleRect.top < viewportHeight * 0.6 && articleRect.bottom > 200;
      setShowSidebar(inArticleBody);

      if (!inArticleBody) return;

      // Find active topic heading closest to upper focus area (offset = 35% of viewport height)
      const focusThreshold = Math.min(360, viewportHeight * 0.4);
      let currentActiveIndex = 0;

      for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top <= focusThreshold) {
          currentActiveIndex = i;
        } else {
          break;
        }
      }

      setActiveHeadingIndex(currentActiveIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [slug]);

  const handleSidebarItemClick = (index: number) => {
    const targetId = headings[index]?.id;
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        const topOffset = el.getBoundingClientRect().top + window.scrollY - 110;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  };

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
    <article className="relative min-h-screen bg-transparent text-white py-24 px-4 sm:px-6 md:px-12 scroll-mt-20">
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Floating Right Sticky LineSidebar TOC — visible only while reading article body */}
      {headings.length > 0 && showSidebar && (
        <aside className="hidden xl:block fixed top-28 right-4 lg:right-8 z-40 w-[310px] pointer-events-auto">
          {/* Card with reserved space for marker lines */}
          <div className="rounded-2xl bg-neutral-950/95 border border-neutral-800/90 backdrop-blur-xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-neutral-800/70 bg-neutral-900/40">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 font-semibold flex items-center gap-2">
                <IconList className="w-3.5 h-3.5 text-sky-400" />
                <span>TOPICS</span>
              </span>
              <span className="text-[10px] font-mono text-neutral-500">
                {activeHeadingIndex + 1}/{headings.length}
              </span>
            </div>

            {/* Scroll container — owns overflow. pl-14 gives room for left marker lines. */}
            <div
              className="overflow-y-auto overflow-x-visible max-h-[60vh] pl-14 pr-4 py-1"
              style={{ scrollbarWidth: 'none' }}
            >
              <LineSidebar
                items={headings.map((h) => h.text)}
                activeItemIndex={activeHeadingIndex}
                onItemClick={(idx) => handleSidebarItemClick(idx)}
                accentColor="#38bdf8"
                textColor="#737373"
                markerColor="#404040"
                showIndex={false}
                showMarker={true}
                proximityRadius={70}
                maxShift={12}
                markerLength={36}
                markerGap={0}
                tickScale={0.5}
                scaleTick={true}
                itemGap={12}
                fontSize={0.82}
                smoothing={80}
              />
            </div>
          </div>
        </aside>
      )}

      {/* Main Reading Column */}
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

        {/* Rendered MDX Content */}
        <div ref={articleContentRef} className="space-y-6 text-neutral-300 font-sans">
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
