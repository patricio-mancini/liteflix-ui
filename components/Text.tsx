'use client'

import styled from 'styled-components';
import { Theme, Platform, FontSize, Color } from '@/lib/theme';

interface TextProps {
  platform?: Platform
  fontSize?: FontSize
  color?: Color
  lineHeight?: string
  fontWeight?: string | number
  letterSpacing?: string
  override?: string
  children: React.ReactNode
}

interface StyledTextProps {
  $platform?: Platform
  $fontSize?: FontSize
  $color?: Color
  $lineHeight?: string
  $fontWeight?: string | number
  $letterSpacing?: string
  $override?: string
  children: React.ReactNode
}

const StyledText = styled.span<StyledTextProps & { theme?: Theme }>`
  ${({ $platform, $fontSize, theme }) => 
    $platform && 
    $fontSize && 
    $fontSize in theme.fontSizes[$platform] && 
    `font-size: ${(theme.fontSizes[$platform] as any)[$fontSize]}`};
  ${({ $color, theme }) => $color && `color: ${theme.colors[$color]}`};
  ${({ $lineHeight }) => $lineHeight && `line-height: ${$lineHeight}`};
  ${({ $fontWeight }) => $fontWeight && `font-weight: ${$fontWeight}`};
  ${({ $letterSpacing }) => $letterSpacing && `letter-spacing: ${$letterSpacing}`};
  ${({ $override }) => $override};
`;

export default function Text({
  platform,
  fontSize,
  color,
  lineHeight,
  fontWeight,
  letterSpacing,
  override,
  children
}: Readonly<TextProps>) {
  return (
    <StyledText
      $platform={platform}
      $fontSize={fontSize}
      $color={color}
      $lineHeight={lineHeight}
      $fontWeight={fontWeight}
      $letterSpacing={letterSpacing}
      $override={override}
    >
      {children}
    </StyledText>
  );
}