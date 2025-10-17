import { Octokit } from '@octokit/rest';
import { NextResponse } from 'next/server';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const username = process.env.GITHUB_USERNAME || 'WarunaUdara';

    // Get user data
    const { data: user } = await octokit.users.getByUsername({ username });

    // Get repositories
    const { data: repos } = await octokit.repos.listForUser({
      username,
      per_page: 100,
      sort: 'updated',
    });

    // Calculate stats
    const totalStars = repos.reduce((acc, repo) => acc + (repo.stargazers_count ?? 0), 0);
    const totalForks = repos.reduce((acc, repo) => acc + (repo.forks_count ?? 0), 0);
    const publicRepos = repos.filter(repo => !repo.fork).length;

    return NextResponse.json({
      followers: user.followers,
      publicRepos,
      totalStars,
      totalForks,
      avatarUrl: user.avatar_url,
      name: user.name,
      bio: user.bio,
    });
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}