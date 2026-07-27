/**
 * SEO Configuration & Site Metadata
 * Centralised source of truth for all SEO/AEO data
 */

export const SITE_URL = "https://warunadev.vercel.app";
export const SITE_NAME = "Waruna Udara Sampath";
export const SITE_HANDLE = "@WarunaUdara";

export const SITE_META = {
  name: SITE_NAME,
  url: SITE_URL,
  title: "Waruna Udara Sampath — Full-Stack Developer & Cloud Engineer",
  shortTitle: "Waruna Udara",
  description:
    "Full-Stack Developer & Cloud/DevOps Specialist from Sri Lanka. I build robust web platforms with React, Java Spring Boot, Kubernetes, AWS, and modern AI integrations. BICT (Hons) undergraduate at University of Sri Jayewardenepura.",
  keywords: [
    "Waruna Udara Sampath",
    "Full Stack Developer Sri Lanka",
    "Java Spring Boot Developer",
    "React Developer Sri Lanka",
    "Cloud Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "AWS",
    "TypeScript Developer",
    "Next.js Developer",
    "Vite React Portfolio",
    "BICT University Sri Jayewardenepura",
    "Software Engineer Colombo",
  ],
  author: SITE_NAME,
  locale: "en_US",
  twitterHandle: SITE_HANDLE,
  ogImage: `${SITE_URL}/og-default.png`,
};

export const PAGE_META: Record<string, { title: string; description: string; keywords?: string[] }> = {
  home: {
    title: "Waruna Udara Sampath — Full-Stack Developer & Cloud Engineer",
    description:
      "Full-Stack Developer & Cloud/DevOps Specialist from Sri Lanka. I build robust web platforms with React, Java Spring Boot, Kubernetes, and AWS. Currently pursuing BICT (Hons) at University of Sri Jayewardenepura.",
    keywords: [
      "Waruna Udara Sampath",
      "Full Stack Developer",
      "Sri Lanka developer",
      "Java developer",
      "React developer",
    ],
  },
  about: {
    title: "About — Waruna Udara Sampath",
    description:
      "Learn about Waruna Udara Sampath — a Full-Stack & Cloud Engineer with 3+ years of experience in Java, React, Docker, Kubernetes, and AWS. Driven by curiosity, community, and craftsmanship.",
    keywords: ["about Waruna Udara", "software engineer background", "cloud developer Sri Lanka"],
  },
  work: {
    title: "Work & Projects — Waruna Udara Sampath",
    description:
      "Explore my portfolio of projects including Turboship (agentic AI deployment), AlgoArena (competitive programming engine), Beauty of Cloud, and more. Full-stack and cloud-native builds.",
    keywords: [
      "software engineering projects",
      "Turboship AI",
      "AlgoArena coding",
      "cloud native projects",
      "portfolio projects",
    ],
  },
  blog: {
    title: "Blog — Waruna Udara Sampath",
    description:
      "Technical articles on full-stack engineering, cloud architecture, DevOps, AI tooling, and React ecosystem. Written by Waruna Udara Sampath.",
    keywords: [
      "developer blog",
      "tech articles Sri Lanka",
      "React blog",
      "cloud engineering articles",
      "DevOps articles",
    ],
  },
  guestbook: {
    title: "Guestbook — Waruna Udara Sampath",
    description:
      "Sign the guestbook and leave your mark! Say hello to Waruna Udara Sampath.",
    keywords: ["guestbook", "Waruna Udara guestbook"],
  },
  uses: {
    title: "Uses — Waruna Udara Sampath",
    description:
      "A peek into the tools, gear, and software that powers Waruna Udara Sampath's development workflow.",
    keywords: ["developer setup", "uses page", "dev tools", "coding setup"],
  },
  links: {
    title: "Links — Waruna Udara Sampath",
    description:
      "All social, project, and contact links for Waruna Udara Sampath — GitHub, LinkedIn, and more.",
    keywords: ["Waruna Udara links", "contact", "GitHub", "LinkedIn"],
  },
  bucketList: {
    title: "Bucket List — Waruna Udara Sampath",
    description:
      "Things I want to do at least once in my life — personal goals, travel dreams, and life milestones.",
    keywords: ["bucket list", "life goals", "Waruna Udara personal"],
  },
};

/** JSON-LD Person schema for Answer Engine Optimization (AEO) */
export const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Waruna Udara Sampath",
  url: SITE_URL,
  image: `${SITE_URL}/warunaudara.webp`,
  jobTitle: "Full-Stack Developer & Cloud Engineer",
  description:
    "Full-Stack Developer and Cloud/DevOps Specialist from Sri Lanka. 3+ years building web platforms, microservices, and cloud-native applications.",
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
    "Java",
    "Spring Boot",
    "React",
    "TypeScript",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Next.js",
    "DevOps",
    "Cloud Engineering",
    "Microservices",
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
    "Personal portfolio and blog of Waruna Udara Sampath, Full-Stack Developer & Cloud Engineer from Sri Lanka.",
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

/** Generate JSON-LD Blog schema for blog listing */
export const BLOG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog/#blog`,
  url: `${SITE_URL}/blog`,
  name: "Waruna Udara — Blog",
  description:
    "Technical articles on full-stack engineering, cloud architecture, DevOps, AI, and the React ecosystem.",
  author: { "@id": `${SITE_URL}/#person` },
  publisher: { "@id": `${SITE_URL}/#person` },
};
