'use client';

import { useState } from 'react';
import styled from '@emotion/styled';
import { isMobile } from 'react-device-detect';
import { Theme } from '@/lib/theme';
import { Categories } from '@/types';
import Icon from '../Icon';
import Text from '../Text';
import DropdownItem from './DropdownItem';

interface CategorySelectorProps {
  selectedCategory: Categories;
  setSelectedCategory: (category: Categories) => void;
}

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const IconContainer = styled.span`
  margin-left: 10px;
  height: 18px;
  line-height: 14px;
`;

const Dropdown = styled.div<{ theme?: Theme; isVisible: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  top: 150%;
  right: -25px;
  box-shadow: 0px 18px 43px 0px #2424244D;
  z-index: 4;
  background: ${({ theme }) => theme.colors.primary};
  padding: 24px;
  width: 241px;
  height: 102px;
  box-sizing: border-box;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: opacity 0.4s;
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    width: 12px;
    height: 12px;
    left: 206.49px;
    border-bottom: 6px solid ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.primary};
    transform: rotate(-45deg);
  }
`;

const Container = styled.div`
  position: relative;
`;

export default function CategorySelector({
  selectedCategory,
  setSelectedCategory,
}: Readonly<CategorySelectorProps>) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleSelectCategory = (category: Categories) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };

  const platform = isMobile ? 'mobile' : 'web';

  return (
    <Container>
      <SelectorContainer onClick={toggleDropdown}>
        <Text
          platform={platform}
          fontSize='large'
          color='secondary'
          fontWeight={300}
          letterSpacing='4px'
          override='margin-right: 8px;'
        >
          Ver:
        </Text>
        <Text
          platform={platform}
          fontSize='large'
          color='secondary'
          fontWeight={700}
          letterSpacing='4px'
        >
          {selectedCategory}
        </Text>
        <IconContainer>
          <Icon icon='arrowDown' height={8} width={13} alt="Desplegar Lista" />
        </IconContainer>
      </SelectorContainer>
      <Dropdown isVisible={isDropdownVisible}>
        <DropdownItem
          category="Populares"
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          platform={platform}
        />
        <DropdownItem
          category="Mis Películas"
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          platform={platform}
        />
      </Dropdown>
    </Container>
  );
}
