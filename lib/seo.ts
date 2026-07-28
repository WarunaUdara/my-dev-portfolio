/**
 * SEO Configuration & Site Metadata
 * Centralised source of truth for all SEO/AEO data
 */

export const SITE_URL = "https://warunadev.vercel.app";
export const SITE_NAME = "Waruna Udara Sampath";
export const SITE_HANDLE = "@WarunaUdara";

export const SITE_META = {
  name: SITE_NAME,
  alternateName: ["Waruna Udara", "Waruna Sampath", "WarunaUdara"],
  url: SITE_URL,
  title: "Waruna Udara Sampath — Full-Stack & Cloud Engineer",
  shortTitle: "Waruna Udara",
  description:
    "Full-Stack Developer & Aspiring Cloud/DevOps Engineer from Sri Lanka. Building web platforms & platform engineering solutions with modern technologies.",
  ogDescription:
    "Full-Stack Developer & Aspiring Cloud/DevOps Engineer from Sri Lanka. Building web platforms & platform engineering solutions with modern technologies.",
  keywords: [
    "Waruna Udara",
    "Waruna Udara Sampath",
    "Waruna Sampath",
    "WarunaUdara",
    "Full Stack Developer Sri Lanka",
    "Java Spring Boot Developer",
    "React Developer Sri Lanka",
    "Cloud Engineer",
    "DevOps Engineer",
    "Platform Engineer",
    "Kubernetes",
    "AWS",
    "TypeScript Developer",
    "Next.js Developer",
    "BICT University Sri Jayewardenepura",
    "Software Engineer Colombo",
  ],
  author: SITE_NAME,
  locale: "en_US",
  twitterHandle: SITE_HANDLE,
  ogImage: `${SITE_URL}/og-new.webp`,
};

export const PAGE_META: Record<string, { title: string; description: string; ogDescription?: string; keywords?: string[] }> = {
  home: {
    title: "Waruna Udara Sampath — Full-Stack & Cloud Engineer",
    description:
      "Full-Stack Developer & Aspiring Cloud/DevOps Engineer from Sri Lanka. Building web platforms & platform engineering solutions with modern technologies.",
    ogDescription:
      "Full-Stack Developer & Aspiring Cloud/DevOps Engineer from Sri Lanka. Building web platforms & platform engineering solutions with modern technologies.",
    keywords: [
      "Waruna Udara",
      "Waruna Udara Sampath",
      "Waruna Sampath",
      "Full Stack Developer",
      "Cloud Engineer",
      "Platform Engineer",
      "Sri Lanka developer",
    ],
  },
  about: {
    title: "About — Waruna Udara Sampath",
    description:
      "Learn about Waruna Udara Sampath (Waruna Udara) — Full-Stack Developer & Aspiring Cloud/DevOps Engineer focused on Platform Engineering.",
    ogDescription:
      "Background & expertise of Waruna Udara Sampath — Full-Stack & Cloud/DevOps Engineer from Sri Lanka.",
    keywords: ["Waruna Udara", "Waruna Udara Sampath", "about Waruna Udara", "software engineer background", "cloud developer Sri Lanka"],
  },
  work: {
    title: "Work & Projects — Waruna Udara Sampath",
    description:
      "Explore projects by Waruna Udara Sampath including Turboship (AI Agent Platform), AlgoArena, and cloud-native software engineering builds.",
    ogDescription:
      "Explore cloud-native & web software projects by Waruna Udara Sampath including Turboship & AlgoArena.",
    keywords: [
      "Waruna Udara",
      "Waruna Udara Sampath",
      "software engineering projects",
      "Turboship AI",
      "AlgoArena coding",
      "cloud native projects",
    ],
  },
  blog: {
    title: "Blog — Waruna Udara Sampath",
    description:
      "Technical articles on full-stack engineering, cloud architecture, DevOps, Platform Engineering, AI, and modern web development.",
    ogDescription:
      "Technical articles on full-stack engineering, cloud architecture, DevOps, and Platform Engineering.",
    keywords: [
      "Waruna Udara",
      "Waruna Udara Sampath",
      "developer blog",
      "tech articles Sri Lanka",
      "React blog",
      "cloud engineering articles",
    ],
  },
  guestbook: {
    title: "Guestbook — Waruna Udara Sampath",
    description:
      "Sign the guestbook and leave your mark! Say hello to Waruna Udara Sampath (Waruna Udara).",
    ogDescription:
      "Sign the guestbook and say hello to Waruna Udara Sampath!",
    keywords: ["guestbook", "Waruna Udara guestbook", "Waruna Udara", "Waruna Udara Sampath"],
  },
  uses: {
    title: "Uses — Waruna Udara Sampath",
    description:
      "A peek into the tools, gear, and software that powers Waruna Udara Sampath's development and platform engineering workflow.",
    ogDescription:
      "Tools, gear & software powering Waruna Udara Sampath's development workflow.",
    keywords: ["developer setup", "uses page", "dev tools", "Waruna Udara", "Waruna Udara Sampath"],
  },
  links: {
    title: "Links — Waruna Udara Sampath",
    description:
      "All official social, project, and contact links for Waruna Udara Sampath (Waruna Udara) — GitHub, LinkedIn, and more.",
    ogDescription:
      "All social, project & contact links for Waruna Udara Sampath.",
    keywords: ["Waruna Udara links", "contact", "GitHub", "LinkedIn", "Waruna Udara", "Waruna Udara Sampath"],
  },
  bucketList: {
    title: "Bucket List — Waruna Udara Sampath",
    description:
      "Personal goals, travel dreams, and tech milestones Waruna Udara Sampath wants to achieve.",
    ogDescription:
      "Personal goals & life milestones of Waruna Udara Sampath.",
    keywords: ["bucket list", "life goals", "Waruna Udara personal", "Waruna Udara", "Waruna Udara Sampath"],
  },
};

