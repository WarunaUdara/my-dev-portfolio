import { NextResponse } from 'next/server';

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_URL = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_RECENTLY_PLAYED_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

interface SpotifyToken {
  access_token: string;
}

interface SpotifyTrack {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface SpotifyNowPlaying {
  is_playing: boolean;
  item: SpotifyTrack;
}

interface SpotifyRecentlyPlayed {
  items: Array<{
    track: SpotifyTrack;
    played_at: string;
  }>;
}

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to get access token');
  }

  const data: SpotifyToken = await response.json();
  return data.access_token;
}

async function getNowPlaying(access_token: string) {
  const response = await fetch(SPOTIFY_NOW_PLAYING_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });

  if (response.status === 204 || response.status === 202) {
    return null; // Not playing anything
  }

  if (!response.ok) {
    throw new Error('Failed to fetch now playing');
  }

  const data: SpotifyNowPlaying = await response.json();
  return data;
}

async function getRecentlyPlayed(access_token: string) {
  const response = await fetch(SPOTIFY_RECENTLY_PLAYED_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch recently played');
  }

  const data: SpotifyRecentlyPlayed = await response.json();
  return data.items[0];
}

export async function GET() {
  try {
    if (!client_id || !client_secret || !refresh_token) {
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      );
    }

    const access_token = await getAccessToken();
    
    // Try to get currently playing
    const nowPlaying = await getNowPlaying(access_token);
    
    if (nowPlaying && nowPlaying.is_playing) {
      const track = nowPlaying.item;
      return NextResponse.json({
        isPlaying: true,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url || null,
        songUrl: track.external_urls.spotify,
      });
    }

    // If nothing is currently playing, get recently played
    const recentlyPlayed = await getRecentlyPlayed(access_token);
    
    if (recentlyPlayed) {
      const track = recentlyPlayed.track;
      return NextResponse.json({
        isPlaying: false,
        title: track.name,
        artist: track.artists.map((artist) => artist.name).join(', '),
        album: track.album.name,
        albumImageUrl: track.album.images[0]?.url || null,
        songUrl: track.external_urls.spotify,
      });
    }

    return NextResponse.json(
      { error: 'No track data available' },
      { status: 404 }
    );

  } catch (error) {
    console.error('Spotify API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Spotify data' },
      { status: 500 }
    );
  }
}
