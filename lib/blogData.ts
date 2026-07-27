export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  author: string;
}

export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "building-turboship-buildathon",
    title: "Building Turboship: Agentic AI Deployment Harness for Multi-Cloud",
    date: "May 18, 2026",
    description: "How we engineered an AI-powered Internal Developer Platform during the Cursor Sri Lanka 24H Buildathon, securing 2nd Place.",
    category: "AI & DEVOPS",
    readTime: "6 min read",
    tags: ["AI Agents", "n8n", "Next.js", "AWS", "Docker", "Trivy"],
    coverImage: "/projects-algoarena.png",
    author: "Waruna Udara",
  },
  {
    slug: "react-19-and-tanstack-router",
    title: "Architecting Modern React 19 Applications with TanStack Router & Vite",
    date: "April 10, 2026",
    description: "Why TanStack Router and Vite form the most resilient, type-safe client architecture for modern web applications.",
    category: "WEB ARCHITECTURE",
    readTime: "4 min read",
    tags: ["React 19", "TanStack Router", "Vite", "TypeScript"],
    coverImage: "/projects-portfolio.png",
    author: "Waruna Udara",
  },
];

export function getBlogPostBySlug(slug: string): BlogPostMeta | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
