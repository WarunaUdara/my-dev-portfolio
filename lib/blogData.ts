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
    slug: "http-query-method-rfc-10008",
    title: "HTTP QUERY Method (RFC 10008): Solving GET & POST API Limitations",
    date: "Jul 4, 2026",
    description: "An architectural breakdown of the new HTTP QUERY method (RFC 10008), how it eliminates GET URL limits and POST semantic anti-patterns in modern web APIs.",
    category: "API ARCHITECTURE",
    readTime: "5 min read",
    tags: ["HTTP QUERY", "RFC 10008", "API Architecture", "REST API", "DevOps", "Backend Engineering"],
    author: "Waruna Udara Sampath",
  },
  {
    slug: "kyverno-tutorial-kubernetes-policy-engine",
    title: "Kyverno Tutorial: How to Use a Policy Engine on Kubernetes",
    date: "Feb 20, 2026",
    description: "Learn how to validate, mutate, and generate Kubernetes resources using plain YAML, no new languages required.",
    category: "DEVOPS & SECURITY",
    readTime: "10 min read",
    tags: ["Kubernetes", "Kyverno", "Kubernetes Security", "DevOps", "Platform Engineering"],
    author: "Waruna Udara Sampath",
  },
  {
    slug: "building-turboship-buildathon",
    title: "Building Turboship: Agentic AI Deployment Harness for Multi-Cloud",
    date: "May 18, 2026",
    description: "How we engineered an AI-powered Internal Developer Platform during the Cursor Sri Lanka 24H Buildathon, securing 2nd Place.",
    category: "AI & DEVOPS",
    readTime: "6 min read",
    tags: ["AI Agents", "n8n", "Next.js", "AWS", "Docker", "Trivy"],
    author: "Waruna Udara",
  },
  {
    slug: "studed-microservices-educational-platform",
    title: "StudEd: Architecting a Microservices & GraphQL Intelligent Learning Platform",
    date: "Jul 28, 2026",
    description: "An architectural breakdown of StudEd — Sri Lanka's premium subscription-based educational platform powered by 11 Go microservices, TanStack Router/Query, OKLCH perceptual color space, zero-asset Web Audio synthesis, and native 3Dmol & Manim visualizers.",
    category: "SYSTEM ARCHITECTURE",
    readTime: "7 min read",
    tags: ["Go", "GraphQL", "Microservices", "React 19", "TanStack", "PostgreSQL", "Kubernetes", "GitOps"],
    coverImage: "/projects/studed.png",
    author: "Waruna Udara Sampath",
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
