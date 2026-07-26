import { createRootRoute, Outlet, HeadContent } from '@tanstack/react-router';
import { Providers } from '../providers';
import '../globals.css';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'Waruna Udara Sampath - Full Stack Software Developer' },
      {
        name: 'description',
        content:
          'Full Stack Software Developer specializing in Java, Spring Boot, React/Next.js, and microservices architecture. BICT (Hons) undergraduate with expertise in Docker, AWS, and cloud-native applications.',
      },
      {
        name: 'keywords',
        content:
          'Waruna, Udara, Sampath, Full Stack Developer, Java Developer, Spring Boot, React, Next.js, TanStack, Microservices, Docker, AWS, TypeScript, Sri Lanka',
      },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'Waruna Udara Sampath - Full Stack Software Developer' },
      {
        property: 'og:description',
        content:
          'Full Stack Developer specializing in Java, Spring Boot, React/Next.js, TanStack, and microservices.',
      },
      { property: 'og:url', content: 'https://warunadev.vercel.app/' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/icon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@100..900&display=swap',
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Waruna Udara Sampath',
    jobTitle: 'Full Stack Software Developer',
    description: 'BICT (Hons) undergraduate specializing in microservices and full-stack development',
    url: 'https://warunadev.vercel.app/',
    email: 'warunaudarasam2003@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kalutara',
      addressCountry: 'LK',
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'University of Sri Jayewardenepura',
    },
    knowsAbout: [
      'Java',
      'Spring Boot',
      'React.js',
      'TanStack',
      'Next.js',
      'Docker',
      'AWS',
      'Microservices',
      'TypeScript',
      'MySQL',
      'PostgreSQL',
    ],
    sameAs: ['https://github.com/WarunaUdara', 'https://linkedin.com/in/waruna-udara'],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-background text-foreground">
        <Providers>
          <Outlet />
        </Providers>
      </body>
    </html>
  );
}
