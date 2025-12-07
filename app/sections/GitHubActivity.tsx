'use client';

import { useEffect, useState } from 'react';
import GitHubCalendar from 'react-github-calendar';

const GitHubActivity = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <section className="bg-black text-white py-20">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="animate-pulse">Loading GitHub Activity...</div>
        </div>
      </section>
    );
  }

  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'WarunaUdara';

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-4">
            DEVELOPER INSIGHTS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif">
            GitHub <span className="italic bg-gradient-to-r from-[var(--color-8)] to-[var(--color-9)] bg-clip-text text-transparent">Activity</span>
          </h2>
        </div>

        {/* Contribution Calendar - Larger and Centered */}
        <div className="flex justify-center items-center">
          <div className="w-full max-w-5xl">
            <GitHubCalendar 
              username={username}
              blockSize={14}
              blockMargin={4}
              fontSize={14}
              colorScheme="dark"
              theme={{
                light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              style={{
                color: '#9ca3af',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;