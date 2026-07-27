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
  title: "Waruna Udara Sampath (Waruna Udara) — Full-Stack Developer & Cloud Engineer",
  shortTitle: "Waruna Udara",
  description:
    "Full-Stack Developer & Cloud/DevOps Specialist from Sri Lanka. Waruna Udara (Waruna Udara Sampath) builds robust web platforms with React, Java Spring Boot, Kubernetes, AWS, and modern AI integrations. BICT (Hons) undergraduate at University of Sri Jayewardenepura.",
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

export const PAGE_META: Record<string, { title: string; description: string; keywords?: string[] }> = {
  home: {
    title: "Waruna Udara Sampath (Waruna Udara) — Full-Stack Developer & Cloud Engineer",
    description:
      "Waruna Udara Sampath (Waruna Udara) — Full-Stack Developer & Cloud/DevOps Specialist from Sri Lanka. Building robust web platforms with React, Java Spring Boot, Kubernetes, and AWS.",
    keywords: [
      "Waruna Udara",
      "Waruna Udara Sampath",
      "Waruna Sampath",
      "Full Stack Developer",
      "Sri Lanka developer",
      "Java developer",
      "React developer",
    ],
  },
  about: {
    title: "About — Waruna Udara Sampath (Waruna Udara)",
    description:
      "Learn about Waruna Udara Sampath (Waruna Udara) — Full-Stack & Cloud Engineer with experience in Java, React, Docker, Kubernetes, and AWS.",
    keywords: ["Waruna Udara", "Waruna Udara Sampath", "about Waruna Udara", "software engineer background", "cloud developer Sri Lanka"],
  },
  work: {
    title: "Work & Projects — Waruna Udara Sampath (Waruna Udara)",
    description:
      "Explore projects by Waruna Udara Sampath (Waruna Udara) including Turboship, AlgoArena, Beauty of Cloud, and cloud-native software builds.",
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
    title: "Blog — Waruna Udara Sampath (Waruna Udara)",
    description:
      "Technical articles on full-stack engineering, cloud architecture, DevOps, AI tooling, and React ecosystem written by Waruna Udara Sampath (Waruna Udara).",
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
    title: "Guestbook — Waruna Udara Sampath (Waruna Udara)",
    description:
      "Sign the guestbook and leave your mark! Say hello to Waruna Udara Sampath (Waruna Udara).",
    keywords: ["guestbook", "Waruna Udara guestbook", "Waruna Udara", "Waruna Udara Sampath"],
  },
  uses: {
    title: "Uses — Waruna Udara Sampath (Waruna Udara)",
    description:
      "A peek into the tools, gear, and software that powers Waruna Udara Sampath's (Waruna Udara) development workflow.",
    keywords: ["developer setup", "uses page", "dev tools", "Waruna Udara", "Waruna Udara Sampath"],
  },
  links: {
    title: "Links — Waruna Udara Sampath (Waruna Udara)",
    description:
      "All social, project, and contact links for Waruna Udara Sampath (Waruna Udara) — GitHub, LinkedIn, and more.",
    keywords: ["Waruna Udara links", "contact", "GitHub", "LinkedIn", "Waruna Udara", "Waruna Udara Sampath"],
  },
  bucketList: {
    title: "Bucket List — Waruna Udara Sampath (Waruna Udara)",
    description:
      "Things Waruna Udara Sampath (Waruna Udara) wants to do at least once in life — personal goals, travel dreams, and life milestones.",
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
