"use client";

import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_META, SITE_URL } from "@/lib/seo";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: "website" | "article" | "profile";
  canonicalUrl?: string;
  noIndex?: boolean;
  schemas?: Record<string, unknown>[];
  /** For articles */
  article?: {
    publishedTime: string;
    modifiedTime?: string;
    tags?: string[];
    author?: string;
  };
}

export default function SEOHead({
  title,
  description,
  keywords,
  ogImage,
  ogType = "website",
  canonicalUrl,
  noIndex = false,
  schemas = [],
  article,
}: SEOHeadProps) {
  const resolvedTitle = title ?? SITE_META.title;
  const resolvedDescription = description ?? SITE_META.description;
  const resolvedKeywords = keywords ?? SITE_META.keywords;
  const resolvedOgImage = ogImage ?? SITE_META.ogImage;
  const resolvedCanonical = canonicalUrl ?? (typeof window !== "undefined" ? window.location.href : SITE_URL);

  return (
    <Helmet>
      {/* ── Core Meta ── */}
      <title>{resolvedTitle}</title>
      <meta name="description" content={resolvedDescription} />
      <meta name="keywords" content={resolvedKeywords.join(", ")} />
      <meta name="author" content={SITE_META.author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"} />
      <link rel="canonical" href={resolvedCanonical} />

      {/* ── Open Graph ── */}
      <meta property="og:site_name" content={SITE_META.name} />
      <meta property="og:title" content={resolvedTitle} />
      <meta property="og:description" content={resolvedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={resolvedCanonical} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={resolvedTitle} />
      <meta property="og:locale" content={SITE_META.locale} />

      {/* ── Twitter / X Card ── */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_META.twitterHandle} />
      <meta name="twitter:creator" content={SITE_META.twitterHandle} />
      <meta name="twitter:title" content={resolvedTitle} />
      <meta name="twitter:description" content={resolvedDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />
      <meta name="twitter:image:alt" content={resolvedTitle} />

      {/* ── Article-specific OG ── */}
      {article && <meta property="article:published_time" content={article.publishedTime} />}
      {article?.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* ── Answer Engine Optimization: JSON-LD Structured Data ── */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}
