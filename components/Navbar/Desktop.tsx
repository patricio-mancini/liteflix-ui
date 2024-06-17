import styled from '@emotion/styled';
import RightMenu from '../RightMenu';
import AddMovieLink from '../AddMovieLink';
import Logo from '../Logo';

const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
`;

const LeftUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 64px;
`;

export default function DesktopNavbar() {
  return (
    <StyledNavbar role="navigation">
      <LeftUl>
        <li>
          <Logo platform='web' fontSize='xxxxLarge' />
        </li>
        <li>
          <AddMovieLink size='large' />
        </li>
      </LeftUl>
      <RightMenu showMenuIcon />
    </StyledNavbar>
  );
};

