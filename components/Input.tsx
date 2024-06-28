import { useState } from 'react';
import styled from 'styled-components';
import { Theme, FontSize, Platform } from '@/lib/theme';

interface InputProps {
  id: string
  placeholder: string
  value: string
  platform?: Platform
  fontSize?: FontSize
  fontWeight?: string | number
  letterSpacing?: string
  onChange: (value: string) => void
}

interface StyledInputProps {
  id: string
  value: string
  $platform?: Platform
  $fontSize?: FontSize
  $fontWeight?: string | number
  $letterSpacing?: string
}

const InputContainer = styled.div<{ theme?: Theme }>`
  width: 248px;
  height: 24px;
  position: relative;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  padding-bottom: 8px;
`;

const StyledInput = styled.input<StyledInputProps & { theme?: Theme }>`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  text-align: center;
  outline: none;
  position: absolute;
  top: 0;
  left: 0;
  color: ${({ theme }) => theme.colors.secondary};
  ${({ $platform, $fontSize, theme }) => 
    $platform && 
    $fontSize && 
    $fontSize in theme.fontSizes[$platform] && 
    `font-size: ${(theme.fontSizes[$platform] as any)[$fontSize]}`};
  font-weight: 700;
  letter-spacing: ${({ $letterSpacing }) => $letterSpacing};
  ::placeholder {
    color: ${({ theme }) => theme.colors.secondary};
    ${({ $platform, $fontSize, theme }) => 
      $platform && 
      $fontSize && 
      $fontSize in theme.fontSizes[$platform] && 
      `font-size: ${(theme.fontSizes[$platform] as any)[$fontSize]}`};
    font-weight: 300;
    letter-spacing: ${({ $letterSpacing }) => $letterSpacing};
  }
`;

export default function Input({
  id,
  placeholder,
  value,
  platform,
  fontSize,
  letterSpacing,
  onChange
}: Readonly<InputProps>) {
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <InputContainer>
      <StyledInput
        type='text'
        id={id}
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        $platform={platform}
        $fontSize={fontSize}
        $letterSpacing={letterSpacing}
      />
    </InputContainer>
  );
}
