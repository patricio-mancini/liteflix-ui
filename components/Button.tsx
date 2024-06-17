import React from 'react';
import styled from '@emotion/styled';
import { Theme } from '@/lib/theme';

type ButtonType = 'primary' | 'secondary' | 'highlight';

interface ButtonProps {
  variant: ButtonType;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const StyledButton = styled.button<ButtonProps & { theme?: Theme }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  width: 248px;
  cursor: pointer;
  gap: 12px;
  ${({ variant, disabled, theme }) => {
    switch (variant) {
      case 'primary':
        return `background-color: ${theme.colors.primary};`;
      case 'secondary':
        return `
          background-color: ${theme.colors.primaryTransparent(0.5)};
          border: 1px solid ${theme.colors.secondaryTransparent(0.5)};
        `;
      case 'highlight':
        return `
          background-color: ${disabled ? theme.colors.secondaryTransparent(0.5) : theme.colors.secondary};
        `;
    }
  }}
  transition: background-color 0.3s ease;
  &:hover {
    ${({ variant, theme }) => {
      switch (variant) {
        case 'primary':
          return 'background-color: #1c1c1c;';
        case 'secondary':
          return `
            background-color: ${theme.colors.primaryTransparent(0.7)};
            border-color: ${theme.colors.secondaryTransparent(0.7)};
          `;
        case 'highlight':
          return 'background-color: #cccccc';
      }
    }}
  }
`;

const Button = ({ variant, onClick, disabled, children }: Readonly<ButtonProps>) => {
  return (
    <StyledButton type="button" variant={variant} disabled={disabled} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
