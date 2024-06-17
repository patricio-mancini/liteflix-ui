'use client'

import styled from '@emotion/styled';
import { useModalMenu } from './ModalMenu';
import Icon from './Icon';

const ActionContainer = styled.span`
  cursor: pointer;
`;

export default function CloseLink({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { toggleMenu } = useModalMenu();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      toggleMenu();
    }
  };

  return (
    <ActionContainer onClick={handleClose}>
      <Icon icon='close' height={17.82} width={17.82} alt="Cerrar" />
    </ActionContainer>
  );
}
