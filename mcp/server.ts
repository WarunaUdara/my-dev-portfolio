import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create Model Context Protocol (MCP) Server
const server = new McpServer({
  name: "waruna-portfolio-mcp",
  version: "1.0.0",
  description: "Official MCP Server for Waruna Udara Sampath's Portfolio",
});

// Developer Profile Data
const PROFILE_DATA = {
  name: "Waruna Udara Sampath",
  title: "Full-Stack Developer & Cloud/DevOps Specialist",
  bio: "Driven by a deep curiosity for modern software systems, cloud architecture, and intuitive user design. Over the past 3+ years, I've engineered robust web platforms, automated cloud infrastructures, and led tech communities.",
  location: "Sri Lanka",
  email: "warunaudarasampath@gmail.com",
  socials: {
    github: "https://github.com/WarunaUdara",
    linkedin: "https://linkedin.com/in/waruna-udara",
    website: "https://warunadev.vercel.app",
  },
};

const EDUCATION_DATA = [
  {
    institution: "University of Sri Jayewardenepura",
    degree: "Bachelor of Information and Communication Technology (Hons), Network Technology",
    period: "2022 - Present",
    details: "Undergraduate focusing on Cloud Computing, Computer Networks, and Microservices Architecture.",
  },
  {
    institution: "ICET - Institute of Computer Engineering Technology",
    degree: "Diploma in Software Engineering",
    period: "2021 - 2022",
    details: "Specialized in Java, Enterprise Software Design, Data Structures, and Database Systems.",
  },
  {
    institution: "G.C.E. Advanced Level (Technology Stream)",
    degree: "Engineering Technology, Science for Technology, ICT",
    period: "2020",
    details: "Secured AAA passes. District Rank 09 and Island Rank 121.",
  },
];

const PROJECTS_DATA = [
  {
    name: "Turboship",
    tagline: "Agentic AI Multi-Cloud Deployment Harness",
    award: "🥈 2nd Place (n8n Track) - Cursor Sri Lanka 24H Buildathon",
    techStack: ["Next.js 15", "n8n", "OpenAI GPT-5.5", "AWS ECS", "Azure Container Apps", "Trivy"],
    description: "An AI-driven Internal Developer Platform control plane that containerizes, scans, and deploys microservices to AWS and Azure.",
  },
  {
    name: "AlgoArena",
    tagline: "Competitive Programming & Code Execution Engine",
    techStack: ["React", "Spring Boot", "Docker", "PostgreSQL", "Redis"],
    description: "Real-time algorithmic battle arena with sandboxed code execution environments supporting Java, C++, Python, and Go.",
  },
  {
    name: "Beauty of Cloud",
    tagline: "Cloud Native Microservices & Kubernetes Platform",
    techStack: ["React", "Go", "Kubernetes", "Helm", "Terraform", "Prometheus"],
    description: "Cloud infrastructure visualization and microservice orchestration suite for cloud architecture demonstrations.",
  },
  {
    name: "Personal Portfolio",
    tagline: "Developer Portfolio with Glassmorphism & WebGL",
    techStack: ["Vite", "React 19", "TanStack Router", "Framer Motion", "Tailwind CSS 4", "MDX"],
    description: "High-performance developer portfolio built with silver obsidian dark theme, custom MDX blog, and snappy terminal transitions.",
  },
];

const SKILLS_DATA = {
  frontend: ["React 19", "Next.js", "TypeScript", "Tailwind CSS 4", "Framer Motion", "GSAP"],
  backend: ["Java", "Spring Boot", "Go", "Node.js", "Express", "REST APIs", "GraphQL"],
  cloudDevOps: ["AWS (ECS, S3, IAM)", "Azure", "Docker", "Kubernetes", "Terraform", "n8n", "CI/CD"],
  databases: ["PostgreSQL", "MongoDB", "Redis", "Firebase Firestore"],
};

const BLOG_POSTS_DATA = [
  {
    slug: "mcp-server-tools-tanstack-ai",
    title: "MCP Server Tools: Connecting TanStack AI to Model Context Protocol Servers",
    date: "July 26, 2026",
    category: "AI & DEVOPS",
  },
  {
    slug: "building-turboship-buildathon",
    title: "Building Turboship: Agentic AI Deployment Harness for Multi-Cloud",
    date: "May 18, 2026",
    category: "AI & DEVOPS",
  },
  {
    slug: "react-19-and-tanstack-router",
    title: "Architecting Modern React 19 Applications with TanStack Router & Vite",
    date: "April 10, 2026",
    category: "WEB ARCHITECTURE",
  },
];

// --- MCP TOOLS ---

// Tool 1: get_profile
server.tool(
  "get_profile",
  "Fetch Waruna Udara's developer profile, bio, contact info, and social links",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(PROFILE_DATA, null, 2) }],
  })
);

// Tool 2: list_projects
server.tool(
  "list_projects",
  "List all showcase software engineering and cloud projects built by Waruna Udara",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS_DATA, null, 2) }],
  })
);

// Tool 3: get_education
server.tool(
  "get_education",
  "Fetch Waruna Udara's educational qualifications, degrees, and academic ranks",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(EDUCATION_DATA, null, 2) }],
  })
);

// Tool 4: get_skills
server.tool(
  "get_skills",
  "List Waruna Udara's technical skill set across Frontend, Backend, DevOps/Cloud, and Databases",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS_DATA, null, 2) }],
  })
);

// Tool 5: list_blog_posts
server.tool(
  "list_blog_posts",
  "List all published MDX blog articles on Waruna Udara's website",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(BLOG_POSTS_DATA, null, 2) }],
  })
);

// Tool 6: search_portfolio
server.tool(
  "search_portfolio",
  "Search across Waruna Udara's portfolio by keyword (projects, tech stack, education, or skills)",
  { query: z.string().describe("Keyword to search for e.g. Java, Docker, AWS, n8n, React") },
  async ({ query }) => {
    const q = query.toLowerCase();
    const matchedProjects = PROJECTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
    );
    const matchedSkills = Object.entries(SKILLS_DATA).filter(([_, skills]) =>
      skills.some((s) => s.toLowerCase().includes(q))
    );

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ query, matchedProjects, matchedSkills }, null, 2),
        },
      ],
    };
  }
);

// --- MCP RESOURCES ---

server.resource("profile", "portfolio://profile", async () => ({
  contents: [
    {
      uri: "portfolio://profile",
      text: JSON.stringify(PROFILE_DATA, null, 2),
    },
  ],
}));

server.resource("projects", "portfolio://projects", async () => ({
  contents: [
    {
      uri: "portfolio://projects",
      text: JSON.stringify(PROJECTS_DATA, null, 2),
    },
  ],
}));

server.resource("education", "portfolio://education", async () => ({
  contents: [
    {
      uri: "portfolio://education",
      text: JSON.stringify(EDUCATION_DATA, null, 2),
    },
  ],
}));

// Start MCP Server over stdio
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Waruna Udara Portfolio MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP Server:", error);
  process.exit(1);
});
