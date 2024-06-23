import React from 'react';
import { render, screen } from '@/utils/testing';
import MobileNavbar from '@/components/Navbar/Mobile';

jest.mock('@/components/LogInLink', () => jest.fn(() => <div data-testid="log-in-link">Log In Link</div>));
jest.mock('@/components/MenuIconLink', () => jest.fn(() => <div data-testid="menu-icon-link">Menu Icon Link</div>));
jest.mock('@/components/CloseLink', () => jest.fn(() => <div data-testid="close-link">Close Link</div>));
jest.mock('@/components/Logo', () => jest.fn(() => <div data-testid="logo">Logo</div>));

describe('MobileNavbar', () => {
  it('renders the navigation bar', () => {
    render(<MobileNavbar />);
    
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('renders the Logo component', () => {
    render(<MobileNavbar />);
    
    const logo = screen.getByTestId('logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the LogInLink component', () => {
    render(<MobileNavbar />);
    
    const logInLink = screen.getByTestId('log-in-link');
    expect(logInLink).toBeInTheDocument();
  });

  it('renders the MenuIconLink component when menu is not opened', () => {
    render(<MobileNavbar isMenuOpened={false} />);
    
    const menuIconLink = screen.getByTestId('menu-icon-link');
    expect(menuIconLink).toBeInTheDocument();
  });

  it('renders the CloseLink component when menu is opened', () => {
    render(<MobileNavbar isMenuOpened={true} />);
    
    const closeLink = screen.getByTestId('close-link');
    expect(closeLink).toBeInTheDocument();
  });
});
