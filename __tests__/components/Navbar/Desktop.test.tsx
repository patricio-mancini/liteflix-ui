import React from 'react';
import { render, screen } from '@/utils/testing';
import DesktopNavbar from '@/components/Navbar/Desktop';

jest.mock('@/components/Logo', () => jest.fn(() => <div data-testid="logo">Logo</div>));
jest.mock('@/components/AddMovieLink', () => jest.fn(() => <div data-testid="add-movie-link">Add Movie Link</div>));
jest.mock('@/components/RightMenu', () => jest.fn(() => <div data-testid="right-menu">Right Menu</div>));

describe('DesktopNavbar', () => {
  it('renders the navigation bar', () => {
    render(<DesktopNavbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the Logo component', () => {
    render(<DesktopNavbar />);
    
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the AddMovieLink component', () => {
    render(<DesktopNavbar />);
    
    const addMovieLink = screen.getByTestId('add-movie-link');
    expect(addMovieLink).toBeInTheDocument();
  });

  it('renders the RightMenu component', () => {
    render(<DesktopNavbar />);
    
    const rightMenu = screen.getByTestId('right-menu');
    expect(rightMenu).toBeInTheDocument();
  });
});
