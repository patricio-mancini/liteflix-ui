'use client'

import styled from 'styled-components';
import { isMobile } from 'react-device-detect';
import { useModalMenu } from './ModalMenu';
import { useModalAddMovie } from './ModalAddMovie';

const StyledDesktop = styled.main`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: flex-start;
  flex: 1;
  padding: 0 104px;
`;

const StyledMobile = styled.main<{ $isMenuOpen?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  padding: 214px 24px 0 24px;
  ${({ $isMenuOpen }) => $isMenuOpen && 'overflow-y: hidden;'}
`;

export default function Main({ children }: Readonly<{ children: React.ReactNode }>) {
  const { isMenuOpen } = useModalMenu();
  const { isModalOpen } = useModalAddMovie();
  const Component = isMobile ? StyledMobile : StyledDesktop;
  return  <Component $isMenuOpen={isMenuOpen || isModalOpen}>{children}</Component>;
}
