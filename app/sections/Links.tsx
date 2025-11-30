import React from 'react'
import { Github, Linkedin, Mail, FileText, Twitter } from 'lucide-react'

const Links = () => {
  const links = [
    {
      title: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: <Github className="w-5 h-5" />,
      description: 'Check out my projects'
    },
    {
      title: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: <Linkedin className="w-5 h-5" />,
      description: 'Connect with me professionally'
    },
    {
      title: 'Email',
      url: 'mailto:your.email@example.com',
      icon: <Mail className="w-5 h-5" />,
      description: 'Get in touch'
    },
    {
      title: 'Resume',
      url: '/resume.pdf',
      icon: <FileText className="w-5 h-5" />,
      description: 'Download my resume'
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: <Twitter className="w-5 h-5" />,
      description: 'Follow me on Twitter'
    }
  ]

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-4">Connect With Me</h2>
      <p className="text-gray-600 dark:text-gray-400 text-center mb-12">
        Find me on these platforms
      </p>
      
      <div className="space-y-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-6 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg group"
          >
            <div className="text-gray-700 dark:text-gray-300 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{link.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{link.description}</p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Links