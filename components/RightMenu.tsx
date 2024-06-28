import styled from 'styled-components';
import Icon from './Icon';
import LogInLink from './LogInLink';
import MenuIconLink from './MenuIconLink';

const RightUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const MenuIconContainer = styled.li`
  cursor: pointer;
`;

export default function RightMenu({
  showMenuIcon = false
}: Readonly<{ showMenuIcon?: boolean }>) {
  return (
    <RightUl>
      {showMenuIcon && (
        <li>
          <MenuIconLink />
        </li>
      )}
      <MenuIconContainer>
        <Icon icon='notification' height={26} width={26} alt='Notificación' />
      </MenuIconContainer>
      <li>
        <LogInLink />
      </li>
    </RightUl>
  );
}