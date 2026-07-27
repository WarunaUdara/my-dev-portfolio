import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create Model Context Protocol (MCP) Server
const server = new McpServer({
  name: "portfolio-mcp-server",
  version: "1.0.0",
  description: "MCP Server for Portfolio Projects and Technical Showcase",
});

const PROJECTS_DATA = [
  {
    name: "Turboship",
    tagline: "Agentic AI Multi-Cloud Deployment Harness",
    techStack: ["Next.js 15", "n8n", "AWS ECS", "Azure Container Apps", "Trivy"],
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

// --- MCP TOOLS ---

server.tool(
  "list_projects",
  "List showcase software engineering and cloud projects",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(PROJECTS_DATA, null, 2) }],
  })
);

server.tool(
  "get_skills",
  "List technical skills across Frontend, Backend, DevOps/Cloud, and Databases",
  {},
  async () => ({
    content: [{ type: "text", text: JSON.stringify(SKILLS_DATA, null, 2) }],
  })
);

server.tool(
  "search_portfolio",
  "Search across portfolio projects by keyword or tech stack",
  { query: z.string().describe("Keyword to search for e.g. Java, Docker, AWS, React") },
  async ({ query }) => {
    const q = query.toLowerCase();
    const matchedProjects = PROJECTS_DATA.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
    );
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ query, matchedProjects }, null, 2),
        },
      ],
    };
  }
);

// --- MCP RESOURCES ---

server.resource("projects", "portfolio://projects", async () => ({
  contents: [
    {
      uri: "portfolio://projects",
      text: JSON.stringify(PROJECTS_DATA, null, 2),
    },
  ],
}));

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Portfolio MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in MCP Server:", error);
  process.exit(1);
});
