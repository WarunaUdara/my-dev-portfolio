'use client';

import React from "react";
import { useQuery } from '@tanstack/react-query';
import GitHubCalendar from 'react-github-calendar';
import { IconStar, IconGitFork, IconBook } from '@tabler/icons-react';
import AuroraText from "@/components/ui/aurora-text";

interface GitHubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  avatarUrl: string;
  name: string;
  bio: string;
}

const GitHubActivity = () => {
  const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'WarunaUdara';

  const { data: stats } = useQuery<GitHubStats | null>({
    queryKey: ['github-stats', username],
    queryFn: async () => {
      try {
        const res = await fetch('/api/github/stats');
        if (!res.ok) return null;
        return res.json();
      } catch {
        return null;
      }
    },
    staleTime: 1000 * 60 * 30, // Cache for 30 minutes
  });

  return (
    <section className="relative bg-black text-white py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest mb-4">
            DEVELOPER INSIGHTS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif">
            GitHub <AuroraText className="italic font-serif">Activity</AuroraText>
          </h2>
        </div>

        {/* Live GitHub Stats Badges powered by TanStack Query */}
        {stats && (
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-gray-300">
              <IconBook className="w-4 h-4 text-blue-400" />
              <span>{stats.publicRepos} Repositories</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-gray-300">
              <IconStar className="w-4 h-4 text-yellow-400" />
              <span>{stats.totalStars} Stars</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 text-sm text-gray-300">
              <IconGitFork className="w-4 h-4 text-purple-400" />
              <span>{stats.totalForks} Forks</span>
            </div>
          </div>
        )}

        {/* Contribution Calendar */}
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