import { fetchFeaturedTitle, fetchPopularTitles, fetchUserTitles } from '@/lib/api/server';

jest.mock('next/headers', () => ({
  cookies: jest.fn().mockReturnValue('mock-cookie'),
}));

describe('API Server Functions', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchFeaturedTitle', () => {
    it('fetches featured title successfully', async () => {
      const mockResponse = {
        results: [
          {
            backdrop_path: '/mock-backdrop-path.jpg',
            title: 'Mock Featured Title',
            id: 12345
          }
        ]
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchFeaturedTitle();
      expect(result).toEqual({
        backdropSrc: `${process.env.TMDB_IMAGE_BASE_URL}/original/mock-backdrop-path.jpg`,
        title: 'Mock Featured Title',
        id: 12345
      });
      expect(fetch).toHaveBeenCalledWith(`${process.env.TMDB_API_V3_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`);
    });

    it('handles failure to fetch featured title', async () => {
      const errorMessage = 'Failed to fetch featured title';
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error'
      });

      try {
        await fetchFeaturedTitle();
      } catch (error: any) {
        expect(error.message).toBe(errorMessage);
      }
      expect(fetch).toHaveBeenCalledWith(`${process.env.TMDB_API_V3_BASE_URL}/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`);
    });
  });

  describe('fetchPopularTitles', () => {
    it('fetches popular titles successfully', async () => {
      const mockResponse = {
        results: [
          {
            id: 1,
            title: 'Mock Popular Title 1',
            vote_average: 7.5,
            release_date: '2023-01-01',
            poster_path: '/mock-poster-path.jpg'
          },
          {
            id: 2,
            title: 'Mock Popular Title 2',
            vote_average: 8.0,
            release_date: '2022-01-01',
            poster_path: '/mock-poster-path2.jpg'
          }
        ]
      };
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockResponse)
      });

      const result = await fetchPopularTitles();
      expect(result).toEqual([
        {
          id: 1,
          title: 'Mock Popular Title 1',
          voteAverage: 7.5,
          releaseYear: '2023',
          posterPath: `${process.env.TMDB_IMAGE_BASE_URL}/w342/mock-poster-path.jpg`
        },
        {
          id: 2,
          title: 'Mock Popular Title 2',
          voteAverage: 8.0,
          releaseYear: '2022',
          posterPath: `${process.env.TMDB_IMAGE_BASE_URL}/w342/mock-poster-path2.jpg`
        }
      ]);
      expect(fetch).toHaveBeenCalledWith(`${process.env.TMDB_API_V3_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
    });

    it('handles failure to fetch popular titles', async () => {
      const errorMessage = 'Failed to fetch popular titles';
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const result = await fetchPopularTitles();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith(`${process.env.TMDB_API_V3_BASE_URL}/movie/popular?api_key=${process.env.TMDB_API_KEY}`);
    });
  });

  describe('fetchUserTitles', () => {
    it('fetches user titles successfully', async () => {
      const mockResponse = [
        {
          id: 1,
          title: 'Mock User Title 1',
          filePath: '/mock-file-path1.mp4'
        },
        {
          id: 2,
          title: 'Mock User Title 2',
          filePath: '/mock-file-path2.mp4'
        },
      ];
      const mockFetchResponse = {
        ok: true,
        json: () => Promise.resolve(mockResponse),
      };
      global.fetch = jest.fn().mockResolvedValue(mockFetchResponse);

      const result = await fetchUserTitles();
      expect(result).toEqual([
        {
          id: 1,
          title: 'Mock User Title 1',
          posterPath: `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-file-path1.mp4`,
        },
        {
          id: 2,
          title: 'Mock User Title 2',
          posterPath: `${process.env.NEXT_PUBLIC_API_BASE_URL}/mock-file-path2.mp4`,
        },
      ]);
      expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/movies`, {
        method: 'GET',
        headers: {
          Cookie: 'mock-cookie'
        },
        credentials: 'include',
        cache: 'no-store'
      });
    });

    it('handles failure to fetch user titles', async () => {
      const errorMessage = 'Failed to fetch user titles';
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        status: 403,
        statusText: 'Forbidden',
      });

      const result = await fetchUserTitles();
      expect(result).toEqual([]);
      expect(fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user/movies`, {
        method: 'GET',
        headers: {
          Cookie: 'mock-cookie',
        },
        credentials: 'include',
        cache: 'no-store'
      });
    });
  });
});
