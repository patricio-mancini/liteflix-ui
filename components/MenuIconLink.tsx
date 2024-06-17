'use client'

import React from 'react';
import styled from '@emotion/styled';
import { useModalMenu } from './ModalMenu';
import Icon from './Icon';

const MenuIconContainer = styled.span`
  cursor: pointer;
`;

export default function MenuIconLink({ onClose }: Readonly<{ onClose?: () => void }>) {
  const { toggleMenu } = useModalMenu();

  const handleClick = () => {
    if (onClose) {
      onClose();
    } else {
      toggleMenu();
    }
  }

  return (
    <MenuIconContainer onClick={handleClick}>
      <Icon icon='menu' height={12} width={27} alt='Menú' />
    </MenuIconContainer>
  );
};
