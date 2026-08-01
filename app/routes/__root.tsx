import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Providers } from '../providers';
import TerminalLoader from '@/components/ui/TerminalLoader';
import RouteTerminalLoader from '@/components/ui/RouteTerminalLoader';
import DevToolsGuard from '@/components/ui/DevToolsGuard';
import '../globals.css';

export const Route = createRootRoute({
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
    <Providers>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DevToolsGuard />
      <TerminalLoader>
        <RouteTerminalLoader>
          <main className="min-h-screen bg-background text-foreground antialiased selection:bg-blue-500 selection:text-white">
            <Outlet />
          </main>
        </RouteTerminalLoader>
      </TerminalLoader>
    </Providers>
  );
}
