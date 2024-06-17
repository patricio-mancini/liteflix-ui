'use server'

import { cookies } from 'next/headers';
import { Title, FeaturedTitle } from '@/types/titles';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
const tmdbApiKey = process.env.TMDB_API_KEY as string;
const tmdbBaseUrl = process.env.TMDB_API_V3_BASE_URL as string;
const tmdbBaseImgUrl = process.env.TMDB_IMAGE_BASE_URL as string;

export async function fetchFeaturedTitle(): Promise<FeaturedTitle> {
  const res = await fetch(`${tmdbBaseUrl}/movie/now_playing?api_key=${tmdbApiKey}`);
  const data = await res.json();
  const firstMovie = data.results[0];
  return {
    backdropSrc: `${tmdbBaseImgUrl}/original${firstMovie.backdrop_path}`,
    title: firstMovie.title,
    id: firstMovie.id
  };
}

export async function fetchPopularTitles(): Promise<Title[]> {
  try {
    const response = await fetch(`${tmdbBaseUrl}/movie/popular?api_key=${tmdbApiKey}`);
    if (!response.ok) {
      throw new Error('Failed to fetch popular titles');
    }
    const data = await response.json();
    const popularTitles = data.results.map((title: any) => ({
      id: title.id,
      title: title.title,
      voteAverage: Number(title.vote_average.toFixed(1)),
      releaseYear: title.release_date.split('-')[0],
      posterPath: `${tmdbBaseImgUrl}/w342${title.poster_path}`
    }));
    return popularTitles;
  } catch (error) {
    console.error('Error fetching popular titles:', error);
    return [];
  }
}

export async function fetchUserTitles(): Promise<Title[]> {
  const cookieHeader = cookies().toString();
  try {
    const response = await fetch(`${apiBaseUrl}/user/movies`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
      cache: 'no-store'
    });
    if (!response.ok) {
      const errorDetails = await response.json().catch(() => ({}));
      const errorMessage = errorDetails.message || 'An unknown error occurred';
      throw new Error(`Failed to fetch user titles: ${response.status} ${response.statusText}. ${errorMessage}`);
    }
    const data = await response.json();
    const userTitles = data.map((item: Omit<Title & { filePath: string }, 'voteAverage' | 'releaseYear' | 'posterPath'>) => ({
      id: item.id,
      title: item.title,
      posterPath: `${apiBaseUrl}${item.filePath}`
    }));
    return userTitles;
  } catch (error) {
    console.error('Error fetching user titles:', error);
    return [];
  }
}
