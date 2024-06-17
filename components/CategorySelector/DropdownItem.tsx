import styled from '@emotion/styled';
import { Platform } from '@/lib/theme';
import { Categories } from '@/types';
import Icon from '../Icon';
import Text from '../Text';

interface DropdownItemProps {
  category: Categories;
  selectedCategory: Categories;
  onSelectCategory: (category: Categories) => void;
  platform: Platform;
}

const Item = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  padding-bottom: ${({ selected }) => (selected ? '16px' : '0')};
  &:first-of-type {
    padding-bottom: 16px;
  }
`;

const IconContainer = styled.span`
  margin-left: 10px;
  height: 18px;
  line-height: 14px;
`;

export default function DropdownItem({
  category,
  selectedCategory,
  onSelectCategory,
  platform,
}: Readonly<DropdownItemProps>) {
  const isSelected = selectedCategory === category;

  return (
    <Item selected={isSelected} onClick={() => onSelectCategory(category)}>
      <Text platform={platform} fontSize='medium' color='secondary' fontWeight={isSelected ? 700 : 300} letterSpacing='4px'>
        {category}
      </Text>
      {isSelected && (
        <IconContainer>
          <Icon icon='check' height={8} width={12} alt="Seleccionado" />
        </IconContainer>
      )}
    </Item>
  );
}
