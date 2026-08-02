"use client";

import React from 'react';
import Image from '@/components/ui/Image';
import AuroraText from "@/components/ui/aurora-text";

const TechStack = () => {
  const techStack = [
  // 1. Programming Languages
  { name: 'C', icon: '/techstack-icons/c.webp' },
  { name: 'Java', icon: '/techstack-icons/java.webp' },
  { name: 'Python', icon: '/techstack-icons/python.webp' },
  { name: 'JavaScript', icon: '/techstack-icons/javascript.webp' },
  { name: 'TypeScript', icon: '/techstack-icons/typescript.webp' },
  { name: 'Go', icon: '/techstack-icons/golang.webp' },
  { name: 'Rust', icon: '/techstack-icons/rust.webp' },

  // 2. Web Fundamentals & API
  { name: 'HTML5', icon: '/techstack-icons/html5.webp' },
  { name: 'CSS3', icon: '/techstack-icons/css3.webp' },
  { name: 'GraphQL', icon: '/techstack-icons/graphql.webp' },
  { name: 'Swagger', icon: '/techstack-icons/swagger.webp' },
  { name: 'Node.js', icon: '/techstack-icons/nodejs.webp' },
  { name: 'Spring Boot', icon: '/techstack-icons/spring-boot.webp' },

  // 3. Frontend Frameworks & UI
  { name: 'React', icon: '/techstack-icons/react.webp' },
  { name: 'Next.js', icon: '/techstack-icons/nextjs.webp' },
  { name: 'TanStack', icon: '/techstack-icons/tanstack.webp' },
  { name: 'Angular', icon: '/techstack-icons/angular.webp' },
  { name: 'Tailwind CSS', icon: '/techstack-icons/tailwindcss.webp' },
  { name: 'Bootstrap', icon: '/techstack-icons/bootstrap.webp' },

  // 4. Databases & Search
  { name: 'MySQL', icon: '/techstack-icons/mysql.webp' },
  { name: 'PostgreSQL', icon: '/techstack-icons/postgresql.webp' },
  { name: 'MongoDB', icon: '/techstack-icons/mongodb.webp' },
  { name: 'Elasticsearch', icon: '/techstack-icons/elasticsearch.webp' },
  { name: 'Oracle', icon: '/techstack-icons/oracle.webp' },
  { name: 'Flyway', icon: '/techstack-icons/flyway.webp' },
  { name: 'DBeaver', icon: '/techstack-icons/dbeaver.webp' },
  { name: 'Redis', icon: '/techstack-icons/redis.webp' },

  // 5. DevOps, Containers, Security & Cloud Infra
  { name: 'Docker', icon: '/techstack-icons/docker.webp' },
  { name: 'Podman', icon: '/techstack-icons/podman.webp', link: 'https://podman.io/' },
  { name: 'Kubernetes', icon: '/techstack-icons/kubernetes.webp' },
  { name: 'Argo CD', icon: '/techstack-icons/argo-cd.webp', link: 'https://argo-cd.readthedocs.io/en/stable/' },
  { name: 'OpenTofu', icon: '/techstack-icons/opentofu.webp', link: 'https://opentofu.org/' },
  { name: 'Terraform', icon: '/techstack-icons/terraform.webp' },
  { name: 'Kyverno', icon: '/techstack-icons/kyverno.webp' },
  { name: 'Trivy', icon: '/techstack-icons/trivy.webp', link: 'https://trivy.dev/' },
  { name: 'Prometheus', icon: '/techstack-icons/prometheus.webp' },
  { name: 'Grafana', icon: '/techstack-icons/grafana.webp' },
  { name: 'AWS', icon: '/techstack-icons/aws.webp' },
  { name: 'Azure', icon: '/techstack-icons/azure.webp' },
  { name: 'Vercel', icon: '/techstack-icons/vercel.webp' },
  { name: 'Linux', icon: '/techstack-icons/linux.webp' },
  { name: 'ngrok', icon: '/techstack-icons/ngrok.webp' },

  // 6. Messaging, Runtime & Tools
  { name: 'Kafka', icon: '/techstack-icons/kafka.webp' },
  { name: 'Bun', icon: '/techstack-icons/bun.webp' },
  { name: 'Git', icon: '/techstack-icons/git.webp' },
  { name: 'GitHub', icon: '/techstack-icons/github.webp' },
  { name: 'GitLab', icon: '/techstack-icons/gitlab.webp' },
  { name: 'Firebase', icon: '/techstack-icons/firebase.webp' }
];


  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-2">
            My <AuroraText className="italic font-serif">Tech-Stack</AuroraText>
          </h2>
          <h2 className="text-sm text-gray-400 uppercase tracking-wider">
            Technologies I&apos;ve been working with and I constantly try to improve
          </h2>
        </div>

        {/* Tech Stack Grid - Free flowing and centered */}
        <div className="flex flex-wrap justify-center items-center gap-2 max-w-4xl mx-auto">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="group relative w-12 h-12 sm:w-14 sm:h-14 bg-[var(--color-2)] rounded-2xl flex items-center justify-center hover:bg-[var(--color-3)] transition-all duration-300 hover:scale-110 p-0"
              title={tech.name}
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={48}
                height={48}
                className="w-full h-full object-contain p-1"
              />
              
              {/* Tooltip */}
              <div className="absolute bottom-full mb-1 hidden group-hover:block z-10">
                <div className="bg-[var(--color-3)] text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap">
                  {tech.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
