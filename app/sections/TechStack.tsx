import React from 'react';
import Image from 'next/image';
import CurvedLoop from '../ui/CurvedLoop';

const TechStack = () => {
  const techStack = [
    { name: 'React', icon: '/icons8-react-24.png' },
    { name: 'Next.js', icon: '/icons8-nextjs-144.png' },
    { name: 'TypeScript', icon: '/ts.png' },
    { name: 'Java', icon: '/icons8-java-144.png' },
    { name: 'Spring Boot', icon: '/icons8-spring-boot-48.png' },
    { name: 'Angular', icon: '/icons8-angular-96.png' },
    { name: 'Node.js', icon: '/icons8-nodejs-144.png' },
    { name: 'CSS3', icon: '/icons8-css3-144.png' },
    { name: 'Python', icon: '/icons8-python-144.png' },
    { name: 'Tailwind CSS', icon: '/icons8-tailwind-css-144.png' },
    { name: 'Docker', icon: '/icons8-docker-144.png' },
    { name: 'MongoDB', icon: '/icons8-mongo-db-96.png' },
    { name: 'Figma', icon: '/icons8-figma-96.png' },
    { name: 'C', icon: '/icons8-c-144.png' },
    { name: 'PostgreSQL', icon: '/icons8-postgresql-96.png' },
    { name: 'Bootstrap', icon: '/icons8-bootstrap-144.png' },
    { name: 'Hibernate', icon: '/hibernate.png' },
    { name: 'MySQL', icon: '/icons8-mysql-144.png' },
    { name: 'HTML5', icon: '/icons8-html5-144.png' },
    { name: 'Kafka', icon: '/icons8-apache-kafka-64.png' },
    { name: 'JavaScript', icon: '/icons8-javascript-144.png' },
    { name: 'GitHub', icon: '/icons8-github-50.png' },
    { name: 'Swagger', icon: '/icons8-swagger-144.png' },
    { name: 'Git', icon: '/icons8-git-144.png' },
    { name: 'Postman', icon: '/icons8-postman-inc-96.png' },
    { name: 'Kubernetes', icon: '/icons8-kubernetes-48.png' },
    { name: 'Terraform', icon: '/icons8-terraform-48.png' },
    { name: 'AWS', icon: '/aws.png' },
    { name: 'Vercel', icon: '/vercel.png' },
    { name: 'Grafana', icon: '/icons8-grafana-24.png' },
    { name: 'VS Code', icon: '/icons8-vs-code-96.png' },
    { name: 'IntelliJ IDEA', icon: '/icons8-intellij-idea-96.png' },
    { name: 'GitLab', icon: '/icons8-gitlab-96.png' },
    { name: 'Oracle', icon: '/icons8-oracle-96.png' },
    { name: 'Bun', icon: '/Bun.png' },
    { name: 'Linux', icon: '/Linux.png' },
  ];

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight mb-2">
            My <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">Tech-Stack</span>
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
      <br /><br />
      <div className="container mx-auto">
        <CurvedLoop 
          marqueeText="Scalability ✦ Maintainability ✦ Security ✦ Performance ✦ Reliability"
          speed={2}
          curveAmount={0}
          direction="right"
          interactive={true}
          className="font-serif text-white/80"
        />
      </div>
    </section>
  );
};

export default TechStack;