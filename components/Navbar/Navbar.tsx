'use client'

import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import { useScrollPosition } from '@/lib/hooks/useScrollPosition';
import MobileNavbar from './Mobile';
import DesktopNavbar from './Desktop';

const Header = styled.header<{ $isScrolled: boolean, theme?: Theme }>`
  position: sticky;
  top: 0;
  padding: ${isMobile ? '22px' : '32px 104px 0 104px'};
  background: ${({ theme, $isScrolled }) =>
    $isScrolled ? theme.colors.primaryTransparent(0.8) : 'transparent'};
  transition: background-color 0.3s ease;
  z-index: 1;
`;

export default function Navbar() {
  const { isScrolled } = useScrollPosition();
  return (
    <Header $isScrolled={isScrolled}>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
    </Header>
  );
}
