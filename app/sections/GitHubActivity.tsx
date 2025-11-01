'use client';

import { useEffect, useState } from 'react';
import { Users, Star, BookOpen, GitFork } from 'lucide-react';
import GitHubCalendar from 'react-github-calendar';

interface GitHubStats {
  followers: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  name: string;
  bio: string;
  avatarUrl: string;
}

const GitHubActivity = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats
    fetch('/api/github/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(error => console.error('Error fetching stats:', error))
      .finally(() => setLoading(false));
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

  if (!stats) {
    return null;
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
        <div className="mb-16 flex justify-center items-center">
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

        {/* Stats Grid */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
          <StatCard 
            icon={<Users className="w-7 h-7" />}
            label="Followers" 
            value={stats.followers}
            color="border-purple-500/20 hover:border-purple-500/50"
            iconColor="text-purple-400"
          />
          <StatCard 
            icon={<Star className="w-7 h-7" />}
            label="Total Stars" 
            value={stats.totalStars}
            color="border-yellow-500/20 hover:border-yellow-500/50"
            iconColor="text-yellow-400"
          />
          <StatCard 
            icon={<BookOpen className="w-7 h-7" />}
            label="Public Repos" 
            value={stats.publicRepos}
            color="border-green-500/20 hover:border-green-500/50"
            iconColor="text-green-400"
          />
          <StatCard 
            icon={<GitFork className="w-7 h-7" />}
            label="Total Forks" 
            value={stats.totalForks}
            color="border-blue-500/20 hover:border-blue-500/50"
            iconColor="text-blue-400"
          />
        </div>
      </div>
    </section>
  );
};

const StatCard = ({ 
  icon, 
  label, 
  value,
  color,
  iconColor
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: number;
  color: string;
  iconColor: string;
}) => (
  <div className={`bg-[#0d1117] rounded-2xl p-5 border ${color} transition-all duration-300 w-[calc(50%-0.375rem)] sm:w-[calc(25%-0.75rem)] lg:flex-1 lg:max-w-[220px]`}>
    <div className={`${iconColor} mb-3`}>
      {icon}
    </div>
    <p className="text-gray-400 text-xs mb-1">{label}</p>
    <p className="text-3xl sm:text-4xl font-bold">{value}</p>
  </div>
);

export default GitHubActivity;