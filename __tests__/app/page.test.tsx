import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '../../app/page';
import { fetchFeaturedTitle, fetchPopularTitles, fetchUserTitles } from '@/lib/api/server';
import AsyncComponentResolver from '@/utils/testing/AsyncComponentResolver';

jest.mock('@/lib/api/server', () => ({
  fetchFeaturedTitle: jest.fn(),
  fetchPopularTitles: jest.fn(),
  fetchUserTitles: jest.fn(),
}));

interface MockTitle {
  id: number
  title: string
}

interface MockContentViewProps {
  featured: MockTitle
  popularList: MockTitle[]
  userTitles: MockTitle[]
}

jest.mock('@/components/ContentView', () => ({ featured, popularList, userTitles }: MockContentViewProps) => (
  <div>
    <div data-testid="featured">{featured.title}</div>
    <div data-testid="popularList">{popularList.map(title => title.title).join(', ')}</div>
    <div data-testid="userTitles">{userTitles.map(title => title.title).join(', ')}</div>
  </div>
));

describe('Home Page', () => {
  it('renders correctly with fetched data', async () => {
    const featuredMock = { id: 1, title: 'Featured Movie' };
    const popularMock = [
      { id: 2, title: 'Popular Movie 1' },
      { id: 3, title: 'Popular Movie 2' },
      { id: 4, title: 'Popular Movie 3' },
      { id: 5, title: 'Popular Movie 4' },
      { id: 6, title: 'Popular Movie 5' },
    ];
    const userMock = [
      { id: 7, title: 'User Movie 1' },
      { id: 8, title: 'User Movie 2' },
    ];

    (fetchFeaturedTitle as jest.Mock).mockResolvedValue(featuredMock);
    (fetchPopularTitles as jest.Mock).mockResolvedValue(popularMock);
    (fetchUserTitles as jest.Mock).mockResolvedValue(userMock);

    const ResolvedHome = await AsyncComponentResolver(Home, {});

    render(<ResolvedHome />);

    await waitFor(() => {
      expect(screen.getByTestId('featured')).toHaveTextContent('Featured Movie');
      expect(screen.getByTestId('popularList')).toHaveTextContent('Popular Movie 1, Popular Movie 2, Popular Movie 3, Popular Movie 4');
      expect(screen.getByTestId('userTitles')).toHaveTextContent('User Movie 1, User Movie 2');
    });
  });
});
