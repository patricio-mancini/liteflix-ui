import React from 'react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import MobileNavbar from '../Navbar/Mobile';
import Icon from '../Icon';

const DesktopContainer = styled.div<{ theme?: Theme, isVisible: boolean }>`
  position: fixed;
  top: ${({ isVisible }) => (isVisible ? '50%' : '150%')};
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 48px;
  width: 730px;
  padding: 48px 64px;
  background-color: ${({ theme }) => theme.colors.primary};
  box-sizing: border-box;
  transition: top 0.4s;
  z-index: 6;
`;

const MobileContainer = styled.div<{ theme?: Theme, isVisible: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isVisible }) => (isVisible ? '0' : '-100vw')};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 96px;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.primary};
  transition: right 0.4s;
  z-index: 6;
  box-sizing: border-box;
`;

const CloseButtonContainer = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  cursor: pointer;
`;

interface ModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalContainer({ isVisible, onClose, children }: ModalContainerProps) {
  const Container = isMobile ? MobileContainer : DesktopContainer;

  return (
    <Container isVisible={isVisible}>
      {isMobile ? <MobileNavbar isAddMovieModalOpened onClose={onClose} /> : (
        <CloseButtonContainer onClick={onClose}>
          <Icon icon='close' height={15} width={15} alt="Cerrar" />
        </CloseButtonContainer>
      )}
      {children}
    </Container>
  );
}
