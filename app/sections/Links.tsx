import React from 'react'
import { IconBrandGithub, IconBrandLinkedin, IconMail, IconBrandX, IconSend, IconBook, IconFileText, IconBrandInstagram } from '@tabler/icons-react'

const Links = () => {
  const links = [
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/waruna-udara/',
      icon: <IconBrandLinkedin className="w-5 h-5" />,
      description: 'Connect with me professionally'
    },
    {
      title: 'Telegram',
      url: 'https://t.me/WarunaUdara',
      icon: <IconSend className="w-5 h-5" />,
      description: 'Message me on Telegram'
    },
    {
      title: 'GitHub',
      url: 'https://github.com/WarunaUdara',
      icon: <IconBrandGithub className="w-5 h-5" />,
      description: 'Check out my projects'
    },
    {
      title: 'Guestbook',
      url: '/guestbook',
      icon: <IconBook className="w-5 h-5" />,
      description: 'Sign my guestbook'
    },
    {
      title: 'X (Twitter)',
      url: 'https://x.com/waruna_udara',
      icon: <IconBrandX className="w-5 h-5" />,
      description: 'Follow me on X'
    },
    {
      title: 'Email',
      url: 'mailto:warunaudarasam2003@gmail.com',
      icon: <IconMail className="w-5 h-5" />,
      description: 'Connect on BlueSky'
    },
    {
      title: 'Resume',
      url: '/resume.pdf',
      icon: <IconFileText className="w-5 h-5" />,
      description: 'View my resume'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/waruna_udarax/',
      icon: <IconBrandInstagram className="w-5 h-5" />,
      description: 'Follow me on Instagram'
    }
  ]

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6 min-h-screen flex items-center">
      <div className="container mx-auto max-w-xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-3">
            All My Links
          </h2>
          <p className="text-gray-400 text-sm">
            Connect with me on various platforms
          </p>
        </div>
        
        {/* Links List */}
        <div className="space-y-3">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-900/50 border border-white/10 hover:border-white/30 hover:bg-zinc-800/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-white">
                  {link.icon}
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-base text-white">
                    {link.title}
                  </h3>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-500 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Links