/** JSON-LD Person schema for Answer Engine Optimization (AEO) */
export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Waruna Udara Sampath",
  alternateName: ["Waruna Udara", "Waruna Sampath", "WarunaUdara"],
  givenName: "Waruna Udara",
  familyName: "Sampath",
  url: SITE_URL,
  image: `${SITE_URL}/warunaudara.webp`,
  jobTitle: "Full-Stack Developer & Aspiring Cloud/DevOps Engineer (Platform Engineering)",
  description:
    "Full-Stack Developer and Aspiring Cloud/DevOps Engineer from Sri Lanka focused on Platform Engineering, Kubernetes, cloud infrastructure, and modern web platforms.",
  nationality: {
    "@type": "Country",
    name: "Sri Lanka",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "University of Sri Jayewardenepura",
    url: "https://www.sjp.ac.lk",
  },
  knowsAbout: [
    "Full-Stack Development",
    "Platform Engineering",
    "DevOps",
    "Cloud Native Infrastructure",
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Next.js",
    "Microservices",
    "Agentic AI",
  ],
  sameAs: [
    "https://github.com/WarunaUdara",
    "https://linkedin.com/in/waruna-udara",
  ],
};

/** JSON-LD WebSite schema for sitelinks search & AEO */
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Waruna Udara Sampath — Portfolio",
  description:
    "Personal portfolio and blog of Waruna Udara Sampath, Full-Stack Developer & Aspiring Cloud/DevOps Engineer focused on Platform Engineering.",
  publisher: { "@id": `${SITE_URL}/#person` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/** JSON-LD ProfilePage schema for about/home AEO */
export const PROFILE_PAGE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Waruna Udara Sampath — Portfolio",
  dateCreated: "2024-01-01T00:00:00Z",
  dateModified: new Date().toISOString(),
  mainEntity: { "@id": `${SITE_URL}/#person` },
};

/** Generate JSON-LD BlogPosting schema for a specific article */
export function getBlogPostSchema(post: {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  coverImage?: string;
  author: string;
}) {
  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}/#article`,
    url: postUrl,
    headline: post.title,
    description: post.description,
    keywords: post.tags.join(", "),
    image: post.coverImage ? `${SITE_URL}${post.coverImage}` : SITE_META.ogImage,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    inLanguage: "en-US",
    isPartOf: { "@id": `${SITE_URL}/blog/#blog` },
  };
}

/** Generate JSON-LD BreadcrumbList schema for Medium-surpassing rich Google search snippets */
export function getBlogBreadcrumbSchema(post: { slug: string; title: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blog`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.title,
        "item": `${SITE_URL}/blog/${post.slug}`
      }
    ]
  };
}

/** Generate JSON-LD Blog schema for blog listing */
export const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog/#blog`,
  url: `${SITE_URL}/blog`,
  name: "Waruna Udara — Blog",
  description:
    "Technical articles on full-stack engineering, cloud architecture, DevOps, Platform Engineering, AI, and the React ecosystem.",
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
};
