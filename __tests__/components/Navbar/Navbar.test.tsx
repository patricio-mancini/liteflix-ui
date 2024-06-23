import { render, screen } from '@/utils/testing';
import { theme } from '@/lib/theme';

jest.mock('react-device-detect', () => ({
  __esModule: true,
  isMobile: false,
}));

import * as deviceDetect from 'react-device-detect';

import Navbar from '@/components/Navbar';

jest.mock('@/lib/hooks/useScrollPosition', () => ({
  useScrollPosition: jest.fn(),
}));

jest.mock('@/components/Navbar/Mobile', () => () => <div data-testid="mobile-navbar">Mobile Navbar</div>);
jest.mock('@/components/Navbar/Desktop', () => () => <div data-testid="desktop-navbar">Desktop Navbar</div>);

describe('Navbar', () => {
  let useScrollPosition: jest.Mock = require('@/lib/hooks/useScrollPosition').useScrollPosition as jest.Mock;

  it('renders DesktopNavbar on desktop devices', () => {
    useScrollPosition.mockReturnValue({ isScrolled: false });

    render(<Navbar />);

    expect(screen.getByTestId('desktop-navbar')).toBeInTheDocument();
    expect(screen.queryByTestId('mobile-navbar')).not.toBeInTheDocument();
  });

  it('renders MobileNavbar on mobile devices', () => {
    useScrollPosition.mockReturnValue({ isScrolled: false });

    (deviceDetect as any).isMobile = true;

    render(<Navbar />);

    expect(screen.getByTestId('mobile-navbar')).toBeInTheDocument();
    expect(screen.queryByTestId('desktop-navbar')).not.toBeInTheDocument();
  });

  it('applies the correct background when scrolled', () => {
    useScrollPosition.mockReturnValue({ isScrolled: true });

    const { container } = render(<Navbar />);

    expect(container.firstChild).toHaveStyle(`background: ${theme.colors.primaryTransparent(0.8)}`);
  });

  it('applies the correct background when not scrolled', () => {
    useScrollPosition.mockReturnValue({ isScrolled: false });

    const { container } = render(<Navbar />);

    expect(container.firstChild).toHaveStyle('background: transparent');
  });
});
