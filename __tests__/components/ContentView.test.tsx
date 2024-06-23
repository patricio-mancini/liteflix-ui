import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { render } from '@/utils/testing';
import ContentView from '@/components/ContentView';
import { Title, FeaturedTitle } from '@/types';

jest.mock('@/components/BackdropImage', () => ({ src, title }: { src: string, title: string }) => (
  <div data-testid="backdrop-image">{title}</div>
));
jest.mock('@/components/FeaturedInfo', () => ({ title }: { title: string }) => (
  <div data-testid="featured-info">{title}</div>
));
jest.mock('@/components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('@/components/Main', () => ({ children }: { children: React.ReactNode }) => (
  <div data-testid="main">{children}</div>
));
jest.mock('@/components/TitleListSection', () => ({ popularList, userTitles }: { popularList: Title[], userTitles: Title[] }) => (
  <div data-testid="title-list-section">
    {popularList.map(title => title.title).join(', ')}
    {userTitles.map(title => title.title).join(', ')}
  </div>
));
jest.mock('@/components/ModalMenu/ModalMenu', () => () => <div data-testid="modal-menu" />);
jest.mock('@/components/ModalAddMovie/ModalAddMovie', () => () => <div data-testid="modal-add-movie" />);

const mockFeatured: FeaturedTitle = {
  id: 1,
  title: 'Featured Movie',
  backdropSrc: '/path/to/backdrop.jpg',
};

const mockPopularList: Title[] = [
  { id: 2, title: 'Popular Movie 1', posterPath: '/path/to/poster1.jpg' },
  { id: 3, title: 'Popular Movie 2', posterPath: '/path/to/poster2.jpg' },
];

const mockUserTitles: Title[] = [
  { id: 4, title: 'User Movie 1', posterPath: '/path/to/poster3.jpg' },
  { id: 5, title: 'User Movie 2', posterPath: '/path/to/poster4.jpg' },
];

describe('ContentView', () => {
  it('renders correctly on client side', async () => {
    render(<ContentView featured={mockFeatured} popularList={mockPopularList} userTitles={mockUserTitles} />);

    // Wait for the useEffect to run and the component to re-render
    await waitFor(() => {
      expect(screen.getByTestId('backdrop-image')).toBeInTheDocument();
      expect(screen.getByTestId('navbar')).toBeInTheDocument();
      expect(screen.getByTestId('main')).toBeInTheDocument();
      expect(screen.getByTestId('featured-info')).toBeInTheDocument();
      expect(screen.getByTestId('title-list-section')).toBeInTheDocument();
      expect(screen.getByTestId('modal-menu')).toBeInTheDocument();
      expect(screen.getByTestId('modal-add-movie')).toBeInTheDocument();
    });
  });

  it('displays the correct featured title', async () => {
    render(<ContentView featured={mockFeatured} popularList={mockPopularList} userTitles={mockUserTitles} />);

    await waitFor(() => {
      expect(screen.getByTestId('backdrop-image')).toHaveTextContent('Featured Movie');
      expect(screen.getByTestId('featured-info')).toHaveTextContent('Featured Movie');
    });
  });

  it('renders the correct number of titles in TitleListSection', async () => {
    render(<ContentView featured={mockFeatured} popularList={mockPopularList} userTitles={mockUserTitles} />);

    await waitFor(() => {
      const titleListSection = screen.getByTestId('title-list-section');
      expect(titleListSection).toHaveTextContent('Popular Movie 1');
      expect(titleListSection).toHaveTextContent('Popular Movie 2');
      expect(titleListSection).toHaveTextContent('User Movie 1');
      expect(titleListSection).toHaveTextContent('User Movie 2');
    });
  });
});
