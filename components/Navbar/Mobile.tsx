import React from 'react';
import styled from 'styled-components';
import LogInLink from '@/components/LogInLink';
import MenuIconLink from '@/components/MenuIconLink';
import CloseLink from '@/components/CloseLink';
import Logo from '../Logo';

interface MobileNavbarProps {
  isMenuOpened?: boolean
  isAddMovieModalOpened?: boolean;
  onClose?: () => void;
}

const StyledNavbar = styled.nav`
  height: 40px;
  width: 100%;
`;

const StyledList = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

export default function MobileNavbar({ onClose, isMenuOpened = false }: MobileNavbarProps) {
  return (
    <StyledNavbar role="navigation">
      <StyledList>
        <li>
          {isMenuOpened ? <CloseLink onClose={onClose} /> : <MenuIconLink onClose={onClose} />}
        </li>
        <li>
          <Logo platform='mobile' fontSize='xxxxLarge' />
        </li>
        <li>
          <LogInLink />
        </li>
      </StyledList>
    </StyledNavbar>
  );
};
