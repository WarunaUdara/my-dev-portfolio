"use client";

import React from 'react';
import Image from '@/components/ui/Image';
import AuroraText from "@/components/ui/aurora-text";

const TechStack = () => {
  const techStack = [
    // 1. Programming Languages
    { name: 'C', icon: '/techstack-icons/c.png' },
    { name: 'Java', icon: '/techstack-icons/java.png' },
    { name: 'Python', icon: '/techstack-icons/python.png' },
    { name: 'JavaScript', icon: '/techstack-icons/javascript.png' },
    { name: 'TypeScript', icon: '/techstack-icons/typescript.png' },
    { name: 'Go', icon: '/techstack-icons/golang.webp' },
    { name: 'Rust', icon: '/techstack-icons/rust.png' },

    // 2. Web Fundamentals & API
    { name: 'HTML5', icon: '/techstack-icons/html5.png' },
    { name: 'CSS3', icon: '/techstack-icons/css3.png' },
    { name: 'GraphQL', icon: '/techstack-icons/graphql.png' },
    { name: 'Swagger', icon: '/techstack-icons/swagger.png' },
    { name: 'Node.js', icon: '/techstack-icons/nodejs.png' },
    { name: 'Spring Boot', icon: '/techstack-icons/spring-boot.png' },

    // 3. Frontend Frameworks & UI
    { name: 'React', icon: '/techstack-icons/react.png' },
    { name: 'Next.js', icon: '/techstack-icons/nextjs.png' },
    { name: 'TanStack', icon: '/techstack-icons/tanstack.png' },
    { name: 'Angular', icon: '/techstack-icons/angular.png' },
    { name: 'Tailwind CSS', icon: '/techstack-icons/tailwindcss.png' },
    { name: 'Bootstrap', icon: '/techstack-icons/bootstrap.png' },

    // 4. Databases & Search
    { name: 'MySQL', icon: '/techstack-icons/mysql.png' },
    { name: 'PostgreSQL', icon: '/techstack-icons/postgresql.png' },
    { name: 'MongoDB', icon: '/techstack-icons/mongodb.png' },
    { name: 'Elasticsearch', icon: '/techstack-icons/elasticsearch.webp' },
    { name: 'Oracle', icon: '/techstack-icons/oracle.png' },
    { name: 'Flyway', icon: '/techstack-icons/flyway.png' },
    { name: 'DBeaver', icon: '/techstack-icons/dbeaver.png' },
    { name: 'Redis', icon: '/techstack-icons/redis.png' },

    // 5. DevOps, Containers, Security & Cloud Infra
    { name: 'Docker', icon: '/techstack-icons/docker.png' },
    { name: 'Podman', icon: '/techstack-icons/podman.webp', link: 'https://podman.io/' },
    { name: 'Kubernetes', icon: '/techstack-icons/kubernetes.png' },
    { name: 'Argo CD', icon: '/techstack-icons/argo-cd.webp', link: 'https://argo-cd.readthedocs.io/en/stable/' },
    { name: 'OpenTofu', icon: '/techstack-icons/opentofu.webp', link: 'https://opentofu.org/' },
    { name: 'Terraform', icon: '/techstack-icons/terraform.png' },
    { name: 'Kyverno', icon: '/techstack-icons/kyverno.webp' },
    { name: 'Trivy', icon: '/techstack-icons/trivy.webp', link: 'https://trivy.dev/' },
    { name: 'Prometheus', icon: '/techstack-icons/prometheus.webp' },
    { name: 'Grafana', icon: '/techstack-icons/grafana.png' },
    { name: 'AWS', icon: '/techstack-icons/aws.png' },
    { name: 'Azure', icon: '/techstack-icons/azure.png' },
    { name: 'Vercel', icon: '/techstack-icons/vercel.webp' },
    { name: 'Linux', icon: '/techstack-icons/linux.png' },
    { name: 'ngrok', icon: '/techstack-icons/ngrok.svg' },

    // 6. Messaging, Runtime & Tools
    { name: 'Kafka', icon: '/techstack-icons/kafka.png' },
    { name: 'Bun', icon: '/techstack-icons/bun.png' },
    { name: 'Git', icon: '/techstack-icons/git.png' },
    { name: 'GitHub', icon: '/techstack-icons/github.png' },
    { name: 'GitLab', icon: '/techstack-icons/gitlab.png' },
    { name: 'Firebase', icon: '/techstack-icons/firebase.png' }
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
