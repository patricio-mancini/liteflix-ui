import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import { useAuth } from '@/lib/context/AuthContext';
import { useModalMenu } from './ModalMenuContext';
import Text from '../Text';
import RightMenu from '../RightMenu';
import AddMovieLink from '../AddMovieLink';
import { Overlay } from '../Overlay';
import CloseLink from '../CloseLink';
import MobileNavbar from '../Navbar/Mobile';

const MenuContainer = styled.div<{ theme?: Theme; isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isVisible }) => (isVisible ? '0' : isMobile ? '-100vw' : '-953px')};
  display: flex;
  flex-flow: column nowrap;
  gap: 85px;
  width: ${isMobile ? '100vw' : '761px'};
  min-height: 100vh;
  padding: ${isMobile ? '16px 24px' : '32px 104px 32px 88px'};
  background-color: ${({ theme }) => isMobile ? theme.colors.primary : theme.colors.primaryTransparent(0.898)};
  transition: right 0.4s;
  z-index: 5;
  ${isMobile && 'box-sizing: border-box;'}
`;

const StyledMenuHeader = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: ${isMobile ? '100vw' : '761px'};
`;

const MenuContent = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 40px;
`;

const LinkItem = styled.li`
  padding: 32px 0;
`;

const ActionContainer = styled.span`
  cursor: pointer;
`;

const menuItems: string[] = [
  'inicio',
  'series',
  'películas',
  'agregadas recientemente',
  'populares',
  'mis películas',
  'mi lista'
];

export function MenuHeader() {
  if (isMobile) {
    return <MobileNavbar isMenuOpened={true} />;
  }
  return (
    <StyledMenuHeader>
      <CloseLink />
      <RightMenu />
    </StyledMenuHeader>
  )
}

export default function MenuModal() {
  const { logout } = useAuth();
  const { isMenuOpen, toggleMenu } = useModalMenu();

  const logoutHandler = async () => {
    await logout();
    toggleMenu();
  }

  return (
    <>
      <Overlay isVisible={isMenuOpen} zIndex={4}/>
      <MenuContainer isVisible={isMenuOpen}>
        <MenuHeader />
        <MenuContent>
          {
            menuItems.map((item) => (
              <li key={item}>
                <Text platform='web' fontSize='xxLarge' color='secondary' fontWeight={300} letterSpacing='4px'>{item}</Text>
              </li>
            ))
          }
          <LinkItem>
            <AddMovieLink size='xxLarge' />
          </LinkItem>
          <ActionContainer onClick={logoutHandler}>
            <Text platform='web' fontSize='xxLarge' color='secondary' fontWeight={300} letterSpacing='4px'>cerrar sesión</Text>
          </ActionContainer>
        </MenuContent>
      </MenuContainer>
    </>
  );
}
